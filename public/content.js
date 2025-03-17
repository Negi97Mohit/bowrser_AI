// Function to extract all text from the page, including hidden elements, iframes, and shadow DOM
function extractAllText() {
    let allText = [];

    // Function to recursively extract text from an element, including shadow DOM
    function extractTextFromElement(element) {
        // Check if the element is in the shadow DOM
        if (element.shadowRoot) {
            extractTextFromElement(element.shadowRoot);
        }

        // Safely get text from the element itself
        if (element.innerText && typeof element.innerText === "string") {
            const text = element.innerText.trim();
            if (text) {
                allText.push(text);
            }
        }

        // Recursively process child elements
        element.childNodes.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                extractTextFromElement(child);
            }
        });
    }

    // Start extraction from the body
    extractTextFromElement(document.body);

    // Include text from iframes
    document.querySelectorAll("iframe").forEach((iframe) => {
        try {
            // Access the iframe's document (only works if the iframe is from the same origin)
            if (iframe.contentDocument && iframe.contentDocument.body) {
                extractTextFromElement(iframe.contentDocument.body);
            }
        } catch (error) {
            console.warn("Could not access iframe content due to cross-origin restrictions:", error);
        }
    });

    return allText.join("\n\n");
}

// Monitor page for dynamically added text
const observer = new MutationObserver(() => {
    chrome.runtime.sendMessage({ action: "updateText", text: extractAllText() });
});

observer.observe(document.body, { childList: true, subtree: true });