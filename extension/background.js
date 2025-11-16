// Background service worker for the Transcript extension
// Handles extension events and lifecycle management

chrome.runtime.onInstalled.addListener(() => {
  console.log('Transcript extension installed');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Chrome browser started');
});
