// Function to extract text from the webpage
document.getElementById("readText").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                function: extractAllText
            },
            (result) => {
                if (result && result[0].result) {
                    const extractedText = result[0].result;
                    document.getElementById("textOutput").value = extractedText;
                    // Store the extracted text for later use
                    chrome.storage.local.set({ extractedText });
                }
            }
        );
    });
});

// Function to ask the AI a question
document.getElementById("askQuestion").addEventListener("click", async () => {
    const question = document.getElementById("questionInput").value.trim();
    if (!question) {
        alert("Please enter a question.");
        return;
    }

    // Get the extracted text from storage
    chrome.storage.local.get(["extractedText"], async (result) => {
        const extractedText = result.extractedText;
        if (!extractedText) {
            alert("No text extracted yet. Please click 'Read Text' first.");
            return;
        }

        // Send the question and extracted text to the backend
        try {
            const response = await fetch("http://localhost:5000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: extractedText,
                    question: question,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch AI response.");
            }

            const data = await response.json();
            const aiResponse = data.profile;

            // Display the AI's response
            document.getElementById("aiResponse").textContent = aiResponse;
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("aiResponse").textContent = "Failed to get AI response. Please try again.";
        }
    });
});

// Function to extract all text from the page
function extractAllText() {
    return document.body.innerText;
}