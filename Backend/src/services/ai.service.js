const { GoogleGenAI } = require("@google/genai");

const interviewReportSchema = {
    type: "OBJECT",
    properties: {
        matchScore: {
            type: "NUMBER",
            description: "A score between 0 and 100 indicating how well the candidate profile matches the job description."
        },
        technicalQuestions: {
            type: "ARRAY",
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them.",
            items: {
                type: "OBJECT",
                properties: {
                    question: {
                        type: "STRING",
                        description: "The technical question that can be asked in the interview."
                    },
                    intention: {
                        type: "STRING",
                        description: "The interviewer's intention behind asking this question."
                    },
                    answer: {
                        type: "STRING",
                        description: "How to answer this question and what points to cover."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "ARRAY",
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them.",
            items: {
                type: "OBJECT",
                properties: {
                    question: {
                        type: "STRING",
                        description: "The behavioral question that can be asked in the interview."
                    },
                    intention: {
                        type: "STRING",
                        description: "The interviewer's intention behind asking this question."
                    },
                    answer: {
                        type: "STRING",
                        description: "How to answer this question and what points to cover."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "ARRAY",
            description: "List of skill gaps in the candidate profile along with their severity.",
            items: {
                type: "OBJECT",
                properties: {
                    skill: {
                        type: "STRING",
                        description: "The skill that the candidate is lacking."
                    },
                    severity: {
                        type: "STRING",
                        enum: ["low", "medium", "high"],
                        description: "The severity of this skill gap."
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "ARRAY",
            description: "A day-wise preparation plan for the candidate.",
            items: {
                type: "OBJECT",
                properties: {
                    day: {
                        type: "NUMBER",
                        description: "The day number in the preparation plan, starting from 1."
                    },
                    focus: {
                        type: "STRING",
                        description: "The main focus for this day."
                    },
                    tasks: {
                        type: "ARRAY",
                        items: {
                            type: "STRING"
                        },
                        description: "Tasks to complete on this day."
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: "STRING",
            description: "The title of the job for which the interview report is generated."
        }
    },
    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};

function getAiClient() {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        throw new Error("Missing Google GenAI API key. Set GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY.");
    }

    return new GoogleGenAI({ apiKey });
}

function parseAiJsonResponse(responseText) {
    try {
        return JSON.parse(responseText);
    } catch (error) {
        throw new Error(`AI returned invalid JSON: ${error.message}`);
    }
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const ai = getAiClient();
    const prompt = `Generate an interview report for a candidate with the following details:
Resume:
${resume}

Self Description:
${selfDescription || "Not provided"}

Job Description:
${jobDescription}

Return only valid JSON.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema
        }
    });

    return parseAiJsonResponse(response.text);
}

module.exports = {
    generateInterviewReport
};
