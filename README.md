# Transaction Challenge App

This project is a small full-stack challenge built with React on the front end and Express on the back end.

## What it includes

- React + Vite front end
- Tailwind CSS for simple, responsive styling
- React Query for fetching transaction data
- React Hook Form for form handling and validation
- Axios for API calls
- Express server with an in-memory transactions array
- A simple Node.js test to verify the save-and-fetch flow

## Challenge goal

The app lets users:

1. Enter a transaction amount and description
2. Save the transaction through the Express API
3. See the stored transactions listed below the form

The back end uses an in-memory array instead of a database.

## Local setup

1. Install dependencies:
   npm install
2. Create a local environment file with the API URL:
   VITE_API_URL=http://localhost:300
3. Start the API server:
   npm run server
4. Start the front end:
   npm run dev
5. Run the test:
   npm test

## Notes

- The API listens on port 300.
- Validation is handled on the server side for invalid amount/description input.
- The front end uses the shared Axios client from src/config/axios.js.
