chrome.action.onClicked.addListener(() => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: openSidebar
  });
});

function openSidebar() {
  const sidebar = document.createElement('div');
  sidebar.id = 'custom-sidebar';
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = '0';
  sidebar.style.width = '300px';
  sidebar.style.height = '100%';
  sidebar.style.backgroundColor = 'white';
  sidebar.style.boxShadow = '-2px 0px 5px rgba(0,0,0,0.1)';
  sidebar.style.zIndex = '1000';

  const content = document.createElement('div');
  content.innerHTML = `<h2>Sidebar</h2><p>This is your sidebar content.</p>`;
  sidebar.appendChild(content);
  
  document.body.appendChild(sidebar);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = () => sidebar.remove();
  sidebar.appendChild(closeButton);
}
