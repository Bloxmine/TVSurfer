<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter</title>
</head>
<body>
<?php
$directory = '../video/test/';
ob_start();
if (is_dir($directory)) {
    $videos = scandir($directory);
    if ($videos !== false) {
        $videos = array_diff($videos, array('..', '.'));
        header('Content-Type: application/json');
        echo json_encode($videos);
    } else {
        echo json_encode(['error' => 'Failed to read directory.']);
    }
} else {
    echo json_encode(['error' => 'Directory does not exist.', 'path' => realpath($directory)]);
}
ob_end_clean();
?>
<div id="totalDuration"></div>
<script>
    const videoDirectory = '../video/test/';
    let totalDuration = 0;

    fetch('videolenght.php')
        .then(response => response.json())
        .then(videoFiles => {
            if (videoFiles.error) {
                console.error(videoFiles.error);
                return;
            }
            let promises = videoFiles.map(file => {
                return new Promise((resolve, reject) => {
                    let video = document.createElement('video');
                    video.src = videoDirectory + file;
                    video.addEventListener('loadedmetadata', () => {
                        resolve(video.duration);
                    });
                    video.addEventListener('error', reject);
                });
            });

            return Promise.all(promises);
        })
        .then(durations => {
            totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
            displayTotalDuration(totalDuration);
        })
        .catch(error => console.error('Error loading video metadata:', error));

    function displayTotalDuration(totalDuration) {
        const totalDurationElement = document.getElementById('totalDuration');
        totalDurationElement.textContent = `Total Duration: ${totalDuration} seconds`;
    }
</script>
</body>
</html>