import { useEffect, useState } from "react";
import "./sideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { createChat, deleteChat, selectChat } from "../../store/reducers/chatSlice";
import { create_new_chat } from "../../store/actions/chatAction";
import axios from "../../api/axiosconfic";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  const dispatch = useDispatch();
  const { chats, selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);

  const [showLogout, setShowLogout] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [chatTitle, setChatTitle] = useState("");

  const handleCloseSideBar = () => setShowSideBar(false);
  const handleToggleLogout = () => setShowLogout(!showLogout);

  const createNewChat = () => setShowInput(true);

  const handleInputSubmit = (e) => {
    if (e.key === "Enter" && chatTitle.trim()) {
      const newChat = { title: chatTitle.trim() };
      dispatch(create_new_chat(newChat))
      setChatTitle("");
      setShowInput(false);
    }
  };

  useEffect(() => {
    axios.get("/api/chat", { withCredentials: true })
      .then((res) => {
        res.data.chats.forEach((chat) => {
          dispatch(createChat(chat));
        })
      })

  }, [user])

  return (
    <section className={`sidebar ${showSideBar ? "show-side-bar" : null}`}>
      <div className="gtp-logo">
        <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
        <svg
          onClick={handleCloseSideBar}
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="icon md:hidden"
        >
          <path d="M14.2548 4.75488C14.5282 4.48152 14.9717 4.48152 15.2451 4.75488C15.5184 5.02825 15.5184 5.47175 15.2451 5.74512L10.9902 10L15.2451 14.2549L15.3349 14.3652C15.514 14.6369 15.4841 15.006 15.2451 15.2451C15.006 15.4842 14.6368 15.5141 14.3652 15.335L14.2548 15.2451L9.99995 10.9902L5.74506 15.2451C5.4717 15.5185 5.0282 15.5185 4.75483 15.2451C4.48146 14.9718 4.48146 14.5282 4.75483 14.2549L9.00971 10L4.75483 5.74512L4.66499 5.63477C4.48589 5.3631 4.51575 4.99396 4.75483 4.75488C4.99391 4.51581 5.36305 4.48594 5.63471 4.66504L5.74506 4.75488L9.99995 9.00977L14.2548 4.75488Z"></path>
        </svg>
      </div>

      <div onClick={createNewChat} className="create-new-chat">
        <i className="fa-solid fa-pen-to-square"></i>
        <p>New Chat</p>
      </div>

      <ul className="history">
        <h5>Chats</h5>

        {showInput && (
          <div className="new-chat-input">
            <input
              type="text"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
              onKeyDown={handleInputSubmit}
              placeholder="Enter chat title..."
              autoFocus
            />
          </div>
        )}

        {chats.map((chat) => (
          <li
            key={chat._id}
            onClick={() => dispatch(selectChat(chat._id))}
            className={selectedChat === chat._id ? "selected" : ""}
          >
            <p>{chat.title}</p>
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteChat(chat.id));
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div onClick={handleToggleLogout} className="profile">
        <div className={`logout ${showLogout ? "show-logout" : null}`}>
          Log out
        </div>
        <span>{user.fullName.firstName[0]}</span>
        <p>{user.fullName.firstName + " " + user.fullName.lastName}</p>
      </div>
    </section>
  );
};

export default SideBar;
