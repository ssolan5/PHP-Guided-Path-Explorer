chrome.browserAction.onClicked.addListener(function() {

  

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "delete"}, 
    function(response) {


    });
  })
});


chrome.webNavigation.onCompleted.addListener(function() {
    

    

}, {url: [{ hostContains : 'localhost'}]});


