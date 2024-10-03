
//import 'bootstrap/dist/css/bootstrap.min.css'

import { assets } from "../../assets/assets";
import { useContext, useRef } from "react";
import Recent from "../Sidebar/recent";
import { Context } from "../../context/Context";
import Voice from "../Sidebar/Voice";
import "./Main.css";
function Main() {
  const { Input, rprompt, setInput, onSent, show, setshow, result ,load } =
    useContext(Context);

  return (
    <div className="main">
      <Voice></Voice>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {show ? (
          <div>
            <div className="greet">
              <p>
                <span>HELLO,UMANG</span>
              </p>
              <p className="now">How can i help you today ?</p>
            </div>
            <div className="cards scrolling-wrapper">
              <div className="card" onClick={()=>{
                  onSent("Write a product description for a new type of toothbrush");
                
                  setshow(false);
                 
              }}>
                <p>Write a product description for a new type of toothbrush</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card" onClick={()=>{
                  onSent("Suggest an organized list of the best food spots in a city")
                
                  setshow(false);
              }}>
                <p>
                  Suggest an organized list of the best food spots in a city
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card" onClick={()=>{
                  onSent("Road trip drive time and kid entertainment ideas")
                 
                  setshow(false);
              }}>
                <p>Road trip drive time and kid entertainment ideas</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card" onClick={()=>{
                  onSent("Give me tips for how to grow my YouTube channel")
                
                  setshow(false);
              }}>
                <p>Give me tips for how to grow my YouTube channel</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </div>
        ) : 
          <div>
            <div className="question">
              <img src={assets.user_icon} alt="" />
              <p> {rprompt}</p>
            </div>
         
            <div className="answer">
            {load? <Recent></Recent>
            : 
              null
            }
              <p dangerouslySetInnerHTML={ {__html: result }}></p>
            </div>
          </div>
        }
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="ENTER PROMPT HERE"
              className="inputt"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={Input}
            />
            <div className="imgdiv">
             

              <img
                onClick={() => {
                  onSent(Input);
                  setshow(false);
                }}
                src={assets.send_icon}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}
export default Main;
