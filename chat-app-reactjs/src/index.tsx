// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'
// import {
//   UIKitSettingsBuilder,
//   CometChatUIKit,
// } from '@cometchat/chat-uikit-react';
// import { setupLocalization } from './CometChat/utils/utils';
// import { CometChatProvider } from './CometChat/context/CometChatContext';
// import { BrowserRouter, useNavigate } from 'react-router-dom';

// export const COMETCHAT_CONSTANTS = {
//   APP_ID: '1669024bacf5ec14d',
//   REGION: 'IN',
//   AUTH_KEY: '1bf73ce66e2454c6a0975bbe3d1e2f14bf15537b',
// };

// // Wrapper component để dùng navigate
// const AppWrapper = () => {
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const uiKitSettings = new UIKitSettingsBuilder()
//       .setAppId(COMETCHAT_CONSTANTS.APP_ID)
//       .setRegion(COMETCHAT_CONSTANTS.REGION)
//       .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
//       .subscribePresenceForAllUsers()
//       .build();

//     CometChatUIKit.init(uiKitSettings)?.then(() => {
//       setupLocalization();

//       const UID = 'cometchat-uid-1';

//       CometChatUIKit.getLoggedinUser().then((user) => {
//         if (!user) {
//           CometChatUIKit.login(UID)
//             .then((loggedUser) => {
//               console.log('Login Successful:', loggedUser);
//               // Nếu login OK thì không làm gì (ở lại route hiện tại)
//             })
//             .catch((error) => {
//               console.error('Login Failed:', error);
//               // 👉 Navigate đến trang /login
//               navigate('/login');
//             });
//         } else {
//           console.log('User already logged in:', user);
//           // Không cần điều hướng
//            //  navigate('/login');
//         }
//       });
//     });
//   }, []);

//   return (
//     <CometChatProvider>
//       <App />
//     </CometChatProvider>
//   );
// };

// // Mount React app
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppWrapper />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import ReactDOM from 'react-dom/client';
import App from './App';
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react';
import { setupLocalization } from './CometChat/utils/utils';
const COMETCHAT_CONSTANTS = {
  APP_ID: '1669024bacf5ec14d',
  REGION: 'IN',
  AUTH_KEY: '1bf73ce66e2454c6a0975bbe3d1e2f14bf15537b',
};
if (
  COMETCHAT_CONSTANTS.APP_ID &&
  COMETCHAT_CONSTANTS.AUTH_KEY &&
  COMETCHAT_CONSTANTS.REGION
) {
  const uiKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build();

  // Initialize localization for the sample app and UI Kit.
  // Pass a specific language code (e.g., 'en' for English, 'fr' for French)
  // or leave it undefined to use the browser's default language.
  setupLocalization();

  /*
   * Note:
   * If you need to update the localization strings for a specific language in the UI Kit,
   * use the `CometChatLocalize.init` method. This allows you to override or add custom
   * translations for a language. Here's an example:
   *
   * CometChatLocalize.init('fr', {
   *     'fr': {
   *         "CONTINUE": "Continuer",
   *         "NAME": "Nom",
   *     }
   * });
   *
   * In this example, the French localization is updated with custom strings for "CONTINUE" and "NAME".
   */

  CometChatUIKit.init(uiKitSettings)?.then((response) => {
    console.log('CometChat UI Kit initialized successfully in index.tsx.');
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(<App />);
  });
} else {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(<App />);
}
