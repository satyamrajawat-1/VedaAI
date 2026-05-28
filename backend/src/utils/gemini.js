import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";


let _ai = null;
function getAI() {
  if (!_ai) {
    _ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return _ai;
}

/**
 * Generate a question paper using Gemini AI
 * @param {Object} params
 * @param {string} params.materialPath - Path to uploaded material file
 * @param {Array} params.questionTypes - Array of { type, numberOfQuestions, marksPerQuestion }
 * @param {string} params.additionalInfo - Additional instructions from teacher
 * @param {Object} params.user - User object with schoolName, etc.
 * @returns {Object} Generated paper data
 */
export async function generateQuestionPaper({
  materialPath,
  questionTypes,
  additionalInfo,
  user,
}) {
  const ai = getAI();

  const questionTypesDesc = questionTypes
    .map(
      (qt) =>
        `- ${qt.type}: ${qt.numberOfQuestions} questions, ${qt.marksPerQuestion} marks each`
    )
    .join("\n");

  const totalQuestions = questionTypes.reduce(
    (sum, qt) => sum + qt.numberOfQuestions,
    0
  );
  const totalMarks = questionTypes.reduce(
    (sum, qt) => sum + qt.numberOfQuestions * qt.marksPerQuestion,
    0
  );

  const prompt = `You are an expert teacher and question paper creator. Generate a customized question paper based on the uploaded study material.

**School:** ${user.schoolName || "School Name"}
**Total Questions:** ${totalQuestions}
**Total Marks:** ${totalMarks}

**Question Types Required:**
${questionTypesDesc}

${additionalInfo ? `**Additional Instructions:** ${additionalInfo}` : ""}

**Requirements:**
1. Create questions based on the uploaded study material content
2. Each question must have a difficulty level: Easy, Moderate, or Challenging
3. Distribute difficulty levels evenly across questions
4. Include an answer key with detailed answers for each question
5. Group questions into appropriate sections

**IMPORTANT: Return your response as a valid JSON object with this exact structure:**
{
  "schoolName": "${user.schoolName || "School Name"}",
  "subject": "extracted from material",
  "className": "extracted from material", 
  "timeAllowed": "appropriate time based on question count",
  "maxMarks": ${totalMarks},
  "instructions": ["instruction 1", "instruction 2"],
  "sections": [
    {
      "title": "Section A",
      "instructions": "section instruction",
      "questions": [
        {
          "number": 1,
          "text": "question text",
          "difficulty": "Easy",
          "marks": 2,
          "type": "Short Questions"
        }
      ]
    }
  ],
  "answerKey": [
    {
      "questionNumber": 1,
      "answer": "detailed answer"
    }
  ]
}

Return ONLY the JSON object, no markdown formatting, no code blocks, no additional text.`;

  try {
    let contents = [];

   
    if (materialPath && fs.existsSync(materialPath)) {
      const ext = path.extname(materialPath).toLowerCase();
      const mimeTypes = {
        ".pdf": "application/pdf",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
      };

      const mimeType = mimeTypes[ext] || "application/octet-stream";
      const fileData = fs.readFileSync(materialPath);
      const base64Data = fileData.toString("base64");

      contents = [
        {
          inlineData: {
            data: base64Data,
            mimeType,
          },
        },
        prompt,
      ];
    } else {
    
      contents = prompt;
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const responseText = result.text;

   
    let cleanedText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    
    const paperData = JSON.parse(cleanedText);

    return paperData;
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}
