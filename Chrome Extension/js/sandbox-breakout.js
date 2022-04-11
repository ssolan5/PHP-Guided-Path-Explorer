text = "\'Click to receive instructions\'";
code = "body::before { content: "+ text +"; white-space: pre-wrap; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: white; position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 40%; left: 90%; height: fit-content; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 
//code = "body::before { content: " + "'we are going to start soon'" + "; white-space: pre-wrap; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: rgba(255, 255, 255, 0.9); position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}"; 

const styleElement = document.createElement('style');
styleElement.id = 'Guide';
styleElement.textContent = code;
document.documentElement.appendChild(styleElement);


chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {

    /*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");*/

   if(request.greeting === "delete"){
    
     console.log("LOG:STORING OUR LOGS"); 
     runInPageContext(StoreLogs); 

   }else{
    runInPageContext(logger,"sending a request");
   }
  }
);

const StoreLogs = ()=>{


     newcontent = '\"'+console.logs +'\A\"';
     newcode = "body::before { content:" + newcontent + "; white-space: pre-wrap; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: white; position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 40%; left: 90%; height: fit-content; width: 30vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}";     
     const boopelements = document.createElement('style');
     boopelements.id = 'Guide';
     boopelements.textContent = newcode;
     //elements.sheet.elements.sheet.cssRules[0].style.content = newcontent;
     document.documentElement.appendChild(boopelements); 

}

const logger = (logtext)=>{

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

          if(Array.from(arguments)){

            check = Array.from(arguments);
            if(check.filter(s => s.includes('LOG:')).length){
              //console.defaultLog('found log');
              console.logs.pop();
            }else{
              console.logs[console.logs.length - 1 ] = console.logs[console.logs.length - 1 ]+'\\A'; 
            }
          }
          
  }

  if(console.logs){
    console.log(consolelogs);
    console.logs.pop();
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

  


consolelogs = "--TESTING CONSOLE BIND LOG--";
runInPageContext(overwriteConsole, consolelogs );
runInPageContext(overwriteLanguage,'xx-XX');


// This won't work, it's sandboxed from the page context.




