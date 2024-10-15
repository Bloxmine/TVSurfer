const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const videoFolders = ['../video/test']; // Add more folders as needed

let timeline = [];

videoFolders.forEach(folder => {
    fs.readdir(folder, (err, files) => {
        if (err) throw err;

        files.filter(file => file.endsWith('.mp4')).forEach(file => {
            const filePath = path.join(folder, file);
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) throw err;

                const duration = metadata.format.duration;
                timeline.push({ file: filePath, duration });

                // Sort timeline by file order
                timeline.sort((a, b) => a.file.localeCompare(b.file));

                // Update HTML
                updateHTML(timeline);
            });
        });
    });
});

function updateHTML(timeline) {
    const videoUrls = timeline.map(item => item.file);
    const totalDuration = timeline.reduce((acc, item) => acc + item.duration, 0);

    const htmlContent = `
        <script>
            const videoUrls = ${JSON.stringify(videoUrls)};
            let elapsedTime = 0;
            let currentChannel = 0;
            const timerElement = document.getElementById('timer');
            const videoPlayer = document.getElementById('videoPlayer');
            const channelDisplay = document.getElementById('channelDisplay');

            setInterval(() => {
                elapsedTime++;
                timerElement.textContent = elapsedTime;
            }, 1000);

            videoPlayer.src = videoUrls[currentChannel];
            videoPlayer.currentTime = elapsedTime;
            videoPlayer.play();

            function changeChannel(channel) {
                currentChannel = channel;
                videoPlayer.src = videoUrls[currentChannel];
                videoPlayer.currentTime = elapsedTime;
                videoPlayer.play();

                channelDisplay.textContent = \`\${currentChannel + 1}\`;
                channelDisplay.style.display = 'block';
                setTimeout(() => {
                    channelDisplay.style.display = 'none';
                }, 4000);
            }

            function channelUp() {
                changeChannel((currentChannel + 1) % videoUrls.length);
            }

            function channelDown() {
                changeChannel((currentChannel - 1 + videoUrls.length) % videoUrls.length);
            }
        </script>
    `;

    fs.writeFileSync('index.html', htmlContent);
}