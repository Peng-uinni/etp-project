document.getElementById('start-transcription').addEventListener('click', () => {
  const contentDiv = document.getElementById('transcription-content');
  contentDiv.textContent = 'Loading';


  setTimeout(() => {
    contentDiv.textContent = 'This is the transcribed content from your extension.';
  }, 3000);
});
