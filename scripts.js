const questionsAndAnswers = [
    { question: "What is your return policy?", answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange." },
    { question: "How can I track my order?", answer: "You can track your order using the tracking number provided in the confirmation email or by logging into your account on our website." },
    { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to many countries. Please check our shipping policy for more details." },
   
  ];
  
  function getSimilarity(a, b) {
    let matchedCharacters = 0;
    for (let i = 0; i < a.length; i++) {
      if (b.includes(a[i])) matchedCharacters++;
    }
    return (matchedCharacters / Math.max(a.length, b.length)) * 100;
  }
  
  function findAnswer(userQuestion) {
    let bestMatch = { question: "", answer: "", similarity: 0 };
    
    for (let qa of questionsAndAnswers) {
      let similarity = getSimilarity(userQuestion.toLowerCase(), qa.question.toLowerCase());
      if (similarity > bestMatch.similarity) {
        bestMatch = { ...qa, similarity };
      }
    }
    
    return bestMatch.similarity >= 80 ? bestMatch.answer :null ;
  }
  
  function handleUserInput() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;
    
    addMessageToChat("user", userInput);
    document.getElementById("user-input").value = '';
    
    const answer = findAnswer(userInput);
    if (answer) {
      addMessageToChat("bot", answer);
    } else {
      addMessageToChat("bot", "I couldn't find an exact match. Would you like to chat with a live agent? (yes/no)");
    }
  }
  
  function addMessageToChat(sender, message) {
    const chatLog = document.getElementById("chat-log");
    
    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${sender}-message`;
    
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = message;
    
    messageElement.appendChild(messageContent);
    chatLog.appendChild(messageElement);
    
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  
//   // Example: handling yes/no responses for live chat initiation
//   document.getElementById("user-input").addEventListener("keypress", function(event) {
//     if (event.key === 'Enter') {
//       handleUserInput();
//     }
//   });
  
//   function initiateLiveChat() {
//     // Implement live chat redirection or notification logic here
//     alert("Redirecting to live chat...");
//   }
  