// array of video urls, needs to be in a database soon
const videoUrls = [
    '../video/test/video1.mp4',
    '../video/test/video2.mp4',
    '../video/test/video3.mp4',
    '../video/test/video4.mp4',
    '../video/test/video5.mp4',
    '../video/test/video6.mp4'
];

let elapsedTime = 0;
let currentChannel = 0;
const timerElement = document.getElementById('timer');
const videoPlayer = document.getElementById('videoPlayer');
const channelDisplay = document.getElementById('channelDisplay');

// update the timer every second
setInterval(() => {
    elapsedTime++;
    timerElement.textContent = elapsedTime;
}, 1000);

// initialise the video player with the first channel
videoPlayer.src = videoUrls[currentChannel];
videoPlayer.currentTime = elapsedTime;
videoPlayer.play();

function changeChannel(channel) {
    currentChannel = channel;
    videoPlayer.src = videoUrls[currentChannel];
    videoPlayer.currentTime = elapsedTime;
    videoPlayer.play();

    // display the current channel number like on a real old skool tv
    channelDisplay.textContent = `${currentChannel + 1}`;
    channelDisplay.style.display = 'block';
    setTimeout(() => {
        channelDisplay.style.display = 'none';
    }, 4000);
}
// go to the next channel, go to the previous channel
function channelUp() {
    changeChannel((currentChannel + 1) % videoUrls.length);
}

function channelDown() {
    changeChannel((currentChannel - 1 + videoUrls.length) % videoUrls.length);
}


// track timer
function trackTimer(){
    elapsedTime
}