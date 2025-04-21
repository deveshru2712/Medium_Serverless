# Storyscape - A Serverless Blogging Application

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/deveshru2712/Medium_Serverless)

## Project Description

Storyscape is a blogging application that allows users to share their stories. Built with a serverless architecture, it provides a scalable and efficient platform for content creation and consumption.

## Features and Functionality

*   **User Authentication:**
    *   Sign up, sign in, and logout functionality.
    *   Secure password handling.
    *   Authentication via JWT (JSON Web Tokens) stored in cookies.
*   **Profile Management:**
    *   Users can update their profile information, including name, email, bio, and profile picture.
    *   Profile picture upload to Cloudinary.
*   **Blog Management:**
    *   Create, read, update, and delete blog posts.
    *   Rich text editor for creating engaging content.
    *   Image uploads to Cloudinary within the text editor.
    *   Publishing status for blog posts.
*   **Blog Listing:**
    *   Display of public blog posts.
    *   Display of personal blog posts (only visible to the author).
    *   Individual blog post view.

## Technology Stack

*   **Backend:**
    *   [Hono](https://hono.dev/): A small, simple, and ultrafast web framework for the Edge.
    *   [Prisma](https://www.prisma.io/):  Next-generation ORM.
    *   [Prisma Accelerate](https://www.prisma.io/accelerate):  Global database cache and connection pool.
    *   [Hono/JWT](https://github.com/honojs/jwt): JSON Web Token middleware for Hono.
    *   [Hono/Cookie](https://github.com/honojs/middleware/tree/main/packages/cookie):  Cookie middleware for Hono
    *   [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference.
    *   [Cloudinary](https://cloudinary.com/): Cloud-based image and video management.
*   **Frontend:**
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript.
    *   [Vite](https://vitejs.dev/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
    *   [React Router](https://reactrouter.com/):  A standard library for routing in React.
    *   [Zustand](https://github.com/pmndrs/zustand):  A small, fast and scalable bearbones state-management solution.
    *   [Tiptap](https://tiptap.dev/): A headless, framework-agnostic rich text editor.
    *   [Lucide React](https://lucide.dev/icons?framework=react):  A collection of beautiful, simple icons.
    *   [Axios](https://axios-http.com/):  Promise based HTTP client for the browser and node.js.
    *   [React Hot Toast](https://react-hot-toast.com/):  A library for adding toast notifications.
    *   [ldrs](https://github.com/leandromatos/ldrs):  Delightful and simple loading animation components made with pure CSS.
*   **Common:**
    *   [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/): JavaScript runtime environment.
*   [npm](https://www.npmjs.com/):  Package manager for JavaScript.
*   [Git](https://git-scm.com/):  Distributed version control system.
*   [Cloudinary Account](https://cloudinary.com/): For image storage.
*   [Prisma Data Proxy](https://www.prisma.io/data-proxy):  For serverless database access.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/deveshru2712/Medium_Serverless.git
    cd Medium_Serverless
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure backend environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    DATABASE_URL=<your_prisma_data_proxy_url>
    JWT_SECRET=<your_jwt_secret>
    Cloudinary_Cloud_Name=<your_cloudinary_cloud_name>
    ```

    Replace the placeholders with your actual values.

    *   `DATABASE_URL`:  Obtain this from Prisma Data Proxy.
    *   `JWT_SECRET`:  A secret key used to sign JWTs.  Choose a strong, random string.
    *   `Cloudinary_Cloud_Name`:  Your Cloudinary cloud name.  Find this in your Cloudinary dashboard.

4.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6.  **Configure frontend environment variables:**

    Create a `.env` file in the `frontend` directory and add the following variable:

    ```
    VITE_API_URL=<your_backend_url>
    VITE_CLOUD_NAME=<your_cloudinary_cloud_name>
    ```

    Replace the placeholders with your actual values.

    *   `VITE_API_URL`: The URL of your backend server (e.g., `http://localhost:3000` or your deployed backend URL).
    *   `VITE_CLOUD_NAME`:  Your Cloudinary cloud name.  Find this in your Cloudinary dashboard.

## Usage Guide

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

3.  **Access the application:**

    Open your browser and navigate to the frontend development server address (usually `http://localhost:5173`).

4.  **User Authentication:**

    *   Sign up for a new account or log in with existing credentials.
    *   After logging in, you will be redirected to the main page.

5.  **Blog Management:**

    *   Click the "Write" icon in the navigation bar to create a new blog post.
    *   Use the rich text editor to format your content.
    *   Add a title image by clicking the "Click to Add a Title Image" placeholder.
    *   Click "Create" to save your blog post.
    *   View your personal blog posts on the "My Blog" page.
    *   Edit or delete your blog posts from the "My Blog" page.

6.  **Profile Management:**

    *   Click on user icon on the right side of the navbar.
    *   Then click on my profile.
    *   Update the information.

## API Documentation

The backend API provides the following endpoints:

### Authentication

*   `POST /api/auth/signup`: Creates a new user account.
    *   Request body:

        ```json
        {
          "email": "user@example.com",
          "password": "password123",
          "name": "John Doe"
        }
        ```
    *   Response body:

        ```json
        {
          "success": true,
          "user": {
            "id": "user_id",
            "email": "user@example.com",
            "name": "John Doe"
          },
          "message": "Account created successfully"
        }
        ```

*   `POST /api/auth/signin`: Logs in an existing user.
    *   Request body:

        ```json
        {
          "email": "user@example.com",
          "password": "password123"
        }
        ```
    *   Response body:

        ```json
        {
          "success": true,
          "user": {
            "id": "user_id",
            "email": "user@example.com",
            "name": "John Doe",
            "bio": null,
            "profileImg": null
          },
          "message": "Logged in successfully"
        }
        ```

*   `GET /api/auth/me`: Gets the current user's information. Requires authentication.
    *   Response body:

        ```json
        {
          "success": true,
          "user": {
            "id": "user_id",
            "email": "user@example.com",
            "name": "John Doe",
            "bio": null,
            "profileImg": null
          }
        }
        ```

*   `PUT /api/auth/update`: Updates the current user's information. Requires authentication.
    *   Request body:

        ```json
        {
          "name": "Updated Name",
          "email": "updated@example.com",
          "bio": "Updated bio",
          "profileImg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
        }
        ```

    *   Response body:

        ```json
        {
          "success": true,
          "message": "User profile updated successfully",
          "user": {
            "id": "user_id",
            "name": "Updated Name",
            "email": "updated@example.com",
            "bio": "Updated bio",
            "profileImg": "https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/your_image_id.jpg"
          }
        }
        ```

*   `POST /api/auth/logout`: Logs out the current user.
    *   Response body:

        ```json
        {
          "success": true,
          "message": "Logout successfully"
        }
        ```

### Blog

*   `POST /api/blog`: Creates a new blog post. Requires authentication.
    *   Request body:

        ```json
        {
          "title": "My First Blog Post",
          "content": "<p>This is the content of my first blog post.</p>",
          "titleImg": "https://example.com/image.jpg",
          "published": true
        }
        ```

    *   Response body:

        ```json
        {
          "success": true,
          "id": "blog_id",
          "message": "Blog created successfully"
        }
        ```

*   `PUT /api/blog/:id`: Updates an existing blog post. Requires authentication.
    *   Request parameters:
        *   `id`: The ID of the blog post to update.

    *   Request body:

        ```json
        {
          "id": "blog_id",
          "title": "Updated Blog Title",
          "content": "<p>This is the updated content.</p>",
          "titleImg": "https://example.com/updated_image.jpg",
          "published": false
        }
        ```

    *   Response body:

        ```json
        {
          "success": true,
          "id": "blog_id",
          "message": "Blog updated successfully"
        }
        ```

*   `GET /api/blog/personal`: Gets all blog posts created by the current user. Requires authentication.
    *   Response body:

        ```json
        {
          "success": true,
          "blog": [
            {
              "title": "My First Blog Post",
              "content": "<p>This is the content of my first blog post.</p>",
              "id": "blog_id",
              "published": true,
              "titleImg": "https://example.com/image.jpg",
              "createdAt": "2024-01-01T00:00:00.000Z",
              "author": {
                "name": "John Doe",
                "bio": null,
                "profileImg": null
              }
            }
          ]
        }
        ```

*   `DELETE /api/blog/:id`: Deletes a blog post. Requires authentication.
    *   Request parameters:
        *   `id`: The ID of the blog post to delete.

    *   Response body:

        ```json
        {
          "success": true,
          "message": "Blog deleted successfully"
        }
        ```

*   `GET /api/blog/public`: Gets all public blog posts.
    *   Response body:

        ```json
        {
          "success": true,
          "blog": [
            {
              "id": "blog_id",
              "title": "Public Blog Post",
              "content": "<p>This is a public blog post.</p>",
              "createdAt": "2024-01-01T00:00:00.000Z",
              "titleImg": "https://example.com/image.jpg",
              "author": {
                "name": "Jane Doe",
                "profileImg": null,
                "bio": null
              }
            }
          ]
        }
        ```

*   `GET /api/blog/:id`: Gets a single blog post by ID.
    *   Request parameters:
        *   `id`: The ID of the blog post to retrieve.

    *   Response body:

        ```json
        {
          "success": true,
          "blog": {
            "id": "blog_id",
            "title": "Public Blog Post",
            "titleImg": "https://example.com/image.jpg",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "content": "<p>This is a public blog post.</p>",
            "author": {
              "bio": null,
              "name": "Jane Doe",
              "profileImg": null
            }
          }
        }
        ```

## Contributing Guidelines

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your forked repository.
5.  Submit a pull request to the main repository.

## License Information

License is not specified for this repository.

## Contact/Support Information

For questions or support, please contact [deveshru2712@gmail.com](mailto:deveshru2712@gmail.com).
