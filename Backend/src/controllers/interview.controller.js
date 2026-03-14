const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function generateInterviewReportController(req, res) {

    try {
        const { selfDescription, jobDescription } = req.body;
        const trimmedJobDescription = jobDescription?.trim();
        const trimmedSelfDescription = selfDescription?.trim() || "";

        if (!trimmedJobDescription) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        let resumeText = "";

        if (req.file) {
            const parser = new PDFParse({
                data: Uint8Array.from(req.file.buffer)
            });

            const resumeContent = await parser.getText();
            resumeText = resumeContent?.text?.trim() || "";
        }

        if (!resumeText && !trimmedSelfDescription) {
            return res.status(400).json({
                message: "Either resume or self description is required"
            });
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription: trimmedSelfDescription,
            jobDescription: trimmedJobDescription
        });

        const title =
            interviewReportByAi.title ||
            trimmedJobDescription.split("\n")[0] ||
            "Unknown Role";

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription: trimmedSelfDescription,
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


/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            });
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch interview report",
            error: error.message
        });
    }
}

/** 
 * @description Controller to get all interview reports of logged in user.
 */

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch interview reports",
            error: error.message
        });
    }
}





module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};
