function showNotification() {
    const notificationOptions = {
        type: 'basic',
        iconUrl: './images/icon.png', // Replace with the path to your extension's icon
        title: 'Timer Ended',
        message: 'Your timer has ended!',
    };

    console.log("chrome.notifications", chrome.notifications)

    // chrome.notifications.create('timer-ended', notificationOptions, function (notificationId) {
    //     // Play a sound here (e.g., using an HTML5 audio element)
    //     const audio = new Audio('./images/sound.mp3'); // Replace with the path to your notification sound file
    //     audio.play();
    //     console.log("chrome.notifications  inside", chrome.notifications)

    // });

    chrome.alarms.create('timer-ended', {
        delayInMinutes: 1,
        periodInMinutes: 1
    });

    console.log("alamra", chrome.getA)

}
