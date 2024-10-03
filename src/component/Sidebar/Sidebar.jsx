import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { useState } from "react";
function Sidebar() {
  const [extend, setextend] = useState(false);

  const { pprompt } = useContext(Context);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu"
          onClick={(prev) => setextend((prev) => !prev)}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extend ? <p>NEW CHAT</p> : null}
        </div>

        {extend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
          {pprompt.map(item=>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>{item}</p>
            </div>
          )};
          


            
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>setting</p> : null}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
