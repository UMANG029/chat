import { createContext, useState } from "react";
import search from "../config/gemini";

//import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [Input, setInput] = useState("");
  const [rprompt, setrprompt] = useState("");
  const [pprompt, setpprompt] = useState([]);
  const [show, setshow] = useState(true);
  const [load, setload] = useState(false);
  const [result, setresult] = useState("");

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = true;

  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const startSpeech = () => {
    if (text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

function type(index,next){
setTimeout(function(){
setresult(prev=>prev+next)
},75*index)

}


  const onSent = async (prompt) => {
    // setpprompt(Input);
    let newarr5 = [
      ...pprompt,
      prompt
    ];
    setpprompt(newarr5);

newarr5.forEach(element => {
  console.log(element);
});

   

    setresult("");
    setload(true);
    setrprompt(prompt);
    let answer = await search(prompt);
    let answerArray=answer.split("**");
    let newarr;
    for (let index = 0; index < answerArray.length; index++) {
      if(index==0||index%2==0){
        newarr+=answerArray[index];
      }
      else{
        newarr+="<b>"+answerArray[index]+"</b>";
      }
      
    }
    let newarr2=newarr.split("*").join("</br>")

    let newarr3=newarr2.split(" ");

    for (let index = 0; index < newarr3.length; index++) {
      const element = newarr3[index];
      type(index,element+" ");
    }




    setText(answer);
   // console.log(newarr2);
   
    setload(false);
    setInput("");
  };

  // run('what is apple');
  // onSent("what is apple");
  const contextValue = {
    pprompt,
    setpprompt,
    onSent,
    setrprompt,
    setText,
    rprompt,
    result,
    load,
    show,
    setshow,
    Input,
    setInput,
    startSpeech,
    stopSpeech,
    recognition,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
