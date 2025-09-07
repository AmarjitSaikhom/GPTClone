import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, setMessages, setLoading } from "../../store/reducers/chatSlice";
import SideBar from "../../components/sidebar/SideBar";
import Chat from "../../components/chat/Chat";
import "./home.scss";
import { v4 as uuidv4 } from "uuid";
import axios from "../../api/axiosconfic";


const HomePage = () => {
  const dispatch = useDispatch();
  const { selectedChat, chatMessages, isLoading } = useSelector(
    (state) => state.chat
  );

  const [showSideBar, setShowSideBar] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");

  const handleShowSideBar = () => {
    setShowSideBar(true);
  };

  const socket = useRef(null);

  const selectedChatRef = useRef(selectedChat);

  // 🔹 Update ref whenever selectedChat changes
  useEffect(() => {
    if (!selectedChat) return;

    selectedChatRef.current = selectedChat;

    axios.get(`/api/chat/messages/${selectedChat}`, { withCredentials: true })
      .then((res) => {
        const messages = res.data.messages.map((item) => ({
          id: item._id || uuidv4(),
          content: item.content,
          sender: item.role,
        }));

        // ✅ Replace old messages instead of appending
        dispatch(setMessages({ chatId: selectedChat, messages }));
      })
      .catch(err => {
        console.error("Failed to fetch messages:", err);
      });

  }, [selectedChat, dispatch]);


  useEffect(() => {
    socket.current = io("http://localhost:3000", { withCredentials: true })

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null
      }
    };

  }, []);

  useEffect(() => {
    if (!socket.current) return

    const handleAiResponse = (messagePayload) => {
      const activeChat = selectedChatRef.current

      if (!activeChat) return


      const gptResponse = {
        id: uuidv4(),
        content: messagePayload,
        sender: "model",
      };

      dispatch(sendMessage({ chatId: activeChat, message: gptResponse }));
      dispatch(setLoading(false));
    }

    socket.current.on("ai-response", handleAiResponse)


    return () => {
      socket.current.off("ai-response", handleAiResponse)
    }


  }, [dispatch])

  // const simulateGPTResponse = (userMessage) => {
  //   const responses = [
  //     "I understand. Can you tell me more about that?",
  //     "That's interesting! How does that make you feel?",
  //     "Let me help you with that. What specific information are you looking for?",
  //     "I appreciate your question. Here's what I think...",
  //     "That's a great point! Have you considered...",
  //   ];
  //   return responses[Math.floor(Math.random() * responses.length)];
  // };

  const handleMessageSend = () => {
    if (!promptMessage.trim() || !selectedChat) return;

    const newUserMessage = {
      id: uuidv4(),
      content: promptMessage,
      sender: "user",
    };


    if (socket.current) {
      socket.current.emit("ai-message", {
        chat: selectedChat,
        content: promptMessage
      })
    }


    dispatch(sendMessage({ chatId: selectedChat, message: newUserMessage }));
    setPromptMessage("");
    dispatch(setLoading(true));

    // setTimeout(() => {
    //   const gptResponse = {
    //     id: Date.now(),
    //     messageContent: simulateGPTResponse(promptMessage),
    //     sender: "gpt",
    //   };
    //   dispatch(sendMessage({ chatId: selectedChat, message: gptResponse }));
    //   dispatch(setLoading(false));
    // }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessageSend();
    }
  };


  return (
    <section className="home">
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="home-chat-contain">
        <nav>
          <svg onClick={handleShowSideBar} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-rtl-flip="" className="icon-lg text-token-text-secondary mx-2"><path d="M11.6663 12.6686L11.801 12.6823C12.1038 12.7445 12.3313 13.0125 12.3313 13.3337C12.3311 13.6547 12.1038 13.9229 11.801 13.985L11.6663 13.9987H3.33325C2.96609 13.9987 2.66839 13.7008 2.66821 13.3337C2.66821 12.9664 2.96598 12.6686 3.33325 12.6686H11.6663ZM16.6663 6.00163L16.801 6.0153C17.1038 6.07747 17.3313 6.34546 17.3313 6.66667C17.3313 6.98788 17.1038 7.25586 16.801 7.31803L16.6663 7.33171H3.33325C2.96598 7.33171 2.66821 7.03394 2.66821 6.66667C2.66821 6.2994 2.96598 6.00163 3.33325 6.00163H16.6663Z"></path></svg>
          <h3>
            GPTClone
          </h3>
        </nav>

        <Chat messages={selectedChat ? chatMessages[selectedChat] || [] : []} isLoading={isLoading} />

        <div className="chatInput">
          <div className="inputBox">
            <input
              placeholder="Ask anything"
              value={promptMessage}
              onChange={(e) => setPromptMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div onClick={handleMessageSend} id="submit">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <p className="info">
            AI can make mistakes. Check important info. See Cookie Preferences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
