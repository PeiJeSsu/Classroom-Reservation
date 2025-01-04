# 易室借 Classroom Reservation System  

**易室借**旨在簡化教室借用流程，幫助使用者快速查詢教室狀態並完成借用申請，同時提高管理教室的效率。  
- **使用者** 可輕鬆查詢教室空閒狀態並提交借用申請。  
- **管理員** 能快速掌握教室使用情況及鑰匙記錄，實現高效管理。  

---

## 🚨 注意事項  
此系統的後端部署於 **Render** 平台。  
- 在一段時間未使用後，Render 會自動暫停服務。  
- 再次發送請求時，可能需要等待 Render 重新啟動。

---

## 🌟 功能列表  
詳細的功能說明請參閱 SRD 的功能需求。

---

## 🛠 系統架構  
此系統採用前後端分離架構，包含以下部分：  
- **frontend**：React 前端，負責使用者操作介面  
- **backend**：Spring Boot 後端，負責業務邏輯與資料處理  
- **report**：包含最終報告與相關圖片  

### 部署架構與網址  
- **前端部署**：使用 Vercel  
- **後端部署**：使用 Render  
- **線上系統網址**：[點此進入](https://classroom-reservation-seven.vercel.app/login)  

---

## 💻 本地端啟動  
### 啟動前準備  
1. 確認 **3000** 和 **8080** Port 未被其他程式占用。  
2. 確保已安裝以下工具：  
   - Node.js  
   - Java（JDK 11 或以上）  

### 啟動步驟  
1. **前端啟動**  
   ```bash
   cd frontend
   npm install
   npm start
   ```
   - 預設連接到 Render 的 API。  
   - 若需改為本地端 API，修改 `/src/config/apiConfig.js` 的 `baseURL`：  
     ```javascript
     const baseURL = "http://localhost:8080";
     ```

2. **後端啟動**  
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

---

## 📖 系統操作  
詳細的系統操作請參閱 SDD 的使用者畫面設計。

---

## 🔧 使用技術  
- **前端**：React、Material UI  
- **後端**：Spring Boot  
- **資料庫**：MongoDB Atlas  
- **驗證**：Firebase Authentication  
- **部署**：Vercel（前端）、Render（後端）

---

## 📂 資料夾結構  
```
.
├── frontend     # React 前端程式碼
├── backend      # Spring Boot 後端程式碼
├── report       # 最終報告與圖片
```
---
