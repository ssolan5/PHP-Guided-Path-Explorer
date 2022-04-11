

consolebindstring = 'console.log( "BINDING THE CONSOLE NOW ");'
+'console.defaultLog = console.log.bind(console);'
+'console.logs = [];'
+'console.log = function(){'
+'console.defaultLog.apply(console, arguments);'
+'console.logs.push(Array.from(arguments));}'
+'console.log("BLOOPER");'
+"chrome.storage.local.set({ 'bindconsole' : true });"
+'console.log(console.logs+"");';



  /*if ( location.href === 'http://localhost:8888/seopanel-info/' ) {
      
      code = 'body::before { content: "We will start soon!"; display: flex; align-items: normal; font-size: lvw; font-weight: bold; color: rgba(255, 255, 255, 0.9); position: fixed; z-index: 9999; background-color: rgba(0, 0, 0, 0.4); border-radius: 20px; box-shadow: 0px 0px 6px #777; padding: 10px 20px 15px; top: 20%; left: 90%; height: 18vw; width: 10vw; margin-right: 50%; transform: translate(-50%, -50%); backdrop-filter: blur(4px);}'
      console.log("My Style will be injected soon");
      
      
    
      var ElementStyle = document.getElementsByClassName("PathExplorerTip");

      if (typeof(ElementStyle) != 'undefined' && ElementStyle != null)
      {
          // Exists. 
          
      } else {
        ElementStyle = document.createElement('style');
        ElementStyle.className = "PathExplorerTip";
        ElementStyle.innerText = code;
        document.head.appendChild(ElementStyle);
      }
    
    }*/