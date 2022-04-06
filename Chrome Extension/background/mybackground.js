chrome.browserAction.onClicked.addListener(function() {

  
  //chrome.tabs.executeScript({code:`console.log('we clicked');`});

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "delete"}, 
    function(response) {

        //chrome.storage.local.get('myoldlogs', function (result){
        //console.log("OLD LOGS :" + JSON.stringify(result));
      //});

    });
  })
});


chrome.webNavigation.onCompleted.addListener(function() {
    
    //chrome.tabs.executeScript({files:['background/NewContentScript.js']});
    
    //chrome.tabs.executeScript({code:`console.log("The background: " + console.logs+"");`});
    
    /*chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }*/
 // });    
    

}, {url: [{ hostContains : 'localhost'}]});


