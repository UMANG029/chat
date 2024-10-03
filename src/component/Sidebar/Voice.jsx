import { useContext, useRef,useState,useEffect } from "react";
import "./sidebar.css";
import { Context } from "../../context/Context";



const Voice = () => {
    const { Input, setInput, onSent,show,setshow ,setText,startSpeech,stopSpeech} = useContext(Context);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState(Input);

  
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        // Event listener for speech recognition results
        recognition.addEventListener('result', (e) => {
            const speechTranscript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            
            setTranscript(speechTranscript);
        });

        // Error handling
        recognition.addEventListener('error', (e) => {
            if (e.error === 'no-speech') {
                console.error("No speech detected. Please try again.");
            } else {
                console.error("Speech recognition error:", e.error);
            }
        });

        // Start or stop speech recognition when isListening changes
        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

       
        return () => {
            recognition.stop();
        };
    }, [isListening]);  
   
    const toggleListening = () => {
        if (isListening) {
            setshow(false);
           onSent(transcript);

           // console.log("Final Transcript: ", transcript); 
        }
        setIsListening(prevState => !prevState);
    };

  

    return (
        <div className="voice">
            <button className="one" onClick={stopSpeech}>stop</button>
            <button className="one" onClick={startSpeech}>start</button>

            <button className="big" onClick={toggleListening}>
                {isListening ? 'Stop Recognition' : 'Start Recognition'}
            </button>
            <input 
            className="voiceinput"
                type="text" 
                value={transcript} 
                onChange={(e) => {setTranscript(e.target.value)
                }} 
                placeholder="Speech will appear here" 
                style={{ width: '70%', padding: '8px', marginTop: '10px' }}
            />
        </div>
    );
};

export default Voice;

