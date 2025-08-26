import { useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import "./home.scss";
import Chat from "../../components/chat/Chat";

const HomePage = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [promptMessage, setPromptMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShowSideBar = () => {
    setShowSideBar(true);
  }

  const handleCreateNewChat = (newChat) => {
    setChats(prevChats => [newChat, ...prevChats]);
    setSelectedChat(newChat.id);
    setChatMessages(prev => ({
      ...prev,
      [newChat.id]: []
    }));
  };

  const handleDeleteChat = (chatId) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    setChatMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[chatId];
      return newMessages;
    });
    if (selectedChat === chatId) {
      setSelectedChat(null);
    }
  };

  const simulateGPTResponse = (userMessage) => {
    const responses = [
      "I understand. Can you tell me more about that?",
      "That's interesting! How does that make you feel?",
      "Let me help you with that. What specific information are you looking for?",
      "I appreciate your question. Here's what I think...",
      "That's a great point! Have you considered..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleMessageSend = () => {
    if (!promptMessage.trim() || !selectedChat) return;

    const newUserMessage = {
      id: Date.now(),
      messageContent: promptMessage,
      sender: 'user'
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newUserMessage]
    }));
    setPromptMessage('');
    setIsLoading(true);

    // Simulate GPT response with a slight delay
    setTimeout(() => {
      const gptResponse = {
        id: Date.now(),
        messageContent: simulateGPTResponse(promptMessage),
        sender: 'gpt'
      };
      setChatMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), gptResponse]
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessageSend();
    }
  };



  return (
    <section className="home">
      <SideBar
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        chats={chats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        onCreateNewChat={handleCreateNewChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="home-chat-contain">
        <nav>
          <svg onClick={handleShowSideBar} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-rtl-flip="" className="icon-lg text-token-text-secondary mx-2"><path d="M11.6663 12.6686L11.801 12.6823C12.1038 12.7445 12.3313 13.0125 12.3313 13.3337C12.3311 13.6547 12.1038 13.9229 11.801 13.985L11.6663 13.9987H3.33325C2.96609 13.9987 2.66839 13.7008 2.66821 13.3337C2.66821 12.9664 2.96598 12.6686 3.33325 12.6686H11.6663ZM16.6663 6.00163L16.801 6.0153C17.1038 6.07747 17.3313 6.34546 17.3313 6.66667C17.3313 6.98788 17.1038 7.25586 16.801 7.31803L16.6663 7.33171H3.33325C2.96598 7.33171 2.66821 7.03394 2.66821 6.66667C2.66821 6.2994 2.96598 6.00163 3.33325 6.00163H16.6663Z"></path></svg>
          <h3>{chats.find(chat => chat.id === selectedChat)?.title || 'GPTClone'}</h3>
        </nav>

        <Chat
          messages={selectedChat ? chatMessages[selectedChat] || [] : []}
          isLoading={isLoading}
        />

        <div className="chatInput">
          <div className="inputBox">
            <input placeholder="Ask anything"
              value={promptMessage}
              onChange={(e) => setPromptMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            >

            </input>
            <div onClick={handleMessageSend} id="submit"><i className="fa-solid fa-arrow-right"></i></div>
          </div>
          <p className="info">
            AI can make mistakes. Check important info. See Cookie Preferences.
          </p>
        </div>
      </div>

    </section>
  )
}

export default HomePage
