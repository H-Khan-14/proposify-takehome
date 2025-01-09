# Instructions

**_Objective:_**
Build a simplified real-time collaborative note-taking application that allows multiple users to edit a note simultaneously with live updates.

**_Expect development time:_** 2 hours

**Project Description:**

Create a web application where users can:

- Create an Edit Notes:

  - Utilize a WYSIWYG editor to format text (e.g., bold, italic, underline).

  - Implement live preview of the formatted text.

- Real-Time Collaboration

  - Use WebSockets to handle live updates and data synchronization.

- Basic Backend Integration:

  - Implement basic user authentication to manage different user sessions.

**Technical Requirements:**

- Frontend:

  - Framework: React with TypeScript

  - Suggested WYSIWYG Editor packages

    - CKEditor5
    - Froala
    - TipTap
    - QuillJS
    - or your own choice.

  - State management other than local states

  - Real-Time Updates: Integrate WebSocket
  - Bonus: Create a modal to appear when the WebSocket connection is disconnected.

- Backend:

  - Language: Node.js with Express or PHP (based on your stack)

  - Real-Time Communication: Set up WebSocket server to broadcast updates to connected clients

- Database:

  - Use an in-memory data store (like a simple JavaScript object) for simplicity, given the time constraint.

**Submission Guidelines:**

- Repository:

  - Create a public GitHub repository containing your code.

  - Ensure clear commit messages and a logical commit history.

- README File:

  - Project Overview: Brief description of the project.

  - Setup Instructions: Step-by-step guide to run the application locally.

  - Technology Stack: List the technologies and libraries used.

  - Features Implemented: Highlight the key features you’ve built.

  - Future Improvements: Mention any additional features or improvements you would implement given more time.

- Running the Project:

  - Provide clear instructions to install dependencies and start both frontend and backend servers.

  - Ensure that the application runs without issues.
