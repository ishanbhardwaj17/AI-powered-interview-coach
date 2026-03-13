const { Router } = require('express')
const interviewController = require("../controllers/interview.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware")

const interviewRouter = Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);
interviewRouter.get("/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);

module.exports = interviewRouter 
