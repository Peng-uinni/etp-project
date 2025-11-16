const BACKEND_URL = "http://localhost:8000";
const MAX_RECORDING_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds

let audioChunks = [];
let mediaRecorder = null;
let recordingStartTime = null;
let timerInterval = null;
let isRecording = false;

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const timerDisplay = document.getElementById('timer');
const statusBox = document.getElementById('status');
const authStatus = document.getElementById('auth-status');
const maxWarning = document.getElementById('max-warning');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

async function checkLoginStatus() {
  try {
    const response = await fetch(`${BACKEND_URL}/user/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const user = await response.json();
      showAuthMessage(`Logged in as ${user.name || user.email}`, 'success');
      startButton.disabled = false;
    } else {
      showAuthMessage('You must be logged in to use this extension', 'error');
      startButton.disabled = true;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    showAuthMessage('Unable to verify login. Please refresh.', 'error');
    startButton.disabled = true;
  }
}

function showAuthMessage(message, type) {
  authStatus.textContent = message;
  authStatus.className = `auth-message ${type}`;
  authStatus.style.display = 'block';
}

function addStatusMessage(message, type = 'info') {
  const messageEl = document.createElement('div');
  messageEl.className = `status-message ${type}`;
  messageEl.textContent = message;
  statusBox.appendChild(messageEl);
  statusBox.scrollTop = statusBox.scrollHeight;
}

function updateTimer() {
  const elapsed = Date.now() - recordingStartTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  timerDisplay.textContent = timeString;
  timerDisplay.classList.add('active');

  // Check if max time reached
  if (elapsed >= MAX_RECORDING_TIME) {
    maxWarning.classList.add('active');
    stopRecording();
  }
}

async function startRecording() {
  statusBox.innerHTML = ''; // Clear previous messages
  maxWarning.classList.remove('active');
  addStatusMessage('Checking audio permissions...', 'info');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabCapture.capture({ audio: true, video: false }, async (stream) => {
      if (!stream) {
        addStatusMessage(`Capture failed: ${chrome.runtime.lastError?.message || 'Unknown error'}`, 'error');
        return;
      }

      addStatusMessage('Audio stream captured', 'success');

      // Create audio context for passthrough (user can hear the audio while recording)
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(audioContext.destination);
        addStatusMessage('Audio passthrough enabled - you can hear the recording', 'info');
      } catch (err) {
        console.warn('Audio passthrough not available:', err);
      }

      // Set up media recorder
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      isRecording = true;
      recordingStartTime = Date.now();

      // Update UI
      startButton.style.display = 'none';
      stopButton.classList.add('active');

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        isRecording = false;
        startButton.style.display = 'block';
        stopButton.classList.remove('active');
        timerDisplay.classList.remove('active');
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';

        addStatusMessage('Processing audio...', 'info');

        // Combine chunks and send to backend
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      addStatusMessage('Recording started (max 20 minutes)', 'success');

      // Start timer
      timerInterval = setInterval(updateTimer, 1000);
    });
  });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    addStatusMessage('Recording stopped', 'info');
  }
}

async function sendAudioToBackend(audioBlob) {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch(`${BACKEND_URL}/extension/transcript`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      addStatusMessage('Transcript created successfully!', 'success');
      if (result.transcript) {
        addStatusMessage(`Transcript: ${result.transcript.substring(0, 100)}...`, 'info');
      }
    } else {
      const error = await response.json();
      addStatusMessage(`Backend error: ${error.detail || 'Unknown error'}`, 'error');
    }
  } catch (error) {
    console.error('Send audio error:', error);
    addStatusMessage(`Failed to send audio: ${error.message}`, 'error');
  }
}
