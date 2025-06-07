# Health Way - Recipe Finder App

## Project Description
Health Way is a web application designed to help users discover new recipes, view their details, and save their favorites. Users can create accounts, log in, search for recipes using the Edamam API, and manage a personal list of favorite recipes.

## Features Implemented
*   User registration and login (Firebase Authentication)
*   Recipe search via the Edamam API
*   View recipe details (ingredients, calories, cuisine type, etc.)
*   Save and remove recipes from personal favorites (Firebase Firestore)
*   Dedicated "My Favorites" page for logged-in users
*   Responsive design elements using Material UI

## Technologies Used
*   Next.js (React Framework)
*   TypeScript
*   Redux Toolkit (State Management)
*   Firebase (Authentication & Firestore Database)
*   Edamam API (Recipe Data Source)
*   Material UI (Component Library)
*   Axios (HTTP Client)
*   Styled-components

## Getting Started

### Prerequisites
*   Node.js (e.g., v16 or later)
*   npm or yarn
*   Firebase account (to set up Authentication and Firestore)
*   Edamam API account (to get an Application ID and Key)

### Setup
1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
    *(Replace `<repository-url>` and `<repository-directory>` with the actual URL and directory name)*

2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  Create a `.env.local` file in the root of the project and add the following environment variables with your specific credentials:
    ```env
    NEXT_PUBLIC_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_MESSAGING_SENDERID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_APP_ID=your_firebase_app_id

    NEXT_PUBLIC_EDAMAN_ID=your_edamam_app_id
    NEXT_PUBLIC_EDAMAN_KEY=your_edamam_app_key
    ```
    *Note: You can find your Firebase project's configuration details in the Firebase console. You'll need to register for an Edamam API developer account to get an App ID and Key.*

## Running the Development Server
First, ensure your Firebase and Edamam API credentials are set up in `.env.local`. Then, run the development server:
```bash
npm run dev
# or
# yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts
*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Runs ESLint (if configured).

*(Note: The `lint` script availability depends on project setup.)*
