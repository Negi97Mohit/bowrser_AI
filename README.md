# 📖 Text Reader with AI - Chrome Extension

## 🚀 Overview
The **Text Reader with AI** Chrome Extension extracts text from a webpage, formats it for better readability, and allows users to interact with an AI assistant by asking questions. The extension also supports managing frequently asked questions.

## 🎯 Features
- Extracts and formats text from the current webpage.
- Uses AI to answer user queries based on extracted text.
- Allows users to add, manage, and answer selected questions.
- Provides structured output with proper formatting (bold headers, lists, etc.).

## 📂 Project Structure
```
📂 text-reader-extension/
├── 📄 manifest.json
├── 📄 popup.html
├── 🎨 styles.css
├── 📜 popup.js
└── 📜 background.js
```

## 🛠 Installation
1. **Download the repository** or clone it:
   ```sh[
   git clone https://github.com/your-username/text-reader-ai.git](https://github.com/Negi97Mohit/bowrser_AI.git)
   ```
2. **Open Chrome and go to Extensions:**
   - Navigate to `chrome://extensions/`
   - Enable **Developer Mode** (top-right corner)
   - Click **Load unpacked**
   - Select the extracted project folder
3. **Use the extension:**
   - Click the extension icon
   - Extract and interact with text on any webpage!

## 🖥️ Usage
1. **Click "Read Screen Text"** to extract and format webpage content.
2. **Ask a question** using the AI-powered assistant.
3. **Manage and save questions** for quick access later.
4. **Answer selected questions** in a structured format.

## 📝 Formatting Features
- Bold headers (**Example Header**) → `<b>Example Header</b>`
- Ordered lists (1., 2., 3.) → `<ol><li>Item</li></ol>`
- Unordered lists (- Item) → `<ul><li>Item</li></ul>`
- Proper paragraph breaks instead of `<br>` spam.

## 🤖 AI Integration
This extension connects with an AI API to provide intelligent responses based on extracted content. The AI processes:
- Summarization
- Question answering
- Key insights extraction

## 🔧 Configuration
- Ensure the backend AI API is properly configured in `popup.js`.
- Modify `formatText()` in `popup.js` to tweak text display styles.

## 🛠️ Future Improvements
- Support for more advanced text summarization.
- Dark mode for better UI experience.
- Options for different AI models.

## 💡 Contributing
Feel free to submit pull requests or open issues to improve the extension. Contributions are always welcome!

## 📜 License
This project is licensed under the MIT License.

---
🔥 **Enhance your browsing experience with AI-powered text extraction and answering!**

