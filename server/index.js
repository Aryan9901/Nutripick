import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import { Groq } from "groq-sdk";
import path from "path";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// Setup Groq client
const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are tasked with analyzing images of Indian food. Upon receiving an image, break down the dish into the following components:

1. **Ingredients:** Identify the main ingredients visible in the image. List them clearly.
2. **Protein Content:** Estimate the primary protein sources in the dish based on the ingredients identified.
3. **Health Level:** Assign a health score from 0 to 5, where 0 indicates very unhealthy and 5 indicates very healthy, based on typical nutritional profiles of the identified ingredients.
4. **Benefits and Disadvantages:** Provide a concise summary of the health benefits and possible disadvantages of the dish based on the ingredients and typical preparation methods.
5. **Health Suitability:** Indicate which health conditions a person should prefer or avoid this dish, based on the nutritional profile and common dietary considerations.

Please reason through the analysis step-by-step before providing your final detailed breakdown. Use clear, concise explanations for each component.

# Output Format

Return the output in JSON format with the following structure:

\`\`\`json
{
  "ingredients": ["ingredient1", "ingredient2", "ingredient3", ...],
  "protein_sources": ["protein1", "protein2", ...],
  "health_level": <number 0-5>,
  "benefits": ["benefit1", "benefit2", ...],
  "disadvantages": ["disadvantage1", "disadvantage2", ...],
  "personAvoid": ["condition1", "condition2", ...],
  "personPrefer": ["condition1", "condition2", ...]
}
\`\`\`

# Notes
- Always base your analysis on common Indian cooking methods and ingredient properties.
- Reason step-by-step before outputting the final JSON.
- Ensure the JSON is properly formatted and valid.
- The arrays "personPrefer" and "personAvoid" may be empty if no suitable conditions apply.
- Consider the entire ingredient list when determining "personPrefer" and "personAvoid".
- Minimize listing benefits if the dish is typically unhealthy or junk food.

# Example

Input: [An image of paneer tikka]

Output:

\`\`\`json
{
  "ingredients": ["paneer", "yogurt", "spices", "bell peppers", "onions"],
  "protein_sources": ["paneer", "yogurt"],
  "health_level": 4,
  "benefits": ["Good source of protein", "Contains antioxidants from spices and vegetables", "Rich in calcium from paneer"],
  "disadvantages": ["May be high in fat depending on preparation", "Potentially high sodium content"],
  "personAvoid": ["Diabetic"],
  "personPrefer": ["Asthma"]
}
\`\`\`

Produce the entire response strictly in JSON format as specified above, with no extra commentary or text.`;

const MENU_PROMPT = `You are tasked with analyzing restaurant menus to evaluate the healthiness of their food options. Upon receiving a menu list, perform the following:

1. **Analyze Menu Items:** Review the menu items and identify the typical ingredients involved based on common recipes for those dishes.
2. **Evaluate Healthiness:** Consider typical ingredients and preparation methods to estimate the overall healthiness of each item.
3. **Assign Health Scores:** Assign each menu item a health rating from 0 to 10, where 0 means very unhealthy and 10 means very healthy.
4. **Overall Rating:** Based on all menu items, provide an overall health rating for the restaurant menu from 0 to 10.
5. **Summary:** Provide a brief explanation of your rating, highlighting key healthy and unhealthy aspects found.

Please reason step-by-step in your analysis before providing final scores and summary.

# Output Format

Return the output strictly in JSON format with the following structure:

\`\`\`json
{
  "menu_items": [
    {"name": "MenuItem1", "health_score": <0-10>},
    {"name": "MenuItem2", "health_score": <0-10>},
    ...
  ],
  "overall_health_score": <0-10>,
  "summary": "<Brief explanation of health assessment>"
}
\`\`\`

# Notes
- Base analysis on common cooking practices and typical recipes for the menu items.
- Reason step-by-step before finalizing scores.
- Scores must be integers from 0 to 10.
- The summary should be concise, focusing on major health strengths and weaknesses.
- Ensure the JSON output is valid and well formatted.

Produce your response strictly as the specified JSON object with no additional text or commentary.`;

app.post("/analyze", upload.any(), async (req, res) => {
	const file = req.files?.[0];

	if (!file) {
		return res.status(400).json({ error: "No image file uploaded" });
	}

	try {
		const imageBuffer = fs.readFileSync(file.path);
		const imageBase64 = imageBuffer.toString("base64");
		const imageDataUrl = `data:image/${file.mimetype.split("/")[1]};base64,${imageBase64}`;

		const response = await groq.chat.completions.create({
			model: "meta-llama/llama-4-scout-17b-16e-instruct",
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{
					role: "user",
					content: [
						{ type: "text", text: "above is the image" },
						{ type: "image_url", image_url: { url: imageDataUrl } },
					],
				},
			],
			temperature: 0,
			max_completion_tokens: 4870,
			top_p: 1,
			stream: false,
			response_format: { type: "json_object" },
		});

		fs.unlinkSync(file.path);
		const output = response.choices[0].message.content;
		res.status(200).json(JSON.parse(output));
	} catch (error) {
		console.error("Groq API error:", error);
		res.status(500).json({ error: "Failed to analyze image" });
	}
});

app.post("/menu", upload.any(), async (req, res) => {
	const file = req.files?.[0];

	if (!file) {
		return res.status(400).json({ error: "No image file uploaded" });
	}

	try {
		const imageBuffer = fs.readFileSync(file.path);
		const imageBase64 = imageBuffer.toString("base64");
		const imageDataUrl = `data:image/${file.mimetype.split("/")[1]};base64,${imageBase64}`;

		const response = await groq.chat.completions.create({
			model: "meta-llama/llama-4-scout-17b-16e-instruct",
			messages: [
				{ role: "system", content: MENU_PROMPT },
				{
					role: "user",
					content: [
						{ type: "text", text: "above is the image" },
						{ type: "image_url", image_url: { url: imageDataUrl } },
					],
				},
			],
			temperature: 0,
			max_completion_tokens: 4870,
			top_p: 1,
			stream: false,
			response_format: { type: "json_object" },
		});

		fs.unlinkSync(file.path);
		const output = response.choices[0].message.content;
		res.status(200).json(JSON.parse(output));
	} catch (error) {
		console.error("Groq API error:", error);
		res.status(500).json({ error: "Failed to analyze image" });
	}
});

app.post("/recommend", upload.any(), async (req, res) => {
	const file = req.files?.[0];

	if (!file) {
		return res.status(400).json({ error: "No image file uploaded" });
	}

	try {
		const imageBuffer = fs.readFileSync(file.path);
		const imageBase64 = imageBuffer.toString("base64");
		const imageDataUrl = `data:image/${file.mimetype.split("/")[1]};base64,${imageBase64}`;

		const response = await groq.chat.completions.create({
			model: "meta-llama/llama-4-scout-17b-16e-instruct",
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{
					role: "user",
					content: [
						{ type: "text", text: "above is the image" },
						{ type: "image_url", image_url: { url: imageDataUrl } },
					],
				},
			],
			temperature: 0,
			max_completion_tokens: 4870,
			top_p: 1,
			stream: false,
			response_format: { type: "json_object" },
		});

		fs.unlinkSync(file.path);
		const output = response.choices[0].message.content;
		res.status(200).json(JSON.parse(output));
	} catch (error) {
		console.error("Groq API error:", error);
		res.status(500).json({ error: "Failed to analyze image" });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`✅ Server running at http://localhost:${PORT}`);
});
