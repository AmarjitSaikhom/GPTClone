import { useEffect, useRef } from "react";
import "./chat.scss";

const Chat = ({ messages, isLoading }) => {
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <section className="chat">
            <div className="chat-container">
                {messages.length === 0 ? (
                    <div className="empty-chat">
                        <h1>Start a New Chat !</h1>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div key={message.id} className={message.sender === 'user' ? 'userDiv' : 'gptDiv'}>
                                <p className={message.sender === 'user' ? 'userMessage' : 'gptMessage'}>
                                    {message.content}
                                </p>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="gptDiv">
                                <div className="loading-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={chatEndRef} />
            </div>
        </section>
    );
};

export default Chat;
