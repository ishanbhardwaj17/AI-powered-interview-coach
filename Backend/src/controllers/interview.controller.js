const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        const { selfDescription, jobDescription } = req.body;
        const trimmedJobDescription = jobDescription?.trim();

        if (!trimmedJobDescription) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        const parser = new PDFParse({
            data: Uint8Array.from(req.file.buffer)
        });

        const resumeContent = await parser.getText();
        const resumeText = resumeContent?.text?.trim();

        if (!resumeText) {
            return res.status(400).json({
                message: "Could not extract text from the uploaded resume"
            });
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription: trimmedJobDescription
        });

        const title =
            interviewReportByAi.title ||
            trimmedJobDescription.split("\n")[0] ||
            "Unknown Role";

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription: trimmedJobDescription,
            title,
            ...interviewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });

    }
}

module.exports = {
    generateInterviewReportController
};
