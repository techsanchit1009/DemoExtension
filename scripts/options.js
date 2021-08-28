var startingCounter = 0;

window.onload = () => {
  chrome.storage.sync.get(['startingCounter'], function(item) {
    startingCounter = item.startingCounter;
    document.getElementById('starting_counter').value = item.startingCounter || '';
  });
}

document.getElementById('starting_counter').addEventListener('keyup', updateStartingCounter);
document.getElementById('send_value').addEventListener('click', sendCounterValue);

function updateStartingCounter(event) {
  startingCounter = Number(event.target.value);
  chrome.storage.sync.set({ startingCounter: startingCounter });
}

function sendCounterValue() {
  chrome.runtime.sendMessage({ message: "Starting Counter", startingCounter: startingCounter });
}