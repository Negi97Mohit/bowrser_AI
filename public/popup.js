// Function to fetch and display questions
async function fetchAndDisplayQuestions() {
    try {
        const response = await fetch('http://localhost:5000/get-questions');
        const data = await response.json();
        const questionList = document.getElementById('questionList');
        questionList.innerHTML = ''; // Clear the list

        data.questions.forEach(question => {
            const li = document.createElement('li');

            // Add a checkbox for each question
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = question;
            li.appendChild(checkbox);

            // Add the question text
            const questionText = document.createElement('span');
            questionText.textContent = question;
            li.appendChild(questionText);

            // Add a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', async () => {
                await removeQuestion(question);
                fetchAndDisplayQuestions(); // Refresh the list
            });

            li.appendChild(removeButton);
            questionList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// Function to add a question
document.getElementById('addQuestion').addEventListener('click', async () => {
    const newQuestion = document.getElementById('newQuestionInput').value.trim();
    if (!newQuestion) {
        alert('Please enter a question.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: newQuestion }),
        });

        if (!response.ok) {
            throw new Error('Failed to add question.');
        }

        document.getElementById('newQuestionInput').value = ''; // Clear the input field
        fetchAndDisplayQuestions(); // Refresh the list
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add question. Please try again.');
    }
});

// Function to remove a question
async function removeQuestion(question) {
    try {
        const response = await fetch('http://localhost:5000/remove-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove question.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to remove question. Please try again.');
    }
}

// Function to answer selected questions
document.getElementById('answerSelectedQuestions').addEventListener('click', async () => {
    const selectedAnswersDiv = document.getElementById('selectedAnswers');
    selectedAnswersDiv.innerHTML = ''; // Clear previous answers

    // Show loading animation
    document.getElementById('loadingAnimation').style.display = 'inline-block';

    // Get the extracted text from storage
    chrome.storage.local.get(['extractedText'], async (result) => {
        const extractedText = result.extractedText;
        if (!extractedText) {
            alert('No text extracted yet. Please click "Read Text" first.');
            document.getElementById('loadingAnimation').style.display = 'none'; // Hide loading animation
            return;
        }

        // Get the selected questions
        const checkboxes = document.querySelectorAll('#questionList input[type="checkbox"]:checked');
        const selectedQuestions = Array.from(checkboxes).map(checkbox => checkbox.value);

        if (selectedQuestions.length === 0) {
            alert('No questions selected. Please select at least one question.');
            document.getElementById('loadingAnimation').style.display = 'none'; // Hide loading animation
            return;
        }

        // Send the extracted text and selected questions to the backend
        try {
            const response = await fetch('http://localhost:5000/answer-selected-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: extractedText,
                    selectedQuestions: selectedQuestions,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch answers.');
            }

            const data = await response.json();
            const answers = data.answers;

            // Display the answers
            answers.forEach(({ question, answer }) => {
                const answerDiv = document.createElement('div');
                answerDiv.className = 'answer';
                answerDiv.innerHTML = `
                    <strong>Question:</strong> ${question}<br>
                    <strong>Answer:</strong> ${answer}<br><br>
                `;
                selectedAnswersDiv.appendChild(answerDiv);
            });
        } catch (error) {
            console.error('Error:', error);
            selectedAnswersDiv.textContent = 'Failed to get answers. Please try again.';
        } finally {
            // Hide loading animation
            document.getElementById('loadingAnimation').style.display = 'none';
        }
    });
});

// Function to ask a single question
document.getElementById('askQuestion').addEventListener('click', async () => {
    const question = document.getElementById('questionInput').value.trim();
    if (!question) {
        alert('Please enter a question.');
        return;
    }

    // Show loading animation
    document.getElementById('loadingAnimation').style.display = 'inline-block';
    document.getElementById('aiResponse').innerHTML = ''; // Clear previous response

    chrome.storage.local.get(['extractedText'], async (result) => {
        const extractedText = result.extractedText;
        if (!extractedText) {
            alert('No text extracted yet. Please click "Read Text" first.');
            document.getElementById('loadingAnimation').style.display = 'none'; // Hide loading animation
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: extractedText,
                    question: question,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch AI response.');
            }

            const data = await response.json();
            const aiResponse = data.profile;
            document.getElementById('aiResponse').innerHTML = aiResponse; // Render the response
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('aiResponse').textContent = 'Failed to get AI response. Please try again.';
        } finally {
            // Hide loading animation
            document.getElementById('loadingAnimation').style.display = 'none';
        }
    });
});

// Function to extract text from the webpage
document.getElementById('readText').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                function: extractAllText,
            },
            (result) => {
                if (result && result[0].result) {
                    const extractedText = result[0].result;
                    document.getElementById('textOutput').value = extractedText;
                    chrome.storage.local.set({ extractedText });
                }
            }
        );
    });
});


// Function to ask a single question

// Load questions when the popup opens
document.addEventListener('DOMContentLoaded', fetchAndDisplayQuestions);

function extractAllText() {
    return document.body.innerText;
}