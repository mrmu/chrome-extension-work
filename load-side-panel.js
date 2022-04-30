console.log("load-side-panel script loaded");

// toggle side panel
function toggle(){
    if(iframe.style.width == "0px"){
        iframe.style.width="300px";
    }else{
        iframe.style.width="0px";
    }
}

// 收到 toggle message 就執行 toggle 
// (由 background.js 註冊在 extension 被 click 時發送 toggle message)
chrome.runtime.onMessage.addListener(function(msg, sender){
    if (msg === "toggle"){
        console.log("side-panel received toggle msg.");
        toggle();
    }
});

var iframe = document.createElement('iframe'); 
// iframe.style.background = "green";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.minWidth = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "1px #cccccc solid"; 
iframe.src = chrome.runtime.getURL("side-panel.html")

document.body.appendChild(iframe);
