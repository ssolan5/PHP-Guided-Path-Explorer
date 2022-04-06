/*chrome.storage.local.get('bindingSTART', function(result) {

  console.log('Checking bind value' + result.bindingSTART);

  if(result.bindingSTART === true){
    console.log("pre navigation!!!");
    consolelogs = "hm.it works";
    runInPageContext(overwriteConsole, consolelogs );

    chrome.storage.local.set({ bindingSTART : false });

  }
  
  
})*/



text = "\'We are going to start soon\'";
code = "body::before { content: "+ text +"; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: white; position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 
//code = "body::before { content: " + "'we are going to start soon'" + "; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: rgba(255, 255, 255, 0.9); position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 

const styleElement = document.createElement('style');
styleElement.id = 'Guide';
styleElement.textContent = code;
document.documentElement.appendChild(styleElement);


chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {

    /*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");*/

   //elements = document.getElementById('Guide');  
   //console.log(console.logs+"");
   //console.log(JSON.stringify(request));

   if(request.greeting === "delete"){
    
     //console.log("DELETE"); 
     runInPageContext(StoreLogs); 
    
     /*chrome.storage.sync.get(['myoldlogs'], function (result){
      
              console.log("Is there a localstorage??" + JSON.stringify(result));
    });*/

     //console.log("in delete"+ console.logs);
     /*elements = document.getElementById('Guide');
     elements.remove(); 
    
     /*
     newcontent = "\'"+ +"\'"
     newcode = "body::before { content:" + newcontent + "; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: rgba(255, 255, 255, 0.9); position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 
     
     chrome.storage.local.get('myoldlogs', function (result){
      console.log(result.myoldlogs);
     });
     
     const boopelements = document.createElement('style');
     boopelements.id = 'Guide';
     boopelements.textContent = newcode;
     //elements.sheet.elements.sheet.cssRules[0].style.content = newcontent;
     document.documentElement.appendChild(boopelements);*/
     
    /*

     newcontent = "\'wow new content\'"
     newcode = "body::before { content:" + newcontent + "; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: rgba(255, 255, 255, 0.9); position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 10vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 
     
     
     
     const boopelements = document.createElement('style');
     boopelements.id = 'Guide';
     boopelements.textContent = newcode;
     //elements.sheet.elements.sheet.cssRules[0].style.content = newcontent;
     document.documentElement.appendChild(boopelements);*/




   }else{

    runInPageContext(logger,"sending a request");

   }

   
  }
);

const StoreLogs = ()=>{

     //elements = document.getElementById('Guide');
     //elements.remove(); 
     //console.log(console.logs+"StoreLogs");
     newcontent = "\'"+console.logs +"\'"
     //newcontent = console.logs + "";

     //console.logs("Checking if we have access to console.logs" + newcontent);
     //console.log
     //console.log("Storing logs into localstorage");

     //document.cookie = newcontent;
     //localStorage.setItem('myoldlogs', newcontent);
     //const cat = localStorage.getItem('myoldlogs');
     //console.log("From localstorage :" + cat);

     //const cat = localStorage.getItem('myoldlogs');

     newcode = "body::before { content:" + newcontent + "; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: white; position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 
     
     const boopelements = document.createElement('style');
     boopelements.id = 'Guide';
     boopelements.textContent = newcode;
     //elements.sheet.elements.sheet.cssRules[0].style.content = newcontent;
     document.documentElement.appendChild(boopelements); 

}

const logger = (logtext)=>{

  //console.log(logtext);
  console.log(console.logs+"");

}

const overwriteLanguage = (language) => {
  Object.defineProperty(navigator, 'language', {
    get: () => language,
  });
};

const overwriteConsole = (consolelogs) => {

  console.defaultLog = console.log.bind(console);
  console.logs = [];
  console.log = function(){
        // default &  console.log()
          console.defaultLog.apply(console, arguments);
          // new & array data
          console.logs.push(Array.from(arguments));
  }

  if(console.logs){
    console.log(consolelogs);
    console.log(console.logs +'');
  }
  
};


// Breaks out of the content script context by injecting a specially
// constructed script tag and injecting it into the page.
const runInPageContext = (method, ...args) => {
    // The stringified method which will be parsed as a function object.
    const stringifiedMethod = method instanceof Function
      ? method.toString()
      : `() => { ${method} }`;
  
    // The stringified arguments for the method as JS code that will reconstruct the array.
    const stringifiedArgs = JSON.stringify(args);
  
    // The full content of the script tag.
    const scriptContent = `
      // Parse and run the method with its arguments.
      (${stringifiedMethod})(...${stringifiedArgs});
  
      // Remove the script element to cover our tracks.
      document.currentScript.parentElement
        .removeChild(document.currentScript);
    `;
     
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = scriptContent;
    document.documentElement.appendChild(scriptElement);

    
  };

  

/*chrome.storage.local.get('bindingSTART', function(result) {

chrome.storage.local.get('myoldlogs', function (result){
      
      console.log("Is there a localstorage??" + JSON.stringify(result));
    });      console.log('Console bind Succeeded ' + result.bindingSTART);

      if(result.bindingSTART === true){
        console.log("pre navigation!!!");
        consolelogs = "hm.it works";
        runInPageContext(overwriteConsole, consolelogs );

        chrome.storage.local.set({ bindingSTART : false });

      }
      
      
});*/

consolelogs = "--";
runInPageContext(overwriteConsole, consolelogs );
runInPageContext(overwriteLanguage,'xx-XX');


// This won't work, it's sandboxed from the page context.




