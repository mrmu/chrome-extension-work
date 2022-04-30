# Google Chrome Extension  練習

## 範例特色
* 引入 Bootstrap 
* Sidebar
* 第三方 API 呼叫及取得結果

## Google Chrome Extension 開發說明

一個 Chrome extension 是以 manifest.json 檔案作為起點的，一個簡單的 manifest: 

```jsx
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3
}
```

在 Google Chrome 的「管理擴充功能」裡啟用「開發人員模式」，並點選「載入未封裝項目」，去選擇一個包含 manifest.json 的目錄，即可啟用此 extension。

啟用上述 extension 後，它還不會做任何事，一個 extension 元件通常可以包含幾個 scripts: 

- Background scripts
- Content scripts
- Options scripts
- UI elements

在此我們先引入 Backgroud scripts 進行說明: 

```jsx
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  **"background": {
    "service_worker": "background.js"
  }**
}
```

Backgroud script 和其他核心的 script 一樣，必須註冊在 manifest 裡。如上述設定，extension 會被告知它會有一個 service worker，並且指定執行內容會在 background.js 檔案裡。

當你 reload extension 時它會針對額外的操作去掃瞄特定檔案，看是否有重要的 event 是它需要去 listen 的。

我們希望在 extension 一被安裝時，就初始化一個固定的變數，並指派初始值，再將它儲存在 local storage: 

```jsx
// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
```

大部份的 API 都需要額外取得權限，像 storage API 也需要: 

```jsx
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  **"permissions": ["storage"]**
}
```

要點擊「管理擴充功能」裡該 extension 下方的「查看檢視模式: service workers」才會有上述 console.log。