document.addEventListener('DOMContentLoaded', function(dcle) {  
    var dButtonEvent = document.getElementById("button1");  
    var dButtonContent = document.getElementById("button2");  

    //點擊按鈕，向事件腳本發送訊息  
    dButtonEvent.addEventListener('click', function(ce) {  
        console.log('API btn');
        dButtonEvent.disabled = true;
        chrome.runtime.sendMessage('api_get_data', function(response) {  
            dButtonEvent.disabled = false;
            console.log(response);
            if (response.json.user_display_name) {
                document.getElementById('result').innerHTML = `
                    <div class="alert alert-success"> 
                        ${response.json.user_display_name}
                    </div>
                `;
            }
        });  
    });  

    //點擊按鈕，向內容腳本發送訊息  
    dButtonContent.addEventListener('click', function(ce) {  
        console.log('x toggle');
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {  
            chrome.tabs.sendMessage(tabs[0].id, "toggle");
        });  
    });  
});
