/*console.log("checking the CSS NEW CONTENT SCRIPT");
elements = document.getElementById('Guide');  
console.log(console.logs+"");


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
    }
);*/

/*chrome.runtime.sendMessage({ "type": "articleUrl", "url": url }, function (response) {
    console.log("here's the response for sending the URL");
    console.log(response);
});*/