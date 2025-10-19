const audioChunks = [];
let mediaRecorder;

document.getElementById('start-transcription').addEventListener('click', () => {
  startTabAudioCapture();
  return true;
});

document.getElementById('stop-transcription').addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    logStatus("Recording stopped by user.");
  }
});

function logStatus(message) {
  const statusDiv = document.getElementById('status');
  const p = document.createElement('p');
  p.textContent = message;
  statusDiv.appendChild(p);
}


function connectStreamToSpeakers(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(audioContext.destination);
    
    logStatus("Audio passthrough activated. You should now hear the tab.");
    
    return { audioContext, source };
}


function startTabAudioCapture() {
    logStatus("Starting tab audio capture...");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
            if (!stream) {
                logStatus(`Capture failed: ${chrome.runtime.lastError.message}`);
                return;
            }
            logStatus("Tab audio stream successfully captured.");

            const passthrough = connectStreamToSpeakers(stream);

            mediaRecorder = new MediaRecorder(stream);
            audioChunks.length = 0;

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                logStatus("Recording stopped. Converting to file.");
                
                passthrough.source.disconnect(passthrough.audioContext.destination);
                passthrough.audioContext.close();
                stream.getTracks().forEach(track => track.stop());
                
                // Combine chunks into a single audio Blob and download...
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                chrome.downloads.download({
                    url: url,
                    filename: 'captured_tab_audio.webm'
                });
                logStatus("Recording downloaded.");
            };

            mediaRecorder.start();
            logStatus("Recording started (10s limit for demo).");

            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                    logStatus("Recording stopped automatically after 10 seconds.");
                }
            }, 10000); 
        });
    });
}
