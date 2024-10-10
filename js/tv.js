const videoUrls = [
    '../video/test/video1.mp4',
    '../video/test/video2.mp4',
    '../video/test/video3.mp4',
    '../video/test/video4.mp4',
    '../video/test/video5.mp4',
    '../video/test/video6.mp4'
];

const elapsedTimes = {
    0: 0,
    1: 0,
    2: 0
};

const lastSwitchTimes = {
    0: Date.now(),
    1: Date.now(),
    2: Date.now()
};

let elapsedTime = 0;
const timerElement = document.getElementById('timer');

// Update the timer every second
setInterval(() => {
    elapsedTime++;
    timerElement.textContent = elapsedTime;
}, 1000);

let currentChannel = 0;
const videoPlayer = document.getElementById('videoPlayer');
const channelDisplay = document.getElementById('channelDisplay');

// Initialize the video player with the first channel
videoPlayer.src = videoUrls[currentChannel];
videoPlayer.currentTime = elapsedTime;
videoPlayer.play();

function changeChannel(channel) {
    // Save the current time of the current channel
    const now = Date.now();
    elapsedTimes[currentChannel] += (now - lastSwitchTimes[currentChannel]) / 1000;

    // Change to the new channel
    currentChannel = channel;
    lastSwitchTimes[currentChannel] = now;
    videoPlayer.src = videoUrls[currentChannel];
    videoPlayer.currentTime = elapsedTime;
    videoPlayer.play();

    // Display the current channel number
    channelDisplay.textContent = `${currentChannel + 1}`;
    channelDisplay.style.display = 'block';
    setTimeout(() => {
        channelDisplay.style.display = 'none';
    }, 4000);
}

function channelUp() {
    let nextChannel = (currentChannel + 1) % videoUrls.length;
    changeChannel(nextChannel);
}

function channelDown() {
    let prevChannel = (currentChannel - 1 + videoUrls.length) % videoUrls.length;
    changeChannel(prevChannel);
}