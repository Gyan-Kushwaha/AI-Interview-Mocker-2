import axios from "axios";
import { raw, Request, Response } from "express";
import dotenv from "dotenv";
import { Question } from "../types/express";

dotenv.config();

function extractAndParseJSON(responseText: string) {
  try {
    // Extract JSON content from the text by removing triple backticks and "json" label
    const jsonString = responseText.replace(/```json\n|\n```/g, "");

    // Parse the extracted JSON string
    const parsedData = JSON.parse(jsonString);

    // Add answer and review fields to each question
    if (parsedData.questions && Array.isArray(parsedData.questions)) {
      parsedData.questions = parsedData.questions.map((question: Question) => ({
        ...question,
        answer: "",
        review: "",
      }));
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

const generateQuestions = async (
  req: Request,
  res: Response,
  category: string,
  skills: string[] = []
) => {
  const { jobRole, company, experienceLevel } = req.body as {
    jobRole: string;
    company: string;
    experienceLevel: string;
  };

  if (!jobRole || !company || !experienceLevel) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const prompt = `Generate a JSON response containing 10 detailed ${category} interview questions tailored to assess a candidate's skills and expertise based on the following criteria:

  Tech Stack: ${skills.join(", ")}
  Experience Level: ${experienceLevel}
  Company: ${company}
  Job Role: ${jobRole}

  Question Types:
  ${
    category == "DSA"
      ? "- Practical Tasks: Code challenges or tasks to be solved."
      : ""
  }
  - Conceptual Questions: Questions that test theoretical knowledge.
  - Scenario-Based Questions: Real-world scenarios that evaluate problem-solving abilities.

  Output Format:
  {
    "techStack": [${skills.map((skill) => `"${skill}"`).join(",")}],
    "experienceLevel": "${experienceLevel}",
    "questions": [
      { "type": "Practical", "technology": "React", "question": "Build a functional React component that renders a dynamic list of items and allows the user to filter them using a search input." },
      { "type": "Conceptual", "technology": "Node.js", "question": "Explain the event loop in Node.js and how it handles asynchronous operations." },
      { "type": "Scenario", "technology": "MongoDB", "question": "You need to optimize a MongoDB query for a large dataset. Describe your approach." }
    ]
  }

  Ensure the questions are relevant and aligned with the provided technologies. Use a balanced mix of difficulty levels appropriate for the experience level. Provide example inputs and outputs for practical tasks when needed. Important: Return only the JSON format in your response with no extra text or explanations.`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );
    console.log(
      "Resposnse Data",
      response.data.candidates[0].content.parts[0].text
    );
    const responseData = response.data.candidates[0].content.parts[0].text;
    const generatedText = extractAndParseJSON(responseData) || "{}";
    console.log("Parsed Data ", generatedText);
    // const jsonResponse = JSON.parse(generatedText);

    return res.status(200).json(generatedText);
  } catch (error: any) {
    console.error(
      "Error generating questions:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GenerateDSAQuestions = (req: Request, res: Response) =>
  generateQuestions(req, res, "DSA", req.body.skills);
export const GenerateTechStackQuestions = (req: Request, res: Response) =>
  generateQuestions(req, res, "Tech Stack", req.body.skills);
export const GenerateCoreSubjectQuestions = (req: Request, res: Response) =>
  generateQuestions(req, res, "Core Subjects", ["OS", "OOPs", "System Design"]);
