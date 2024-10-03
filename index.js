let btn = document.querySelector("#start");
let area = document.querySelector("#area");

btn.addEventListener("click", () => {
    if (!('webkitSpeechRecognition' in window)) {
        console.error("Speech recognition not supported.");
        return;
    }

    var speech = true;
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true; 

    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        
        console.log(transcript);
        //area.innerText = transcript;
    });

    recognition.addEventListener('error', (e) => {
        if (e.error === 'no-speech') {
            console.error("No speech detected. Please try again.");
         //   area.innerText = "No speech detected. Please try again.";
        } else {
            console.error("Speech recognition error:", e.error);
        }
    });

    if (speech === true) {
        recognition.start();
    }
   
});
