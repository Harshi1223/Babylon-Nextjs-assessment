Babylon-Nextjs-assessment

📌 **Summary**

This is a simple Next.js application that provides login and registration features using Firebase Authentication. The project demonstrates user authentication flows, input validation, and basic navigation between login, registration, and home pages.

🛠 **Tech Stack Used**

OS: Windows 11

Front-end Library: React (Next.js)

Programming Language: JavaScript

Runtime Environment: Node.js v22.17.1

IDE: Microsoft Visual Studio Code

Styling: Tailwind CSS

Backend / Authentication: Google Firebase

✅ **Pre-Requisites**

To successfully run this project locally, you must have:

Node.js (and npm/yarn) → Required to run the Next.js server, build the application, and manage dependencies.

VS Code (or equivalent IDE) → Recommended for writing and managing source code with syntax highlighting, extensions, and integrated terminal.

Firebase Project → You need to create a Firebase project and configure authentication (Email/Password).

🚀 **How to Run**

Ensure Node.js and VS Code are installed.

Clone the project to your local machine:

git clone <repository-url>
cd Babylon-Nextjs-assessment


Install dependencies:

``` npm install node-modules ```


Install Firebase SDK:

```npm install firebase```


Run the application:

```npm run dev```


Open the app in your browser:

```http://localhost:3000/```

⚡ **Challenges Faced**

Environment Dependency & Security

The application relies on sensitive Firebase configuration (API keys, project IDs). These must be correctly set via environment variables to avoid build/runtime errors.


🚀 **Future Improvements**

This project currently provides a working login and registration system using Next.js + Firebase Authentication.
Potential future improvements include:

🔹 Authentication & Security

Persistent login (stay logged in after refresh).

Role-based access control (admin vs user).

Password reset functionality.

Email verification before login.

Two-Factor Authentication (2FA).

🔹 User Experience (UX/UI)

Modern UI with TailwindCSS / Material UI.

Better validation.

Responsive design for all devices.

🔹 Data Handling

Store extended user details in Firestore.

Track login activity (last login, device, etc.).
