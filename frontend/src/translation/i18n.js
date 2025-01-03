import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ClassroomCodeSelector from "../floor_and_classroom_code_selection/ClassroomCodeSelector";

const resources = {
    en: {
        translation: {
            "查詢教室": "Classroom Query",
            "申請管理": "Application Management",
            "使用者狀態管理": "User Status Management",
            "教室地圖": "Classroom Map",
            "資訊查詢": "Information Query",
            "切換語言": "Switch Language",
            "登出": "logout",
            "帳號禁用中，無法使用申請功能。 解禁時間：{{unbanTime}}": "Your account is banned, so you cannot use the application function. Until {{unbanTime}}",
            "帳號未被禁用，可以使用申請功能": "Your account is not banned, so you can use the application function",
            "沒有找到相關的教室": "No relevant classrooms found",
            "教室編號": "Classroom_ID",
            "樓層": "Floor",
            "教室狀態": "Classroom_Status",
            "不可用": "Unavailable",
            "可用": "Available",
            "鑰匙狀態": "Key_Status",
            "借用人": "Borrower",
            "星期一": "Monday",
            "星期二": "Tuesday",
            "星期三": "Wednesday",
            "星期四": "Thursday",
            "星期五": "Friday",
            "查看": "View",
            "dateSelector": {
                "年": " / ",
                "月": "",
            },
            "searchField": {
                "年": "Year",
                "月": "Month",
                "日": "Day",
            },
            "classroomCodeSelector": {
                "教室編號": "Classroom ID"
            },
            "keyStatusSelector": {
                "鑰匙狀態": "Key Status"
            },
            "請輸入有效的日期格式": "Please enter a valid date format",
            "尚未審核": "unreviewed ",
            "無法加載資料，請稍後再試": "Unable to load data, please try again later",
            "目前沒有符合篩選條件的申請": "Currently, there are no applications that match the filter criteria",
            "未知使用者": "Unknown User",
            "借用時間": "Duration",
            "檢視歷史紀錄": "View history",
            "同意": "Approve",
            "不同意": "Deny",
            "歷史紀錄": "History Records",
            "尚無歷史紀錄": "No history records",
            "借用者": "Borrower",
            "借用日期": "Rental_Date",
            "匯出": "Export",
            "週次": "Week",
            "時間範圍": "Time Slot",
            "選擇要匯出的週": "Select the week to export",
            "選擇星期一": "Select Monday",
            "選擇的日期範圍": "Selected date range",
            "全部": "All",
            "此狀態下禁止輸入使用者": "User input is disabled when key status is available",
            "鑰匙狀態更新成功": "Key status updated successfully",
            "更新鑰匙狀態失敗": "Failed to update key status",
            "禁用鑰匙借用者": "ban borrower",
            "借用人不是系統使用者，請自行處理": "Borrower is not a system user, please handle it yourself",
            "更改": "Change",
            "更改鑰匙狀態": "Change key status",
            "登入": "Login",
            "請檢查您的電子郵件並完成驗證。": "Please check your email and complete verification.",
            "登入成功！": "Login successful!",
            "取得角色失敗": "Failed to get role",
            "登入失敗": "Login failed",
            "Google 登入成功！": "Google login successful!",
            "無法取得用戶資訊": "Unable to retrieve user information",
            "Google 登入失敗": "Google login failed",
            "只有符合特定 email 格式的借用人可以註冊。": "Only borrowers with a specific email format can register.",
            "角色設定成功，註冊完成！": "Role set successfully, registration complete!",
            "註冊失敗": "Registration failed",
            "註冊請求失敗": "Registration request failed",
            "第一次登入，請選擇您的角色": "First time login, please select your role",
            "管理員": "Admin",
            "確認角色": "Confirm Role",
            "Email": "Email",
            "密碼": "Password",
            "使用 Google 登入": "Google login",
            "還沒有帳號？點此註冊": "Don't have an account? Register here",
            "註冊": "Register",
            "選擇角色": "Select Role",
            "學號 (8 位數字)": "Student ID (8 digits)",
            "註冊成功！請檢查電子郵件以完成驗證。": "Registration successful! Please check your email to complete the verification.",
            "註冊失敗：": "Registration failed:",
            "已有帳號？點此登入": "Already have an account? Click to log in.",
            "學號必須為 8 位數字！": "Student ID must be 8 digits!",
            "輸入的學號將組合為 @mail.ntou.edu.tw 電子郵件地址": "The entered ID will be combined to form the email address @mail.ntou.edu.tw",
            "選擇開始時間": "Select Start Time",
            "選擇結束時間": "Select End Time",
            "開始時間和結束時間不能為空！": "Start Time and End Time must not be null!",
            "未找到借用者！": "Borrower not found!",
            "申請成功: ": "Application Successful: ",
            "申請失敗: ": "Application Failed: ",
            "您已經被禁用申請權限，系統將自動刷新頁面，禁用訊息顯示於右上角": "You have been banned from applying for classrooms. the system will automatically refresh the page, and the ban message will be displayed at the top right.",
            "提交": "Submit",
            "申請": "Apply",
            "到": "to",
            "審查結果": "Result",
            "無法加載資料，請稍後再試。": "Unable to load data. Please try again later.",
            "未知教室": "Unknown Classroom",
            "未知日期": "Unknown Date",
            "未知結束時間": "Unknown End Time",
            "沒有符合的使用者": "No matching users",
            "教室已成功禁用": "Classroom has been successfully banned",
            "禁用失敗": "Ban failed",
            "請至少輸入一個非零的時間": "Please enter at least one non-zero time",
            "關閉": "Close",
            "禁用教室": "Ban classroom",
            "教室解禁成功": "Classroom Unbanned Successfully",
            "未找到教室": "Classroom Not Found",
            "解禁失敗：": "Unban Failed:",
            "解禁教室": "Unban Classroom",
            "使用者": "User",
            "使用者狀態更新成功": "User status updated successfully",
            "禁用": "Ban",
            "禁用使用者": "Ban User",
            "月": "Month",
            "日": "Day",
            "時": "Hour",
            "使用者解禁成功": "User unbanned successfully",
            "未找到使用者": "User not found",
            "解禁失敗": "Unban failed",
            "解禁使用者": "Unban User",
            "沒有找到相關的使用者。": "No related users found.",
            "身分": "Role",
            "管理者": "Admin",
            "狀態": "Status",
            "禁用中": "Banned",
            "解禁時間": "Unban Time",
            "請選擇使用者（輸入關鍵字查詢）": "Select a user (Search by keyword)",
            "選擇系統語言（進入系統後仍可更改）": "Select System Language (You Can change it after logging in)",
            "選擇系統語言": "Select System Language",
            "請選擇樓層以查看地圖": "Please select a floor to view the map",
            "1樓": "1st Floor",
            "2樓": "2nd Floor",
            "3樓": "3rd Floor",
            "4樓": "4th Floor",
            "樓層選擇": "Floor Selection",
            "沒有找到相關的教室，請檢查後端是否已經啟動，並且資料庫中確實存在資料": "No relevant classroom found. Please check if the backend is running and the database contains the data.",
            "沒有找到相關的使用者，請檢查後端是否已經啟動，並且資料庫中確實存在資料": "No relevant user found. Please check if the backend is running and the database contains the data.",
            "沒有找到相關的申請，請檢查後端是否已經啟動，並且資料庫中確實存在資料": "No relevant application found. Please check if the backend is running and the database contains the data.",
            "沒有找到相關的使用者資訊，請檢查後端是否已經啟動，並且資料庫中確實存在資料": "No relevant user information found. Please check if the backend is running and the database contains the data.",
            "請填寫借用人": "Please fill in the borrower",
            "系統最高接受60年的禁用時間，您輸入的時間大於等於60年，將自動設為60年（請注意！這裡的每年皆以365天計算，故有些許誤差）": "The maximum acceptable ban duration is 60 years. The time you entered is greater than or equal to 60 years, so it will be automatically set to 60 years. (Please note that each year is calculated as 365 days, so there may be a slight discrepancy.)",
            "使用者已被禁用直到 ": "The user has been banned until ",
            " 無法禁用更短的時間，若要執行此操作，請先幫使用者解除禁用": ". The ban cannot be for a shorter period. To perform this operation, please unban the user first.",
            "教室已被禁用直到 ": "The classroom has been banned until ",
            " 無法禁用更短的時間，若要執行此操作，請先幫教室解除禁用": ". The ban cannot be for a shorter period. To perform this operation, please unban the classroom first."
        }
    },

    zh_tw: {
        translation: {
            "dateSelector": {
                "年": " 年 ",
                "月": " 月"
            },
            "searchField": {
                "年": "年",
                "月": "月",
                "日": "日",
            },
            "classroomCodeSelector": {
                "教室編號": "教室編號"
            },
            "keyStatusSelector": {
                "鑰匙狀態": "鑰匙狀態"
            },

        }
    }
};

const savedLanguage = localStorage.getItem("language") || "zh_tw";

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: "zh_tw",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
