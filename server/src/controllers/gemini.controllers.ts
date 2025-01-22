import axios from "axios";
import { raw, Request, Response } from "express";
import dotenv from "dotenv";
import { Question } from "../types/express";

dotenv.config();

function extractAndParseJSONQuestion(responseText: string) {
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
    const generatedText = extractAndParseJSONQuestion(responseData) || "{}";
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

export const GenerateReview = async (req: Request, res: Response) => {
  const { techStack, experienceLevel, questions } = req.body as {
    techStack: string[];
    experienceLevel: string;
    questions: Question[];
  };

  if (!questions || !Array.isArray(questions)) {
    return res.status(400).json({ message: "Invalid request format" });
  }


  const reviewPrompt = `
  You are an AI interview reviewer, tasked with evaluating responses to technical interview questions.

  ${JSON.stringify(questions)}

  ## **Context**:
  - The interview is focused on the ${techStack} technology.
  - The candidate's experience level is **${experienceLevel}**.
  - Each question belongs to one of the following categories: **Conceptual, Scenario-Based, Practical**.
  - You will be provided with a list of questions along with the candidate’s answers.
  - Your task is to critically **review each answer**, providing **constructive feedback** that helps improve the candidate’s understanding.

  ## **Guidelines for Review**:
  1. **Accuracy & Completeness**: Check if the response correctly answers the question with sufficient details.
  2. **Clarity**: Ensure the answer is clear and easy to understand.
  3. **Best Practices**: If applicable, suggest improvements or best practices.
  4. **Conciseness**: Mention if the answer is too verbose or needs elaboration.
  5. **Example Usage (if applicable)**: If a code snippet is included, check for correctness, readability, and efficiency.
  6. **Strict Review Policy**: Do not generate or append any additional answer content—only provide a review of the provided answer.

  ## **Response Format**:
  Return a JSON object that includes an overall review and rating, along with a list of reviewed questions.

  ### **Example Input**
  \`\`\`json
  {
    "techStack": ${JSON.stringify(techStack)},
    "experienceLevel": ${experienceLevel},
    "questions": [
        {
            "type": "Conceptual",
            "technology": "ReactJS",
            "question": "Explain the difference between a controlled and an uncontrolled component in React. Provide examples for each.",
            "answer": "A controlled component in React has its state managed by React, usually via useState or useReducer. An uncontrolled component manages its state internally via the DOM, often using ref. Example: A form input with useState is controlled; one with ref is uncontrolled.",
            "review": ""
        },
        {
            "type": "Practical",
            "technology": "ReactJS",
            "question": "Write a React component that displays a button. When the button is clicked, it should toggle the display of a paragraph element.",
            "answer": "\`import { useState } from 'react';\nfunction ToggleText() {\n const [visible, setVisible] = useState(false);\n return (\n   <div>\n     <button onClick={() => setVisible(!visible)}>Toggle</button>\n     {visible && <p>Hello World!</p>}\n   </div>\n );\n}\nexport default ToggleText;\`",
            "review": ""
        }
    ]
  }
  \`\`\`

  ### **Expected Output**
  \`\`\`json
  {
    "overallReview": "The candidate demonstrated a solid understanding of React concepts. However, some answers could benefit from additional depth and best practice considerations.",
    "overallRating": 4.2,
    "techStack": ${JSON.stringify(techStack)},
    "experienceLevel": ${experienceLevel},
    "questions": [
        {
            "type": "Conceptual",
            "technology": "ReactJS",
            "question": "Explain the difference between a controlled and an uncontrolled component in React. Provide examples for each.",
            "answer": "A controlled component in React has its state managed by React, usually via useState or useReducer. An uncontrolled component manages its state internally via the DOM, often using ref. Example: A form input with useState is controlled; one with ref is uncontrolled.",
            "review": "Great explanation! You correctly described the difference between controlled and uncontrolled components. However, you could further clarify how an uncontrolled component is useful in specific scenarios, such as integrating third-party libraries."
        },
        {
            "type": "Practical",
            "technology": "ReactJS",
            "question": "Write a React component that displays a button. When the button is clicked, it should toggle the display of a paragraph element.",
            "answer": "\`import { useState } from 'react';\nfunction ToggleText() {\n const [visible, setVisible] = useState(false);\n return (\n   <div>\n     <button onClick={() => setVisible(!visible)}>Toggle</button>\n     {visible && <p>Hello World!</p>}\n   </div>\n );\n}\nexport default ToggleText;\`",
            "review": "Your implementation is correct! The use of useState for toggling is appropriate. However, consider adding accessibility features like aria-expanded for better usability."
        }
    ]
  }
  \`\`\`

  ## **Final Instructions**:
  - Generate concise yet informative reviews.
  - Keep feedback constructive and aligned with best coding practices.
  - Maintain a **professional and neutral** tone.
  - **DO NOT** alter the original question or answer, only provide feedback in the \`review\` field.
  - **DO NOT** append any answer content—only review what has been provided.
  - Return only the JSON format, with no text explanations or additional content.
`;

console.log("Review Prompt", reviewPrompt);

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: reviewPrompt }] }],
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
      "Error generating review:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
