function displayEmptyState(visible) {
    const emptyStateElement = document.querySelector('.empty-state');
    emptyStateElement.style.display = visible ? 'flex' : 'none';
  }
  
  async function fetchMessages() {
    try {
      const response = await fetch('http://localhost:3000/api/messages');
      const messages = await response.json();
  
      displayEmptyState(messages.length === 0);
  
      const messagesContainer = document.getElementById('discord-messages');
      messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('discord-message');
  
        const authorElement = document.createElement('strong');
        authorElement.textContent = `${message.author}:`;
        messageElement.appendChild(authorElement);
  
        const contentElement = document.createElement('span');
        contentElement.textContent = message.content;
        messageElement.appendChild(contentElement);
  
        messagesContainer.appendChild(messageElement);
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchMessages();
  