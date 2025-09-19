// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import {
//   UIKitSettingsBuilder,
//   CometChatUIKit,
// } from "@cometchat/chat-uikit-react";
// import { setupLocalization } from "./CometChat/utils/utils";
// import { CometChatProvider } from "./CometChat/context/CometChatContext";

// export const COMETCHAT_CONSTANTS = {
//   APP_ID: "1669024bacf5ec14d", // Replace with your App ID
//   REGION: "IN", // Replace with your App Region
//   AUTH_KEY: "1bf73ce66e2454c6a0975bbe3d1e2f14bf15537b", // Replace with your Auth Key or leave blank if you are authenticating using Auth Token
// };

// const uiKitSettings = new UIKitSettingsBuilder()
//   .setAppId(COMETCHAT_CONSTANTS.APP_ID)
//   .setRegion(COMETCHAT_CONSTANTS.REGION)
//   .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
//   .subscribePresenceForAllUsers()
//   .build();

// CometChatUIKit.init(uiKitSettings)?.then(() => {
//   setupLocalization();

//   const UID = "cometchat-uid-1"; // Replace with your actual UID

//   CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
//     if (!user) {
//       CometChatUIKit.login(UID)
//         .then((loggedUser: CometChat.User) => {
//           console.log("Login Successful:", loggedUser);
//           // Mount your app
//           ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//             <CometChatProvider>
//               <App />
//             </CometChatProvider>
//           );
//         })
//         .catch((error) => {
//                       console.error("Login Failed:", error)

//         })

//     } else {
//       // User already logged in, mount app directly
//       console.log("User already logged in:", user);
//       ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//         <CometChatProvider>
//           <App />
//         </CometChatProvider>
//       );
//     }
//   });
// });
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react';
import { setupLocalization } from './CometChat/utils/utils';
import { CometChatProvider } from './CometChat/context/CometChatContext';
import { BrowserRouter, useNavigate } from 'react-router-dom';

export const COMETCHAT_CONSTANTS = {
  APP_ID: '1669024bacf5ec14d',
  REGION: 'IN',
  AUTH_KEY: '1bf73ce66e2454c6a0975bbe3d1e2f14bf15537b',
};

// Wrapper component để dùng navigate
const AppWrapper = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const uiKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      .build();

    CometChatUIKit.init(uiKitSettings)?.then(() => {
      setupLocalization();

      const UID = 'cometchat-uid-1';

      CometChatUIKit.getLoggedinUser().then((user) => {
        if (!user) {
          CometChatUIKit.login(UID)
            .then((loggedUser) => {
              console.log('Login Successful:', loggedUser);
              // Nếu login OK thì không làm gì (ở lại route hiện tại)
            })
            .catch((error) => {
              console.error('Login Failed:', error);
              // 👉 Navigate đến trang /login
              navigate('/login');
            });
        } else {
          console.log('User already logged in:', user);
          // Không cần điều hướng
           //  navigate('/login');
        }
      });
    });
  }, []);

  return (
    <CometChatProvider>
      <App />
    </CometChatProvider>
  );
};

// Mount React app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
