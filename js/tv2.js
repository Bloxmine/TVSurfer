const fs = require('fs');
const path = require('path');

// Function to get video URLs from a folder
function getVideoUrls(folder) {
    const folderPath = path.join(__dirname, folder);
    const files = fs.readdirSync(folderPath);
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    return videoFiles.map(file => path.join(folder, file));
}

// Read and parse the output.txt file
const outputFilePath = path.join(__dirname, 'output.txt');
const outputFileContent = fs.readFileSync(outputFilePath, 'utf-8');
const channels = outputFileContent.split('\n').map(line => {
    const [folder, time] = line.split(' ');
    const [hours, minutes, seconds] = time.split(/[hms]/).map(Number);
    const totalTime = (hours * 3600) + (minutes * 60) + seconds;
    return { folder, totalTime };
});

// Initialize variables
let elapsedTime = 0;
let currentChannel = 0;
let currentVideoIndex = 0;
const timerElement = document.getElementById('timer');
const videoPlayer = document.getElementById('videoPlayer');
const channelDisplay = document.getElementById('channelDisplay');

// Update the timer every second
setInterval(() => {
    elapsedTime++;
    timerElement.textContent = elapsedTime;

    // Check if we need to switch to the next video
    const currentChannelData = channels[currentChannel];
    const videoUrls = getVideoUrls(currentChannelData.folder);
    const currentVideoDuration = videoPlayer.duration;

    if (elapsedTime >= currentVideoDuration) {
        currentVideoIndex++;
        if (currentVideoIndex >= videoUrls.length) {
            currentVideoIndex = 0;
            currentChannel++;
            if (currentChannel >= channels.length) {
                currentChannel = 0;
            }
        }
        videoPlayer.src = videoUrls[currentVideoIndex];
        videoPlayer.currentTime = 0;
        videoPlayer.play();
    }
}, 1000);

// Initialize the video player with the first channel
const initialChannelData = channels[currentChannel];
const initialVideoUrls = getVideoUrls(initialChannelData.folder);
videoPlayer.src = initialVideoUrls[currentVideoIndex];
videoPlayer.currentTime = elapsedTime;
videoPlayer.play();