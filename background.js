let color = '#3aa757';

// 安裝 extension 後執行
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// 在 extension 被 click 時發送 toggle message
chrome.action.onClicked.addListener((tab) => {
    console.log('extension is clicked.');
    // 把訊息傳送給 content scripts 的專用 API (要附上 tab id)
    // 不同頁籤之間並不共享內容腳本，content script 在每個頁籤都會單獨注入
    chrome.tabs.sendMessage(tab.id, "toggle");
});

// // listen msg: getData
// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//     if (msg === "getData"){
//         console.log("trigger API call.");
//     }
// });


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {  
    if (msg == 'api_get_data') {

        let data = new FormData();
        data.append('username', ''); // API Key
        data.append('password', ''); // API Secret
        let api_token = ''; // JWT host

        fetch( 
            api_token, {
                method: 'POST',
                headers: {
                    'Accept': '*/*'
                },
                cache: "no-store",
                body: data
            } 
        )
        .then(function(resp){
            return resp.json();
        })
        .then(function(json) {
            sendResponse({
                msg: "Done.",
                json: json
            });
        })
        .catch(function(err){
            sendResponse({
                code: 500, 
                msg: "Done Err.",
                data: err
            });
        });


        // fetch('https://reqbin.com/echo/get/json', {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       Authentication: 'Bearer Token',
        //       'X-Custom-Header': 'header value'
        //     }
        // })
        // .then((resp) => {
        //     resp.json();
        // })
        // .then((json) => {
        //     console.log(json);
        // });

    }else{
        sendResponse({
            msg: msg
        });
    }
    return true;
});