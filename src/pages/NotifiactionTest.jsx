import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

const NotificationTest = () => {
    const notify = () => {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                console.log("granted");
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification("Vibration Sample", {
                        body: "Buzz! Buzz!",
                        icon: "../images/touch/chrome-touch-icon-192x192.png",
                        vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: "vibration-sample",
                    });
                });
            }
        });
    };

    return (
        <div>
            <button id="notifications" onClick={ notify }>알림</button>
        </div>
    );
}

export default NotificationTest;
