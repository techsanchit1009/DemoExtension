window.onload = () => {
  chrome.runtime.sendMessage({ type: "Get Counter" });
}

document.getElementById('click_btn').addEventListener('click', buttonClicked);

document.getElementById('clear_storage').addEventListener('click', clearStorage);

function clearStorage() {
  chrome.storage.sync.remove('counter', function() {
    console.log('counter was removed');
  });
  // chrome.storage.sync.clear();
}

function buttonClicked() {
  chrome.runtime.sendMessage({ message: "Button Clicked" });
}

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.type === "Increment") {
      document.getElementById('counter').innerText = request.counter;
    } else if (request.type === "Counter Value") {
      console.log(request);
      document.getElementById('counter').innerText = request.counter || 0;
    }
  }
);