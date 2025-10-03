# Babylon-Nextjs-assessment

**Summary:**

It is a simple Next.js app with a login/register feature using Firebase Authentication.

**Tech stack used: **

OS: Windows 11

Front-end library: React

Programming language: JavaScript

Runtime Environment: Node.js v 22.17.1

IDE: Microsoft Visual Studio Code

Styling: Tailwind CSS

Backend / Authentication: Google Firebase

**Pre-Requisites:** 

To successfully develop and run this project locally, you must have the following installed on your system:

Node.js (and npm/yarn): Required to run the Next.js server, build the application, and manage project dependencies using the Node Package Manager (npm or yarn).

VS Code (or equivalent IDE): Recommended for writing and managing the source code, as it provides syntax highlighting, extensions, and integrated terminal access.


**How to Run:**

1. Ensure that the installation of the Node.js and Microsoft VS Code is done.
   
2. Clone the project from the repository to the local environment.

3. To install the node modules, open the terminal in the vs code and run the command
   ```npm install node-modules```

4. To download the latest version of the Firebase SDK from the npm registry, run the command
   ```npm install firebase```

5. To run the application, run the following command in the application:
   ``` npm run dev ```
   
6. The Aplication will run in the http://localhost:3000/ .

**Challenges Faced:** 
 1. Environment Dependency & Security: The application relies entirely on sensitive, external Firebase configuration (API keys, project IDs). These values must be correctly replaced, loaded via environment variables, or securely injected. This is a common source of build or runtime errors (e.g., "invalid API key") when the project is moved or built in a new environment.

 2. Single-File Complexity (Monolith): Placing the Login, Register, and Home components, along with all authentication logic, in one file is necessary for this collaborative environment but makes the code complex and harder to navigate than a typical multi-file project.

**Improvements in Future:**

