VedaAI

VedaAI is a full-stack web application designed to help teachers create customized assignments and question papers using artificial intelligence. By uploading study materials and specifying requirements, educators can automatically generate comprehensive assessments complete with answer keys.

Table of Contents
- Features
- Tech Stack
- Prerequisites
- Installation
- Configuration
- Running the Application
- Project Structure

Features
- User Authentication: Secure login and registration for educators.
- Assignment Management: Dashboard to track, view, and manage past assignments.
- AI Paper Generation: Upload syllabus materials (PDF or images) and configure question types (MCQ, short answer, numerical, etc.) to generate tailored test papers.
- Custom Configurations: Set difficulty levels, total marks, and add specific instructions for each assignment.
- PDF Export: Download generated question papers and answer keys in a print-ready PDF format.

Tech Stack
- Frontend: Next.js (App Router), React, Tailwind CSS, Zustand for state management.
- Backend: Node.js, Express.js.
- Database: MongoDB with Mongoose.
- AI Integration: Google Gemini API.

Prerequisites
- Node.js
- MongoDB cluster or local instance
- Google Gemini API key

Installation

1. Clone the repository
git clone <repository-url>
cd vedaAi

2. Install backend dependencies
cd backend
npm install

3. Install frontend dependencies
cd ../frontend
npm install

Configuration

Create a .env file in the backend directory with the following variables:

PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
CORS_ORIGIN=http://localhost:3000

Running the Application

You will need two terminal windows to run the servers concurrently.

1. Start the backend server
cd backend
npm run dev
The backend API will be available at http://localhost:8000.

2. Start the frontend server
cd frontend
npm run dev
The frontend application will be available at http://localhost:3000.

Project Structure

- /backend: Contains the Express server, MongoDB schemas, authentication logic, file upload handling, and the Gemini AI integration utility.
- /frontend: Contains the Next.js React application, user interface components, routing, and API connection logic.
