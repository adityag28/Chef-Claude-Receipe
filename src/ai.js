import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients...
`;

const API_KEY = import.meta.env.VITE_HF_ACCESS_TOKEN; // ✅ Correct way to load API key
const hf = new HfInference(API_KEY); // ✅ Initialize Hugging Face API client

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Give me a recipe!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Error fetching recipe:", err.message);
  }
}
