console.log('Background file imported!');
var counter = 0;

chrome.runtime.onMessage.addListener(
  function(request, sender, senderResponse) {
    if (request.message === 'Button Clicked') {
      counter++;
      chrome.runtime.sendMessage({ type: "Increment", counter: counter });
      chrome.storage.sync.set({ counter: counter });
    } else if (request.type === "Get Counter") {
      chrome.storage.sync.get(['counter'], function(items) {
        counter = items.counter || counter;
        chrome.runtime.sendMessage({ type: "Counter Value", counter: counter });
      });
    } else if (request.message === "Starting Counter") {
      console.log(request);
      counter = request.startingCounter;
      chrome.runtime.sendMessage({ type: "Counter Value", counter: counter });
    }
  }
);