注意事項
  此系統因為後端部署在 Render 上，所以在一段時間不用系統之後，Render 會自動暫停服務，再次請求需要等待 Render 重新啟動。

專案介紹
  易室借的目的是讓大家借用教室變得更簡單。無論是查詢教室是否有空，還是想借用教室，易室借都能幫助你輕鬆搞定。
  對於需要管理教室的人來說，易室借也讓他們更方便地知道哪些教室被借走，哪些空著，紀錄鑰匙給了誰，使管理變得更有效率。
  解決過去教室租借流程繁瑣或傳遞資訊太慢等問題，以快速又方便幫助大家使用教室。

系統操作
  請詳閱 SDD 中的使用者畫面設計。

功能列表
  請詳閱 SRD 中的功能需求。

系統架構
  此系統分為前端與後端，分別為 frontend 和 backend 資料夾。
  report 資料夾包含最後的報告版本的報告與圖片。

部署架構與網址
  使用 Vercel 與 Render 部署
  "https://classroom-reservation-seven.vercel.app/login"

本地端啟動
  本系統會占用 3000 與 8080 port，啟動前請確認是否有其他程式占用
  進入 frontend 資料夾，輸入 "npm start"，啟動前端
    目前預設是接 Render 的 API
	  如果需要更改為本地端的 API，可以更改 "/src/config/apiConfig.js" 的 baseURL 為 "http://localhost:8080"
  進入 backend 資料夾，輸入 "mvn spring-boot:run"
