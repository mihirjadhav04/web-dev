# NEXTJS-AUTH-APP

NEXTJS-AUTH-APP is a Next.js project focused on backend development, featuring a robust authentication system with signup, login, and profile pages.

## Key Features

- **Signup and Email Verification**: Users can register with a username, email, and password. Upon signup, a confirmation email is sent with a verification link. Clicking the link verifies the email, setting the user as verified in the database.
  
- **Login and Forgot Password**: Registered users can log in using their email and password. Forgot password functionality is also implemented, allowing users to reset their passwords via email.

- **Profile Page**: Users have access to a basic profile page where they can view their details.

- **Logout**: Secure logout functionality is provided for users.

## Technologies Used

- **Next.js**: Utilized for frontend development.
- **Node.js**: Backend functionality written in Node.js.
- **JSON Web Tokens (JWT)**: Used for bearer token generation.
- **MongoDB**: Database management for storing user information and verification tokens.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and configure database connection.
4. Run the development server using `npm run dev`.
5. Access the application through the provided URL.

## Motivation

The primary aim of this project is to gain hands-on experience with Next.js and to understand the integration of backend functionalities within a Next.js framework. By implementing a robust authentication system and backend APIs, this project serves as a practical exploration of connecting frontend and backend elements seamlessly.
