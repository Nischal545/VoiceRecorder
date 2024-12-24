const statusCheck = document.getElementById("status");
statusCheck.textContent = "Recorded has not started";
let mediaStream;
let audioElement;
let mediaRecorder;
let audioChunks = [];
let audioUrl;
let audioBlob;

function startBtn(){
    const userResponse = window.confirm("Do you want to start recording?");
    if(userResponse){
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream){
            statusCheck.textContent = "Microphone Accessed";

            let live_audio = new Audio();
            live_audio.srcObject = stream;
            live_audio.play();

            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            audioChunks = [];
            mediaRecorder.ondataavailable = (event)=>{
                audioChunks.push(event.data);
            }

            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
                audioUrl = URL.createObjectURL(audioBlob);
                audioElement = new Audio(audioUrl);
                statusCheck.textContent = "Recording stopped. You can play the audio.";
            };

            mediaStream = stream
        })
        .catch(function(err){
            statusCheck.textContent = "Access Denied";
        })
    }else{
        alert("Bye bye");
    }
    
}


function stopBtn(){
    mediaRecorder.stop();
    statusCheck.textContent = "Recording Stopped";
    
}


function disableMic(){
    if(mediaStream){
        mediaStream.getTracks().forEach(track=>{
            track.stop();
        });
        statusCheck.textContent = "Microphone access disable";
    }else{
        alert("No microphone access to disable");
    }

    
}

function playBtn(){
    if(audioElement){
        audioElement.play();
    }
}