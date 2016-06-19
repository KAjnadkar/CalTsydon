function sendquestionOrTopic() {
    var questionOrTopic = document.getElementById('questionOrTopic').value;
    stompClient.send("/ct/initConversation", {}, JSON.stringify({ 'greeting': questionOrTopic }));
}