const VisionCamera = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices()를 지원하지 않습니다.");
        return;
    }

// 카메라와 마이크 리스트
    navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                let log = device.kind + ": " + device.label + " id = " + device.deviceId + "\n";
                document.getElementById('result').append(log);
                console.log(
                    log
                );
            });
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
    return (
        <div id="result">
        </div>
    );
}

export default VisionCamera;
