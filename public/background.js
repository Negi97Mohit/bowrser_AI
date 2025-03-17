chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractText") {
        chrome.scripting.executeScript(
            {
                target: { tabId: sender.tab.id },
                function: extractAllText
            },
            (result) => {
                if (result && result[0].result) {
                    sendResponse({ text: result[0].result });
                }
            }
        );
        return true;
    }
});

function extractAllText() {
    return document.body.innerText;
}
