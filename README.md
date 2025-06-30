# Punta Cana Tours Website

This is a web application for browsing and managing tours in Punta Cana, inspired by platforms like Gotuuri and Viator. It uses Next.js for the frontend and Supabase for the backend.

## Project Structure

-   `public/`: Static assets like images.
-   `src/`: Source code.
    -   `components/`: Reusable React components (TourCard, ReviewCard, Navbar, Footer, Layout).
    -   `lib/`: Utility functions, including the Supabase client (`supabaseClient.js`).
    -   `pages/`: Next.js page components.
        -   `index.jsx`: Home page, displaying all tours.
        -   `tours/[id].jsx`: Tour detail page, showing tour information and reviews.
        -   `admin.jsx`: Admin page for adding new tours.
        -   `_app.jsx`: Custom Next.js App component, used to import global CSS.
    -   `styles/`: CSS files.
        -   `globals.css`: Global stylesheets.
-   `schema.sql`: SQL schema for creating the necessary Supabase tables (`tours`, `reviews`) and basic Row Level Security (RLS) policies.

## Setup and Running the Project

### 1. Supabase Setup

1.  **Create a Supabase Project:**
    *   Go to [Supabase.io](https://supabase.io/) and create a new project.
2.  **Database Schema:**
    *   In your Supabase project dashboard, go to the "SQL Editor".
    *   Open the `schema.sql` file from this repository.
    *   Copy its content and run it in the Supabase SQL editor. This will create the `tours` and `reviews` tables, along with some basic RLS policies.
    *   **Optional:** The `schema.sql` file contains commented-out `INSERT` statements for sample data. You can uncomment these, replace placeholder image URLs with actual URLs, and run them to populate your database with initial tours and reviews.
3.  **Get API Keys:**
    *   In your Supabase project dashboard, go to "Project Settings" > "API".
    *   You will need the **Project URL** and the **`anon` public API key**.

### 2. Local Project Setup

1.  **Clone the Repository (if applicable):**
    ```bash
    # If you haven't already
    # git clone <repository-url>
    # cd <repository-name>
    ```
2.  **Install Dependencies:**
    *   This project assumes you have Node.js and npm (or yarn) installed.
    *   It's built as a Next.js application. If you started from scratch and are integrating these files, ensure you have Next.js installed:
        ```bash
        npm install next react react-dom @supabase/supabase-js
        # or
        # yarn add next react react-dom @supabase/supabase-js
        ```
    *   If additional dependencies were added (e.g., for styling), install them too.

3.  **Environment Variables:**
    *   Create a file named `.env.local` in the root of your project.
    *   Add your Supabase Project URL and anon key to this file:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
        ```
    *   Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_PUBLIC_KEY` with the actual values from your Supabase project.

### 3. Running the Development Server

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Using the Application

-   **Home Page (`/`):** Browse available tours.
-   **Tour Detail Page (`/tours/[id]`):** Click "View Details" on a tour to see more information, read reviews, and submit your own review.
-   **Admin Page (`/admin`):**
    *   Add new tours to the platform.
    *   **Note:** The admin page currently has placeholder authentication. For production, you need to implement a proper authentication system using Supabase Auth and configure appropriate Row Level Security policies for admin users. The `schema.sql` includes basic RLS policies that assume any authenticated user can add tours for now. This should be refined for production to only allow specific admin roles.

## Further Development (Next Steps)

*   **Full Authentication:** Implement a secure login system for the admin panel using Supabase Auth (email/password, social logins).
*   **Admin Roles & Permissions:** Refine RLS policies in Supabase to ensure only users with an 'admin' role can manage tours.
*   **Image Uploads:** Instead of URLs, allow admins to upload images directly (e.g., to Supabase Storage).
*   **Advanced Styling:** Implement a more robust styling solution (e.g., Tailwind CSS, Styled Components, or more detailed CSS modules).
*   **Booking System:** Add functionality for users to book tours.
*   **Search and Filtering:** Implement search and filtering options for tours.
*   **Testing:** Add unit and integration tests.
*   **Deployment:** Deploy the application to a platform like Vercel or Netlify.

This README provides a starting point. Feel free to expand it as the project grows.
