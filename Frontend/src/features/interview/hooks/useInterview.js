import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import InterviewContext from "../interview.context";
import {
    generateInterviewReport,
    getAllInterviewReports,
    getInterviewReportById,
} from "../services/interview.api";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();
    const navigate = useNavigate();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const handleInterviewError = useCallback((error) => {
        if (error?.response?.status === 401) {
            setReport(null);
            setReports([]);
            navigate("/login", { replace: true });
            return;
        }

        console.error(error);
    }, [navigate, setReport, setReports]);

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;

        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
        } catch (error) {
            handleInterviewError(error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReport ?? null;
    };

    const getReportById = useCallback(async (interviewId) => {
        setLoading(true);
        let response = null;

        try {
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            handleInterviewError(error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReport ?? null;
    }, [handleInterviewError, setLoading, setReport]);

    const getReports = useCallback(async () => {
        setLoading(true);
        let response = null;

        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            handleInterviewError(error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReports ?? [];
    }, [handleInterviewError, setLoading, setReports]);

    useEffect(() => {
        if (!interviewId) {
            return;
        }

        getReportById(interviewId);
    }, [getReportById, interviewId]);

    return { loading, report, reports, generateReport, getReportById, getReports };
};
