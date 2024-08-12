# AI-Powered Assistant for Software Engineering Students

## Overview

This project is an AI-powered assistant designed to help software engineering students. It provides a chat interface where students can ask questions about programming, software development concepts, and receive guidance on various topics related to software engineering.

## Team Members

This project was developed by:
- Mehadi
- Abdul
- Basel
- Umayr

## Features

- Chat interface with AI-powered responses
- User authentication via Google sign-in
- Sidebar with chat history
- Suggested prompts for quick interactions
- Feedback system for rating the assistant's performance
- Responsive design for both desktop and mobile use

## Technologies Used

- Next.js
- React
- Material-UI (MUI)
- OpenAI API (GPT-4 model)
- Firebase Authentication
- CSS Modules

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     OPENAI_API_KEY=your_openai_api_key
     FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     FIREBASE_PROJECT_ID=your_firebase_project_id
     ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `pages/`: Contains the main page component and API routes
- `components/`: React components used in the application
- `lib/`: Utility functions and Firebase configuration
- `public/`: Static assets
- `styles/`: Global CSS styles

## API Routes

- `/api/chat`: Handles chat requests to the OpenAI API
- `/api/feedback`: Stores user feedback in a JSON file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.