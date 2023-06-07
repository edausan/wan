import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

export const Notification = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    _getToket();
  }, []);

  const _getToket = () => {
    const vapidKey =
      "BHUXW0BVb9aYEkyw3lG8KE_MlLE4pm_NoL6nqt4AQvNJ3qknWd3XYZ6uN17jMpZA3JsLqaXwxwPQQ85VmjNFenA";

    getToken(messaging, { vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          throw new Error("No registration token available. Request permission to generate one.");
          // ...
        }
      })
      .catch((err) => {
        throw new Error("An error occurred while retrieving token. ", err);
        // ...
      });
  };
};
