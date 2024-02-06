const NotificationTest = () => {
    const notify = () => {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                navigator.serviceWorker.register()
            }
        });
    };

    return (
        <div>
            <input type="file"/>
            <button id="notifications" onClick={ notify }>알림</button>
        </div>
    );
}

export default NotificationTest;
