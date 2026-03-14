# AI Interview Coach

An AI-powered application that analyzes a candidate's **resume, self-description, and job description** to generate a personalized interview preparation strategy.

The system evaluates how well a candidate matches a role and generates:

* Match score
* Technical interview questions
* Behavioral interview questions
* Skill gap analysis
* Personalized preparation roadmap

This project demonstrates how **Generative AI can be integrated with a full-stack application**.

---

## Features

### Resume Analysis

Upload a resume (PDF) or write a self-description to represent your background.

### Job Match Score

AI evaluates how well your profile matches a given job description.

### Technical Interview Questions

Generates relevant technical questions likely to appear in interviews.

### Behavioral Questions

Provides behavioral questions along with interviewer intent and answer strategy.

### Skill Gap Detection

Identifies skills you may need to improve to match the job role.

### Preparation Roadmap

Creates a structured day-by-day preparation plan.

---

## Tech Stack

**Frontend**

* React
* React Router
* SCSS

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

**AI**

* Google Gemini API
* Zod Schema Validation

**Other Tools**

* Multer (file upload)
* PDF parsing for resume extraction

---

## Architecture

User Input
→ Upload Resume / Self Description
→ Provide Job Description
→ Backend extracts resume text
→ Gemini AI analyzes candidate profile
→ AI generates structured interview report
→ MongoDB stores report
→ Frontend displays interview strategy

---

## Project Structure

```
AI-powered-interview-coach
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── services
│
├── Frontend
│   ├── components
│   ├── hooks
│   ├── pages
│   └── styles
│
└── README.md
```

---

## Future Improvements

* AI mock interview simulator
* Resume improvement suggestions
* Company-specific interview preparation
* Interview analytics dashboard

---

## Author

Ishan Bhardwaj
GitHub: https://github.com/ishanbhardwaj17

---

## License

MIT License
