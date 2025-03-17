Text Reader with AI Chrome Extension
A Chrome extension that extracts text from webpages and allows users to ask questions about the extracted content using the Groq API. Users can also save and manage questions, selectively answer them, and view AI-generated responses.

Features
Extract Text: Extract all visible text from any webpage.

Ask Questions: Ask questions about the extracted text and get AI-generated answers.

Save Questions: Save questions for later use.

Selective Answering: Choose specific questions to answer.

Clean Interface: Simple and intuitive user interface.

Screenshots
Screenshot 1
Extracted text and AI response.

Screenshot 2
Saved questions and selective answering.

Installation
Prerequisites
Node.js: Ensure Node.js is installed on your system. Download it from here.

Groq API Key: Obtain an API key from Groq.

Steps
Clone the Repository:

bash
Copy
git clone https://github.com/your-username/text-reader-extension.git
cd text-reader-extension
Set Up the Backend:

Navigate to the backend folder:

bash
Copy
cd backend
Install dependencies:

bash
Copy
npm install
Create a .env file in the backend folder and add your Groq API key:

Copy
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
Start the backend server:

bash
Copy
npm start
Load the Extension in Chrome:

Open Chrome and go to chrome://extensions/.

Enable Developer Mode (toggle in the top-right corner).

Click Load unpacked and select the public folder inside the project directory.

Use the Extension:

Click the extension icon in the Chrome toolbar to open the popup.

Extract text from a webpage and start asking questions!

Usage
Extract Text:

Click the Read Text button to extract text from the current webpage.

The extracted text will appear in the textarea.

Ask a Question:

Type your question in the input field and click Ask AI.

The AI's response will be displayed below.

Save Questions:

Type a question in the Add a new question input field and click Add Question.

The question will be saved and displayed in the list.

Answer Selected Questions:

Check the boxes next to the questions you want to answer.

Click Answer Selected Questions to get AI-generated answers for the selected questions.

Remove Questions:

Click the Remove button next to a question to delete it from the list.

File Structure
Copy
text-reader-extension/
├── backend/
│   ├── server.js           # Backend server using Express and Groq API
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables (Groq API key)
├── public/
│   ├── icon.png            # Extension icon
│   ├── popup.html          # Popup interface
│   ├── popup.js            # Popup functionality
│   ├── styles.css          # Popup styling
│   ├── content.js          # Content script for text extraction
│   └── manifest.json       # Extension manifest file
└── README.md               # Project documentation
Technologies Used
Frontend:

HTML, CSS, JavaScript

Chrome Extensions API

Backend:

Node.js, Express

Groq API

Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes and push to the branch.

Submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Groq for providing the AI API.

Chrome Extensions Documentation for guidance on building Chrome extensions.

Contact
For questions or feedback, feel free to reach out:

Your Name: your-email@example.com

GitHub: your-username

Enjoy using the Text Reader with AI Chrome Extension! 🚀
