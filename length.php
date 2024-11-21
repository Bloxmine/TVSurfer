<?php
// FFMPEG CODE TO GET VIDEO LENGTH
// Directory containing the video files
$directory = 'video/test';

// Get all MP4 files in the directory
$videoFiles = glob($directory . '/*.mp4');

$totalDuration = 0;

foreach ($videoFiles as $file) {
    // Use ffmpeg to get the duration of the video file
    $command = "ffmpeg -i " . escapeshellarg($file) . " 2>&1";
    $output = shell_exec($command);

    // Extract the duration from the ffmpeg output
    if (preg_match('/Duration: (\d+):(\d+):(\d+\.\d+)/', $output, $matches)) {
        $hours = $matches[1];
        $minutes = $matches[2];
        $seconds = $matches[3];

        // Convert the duration to seconds and add to the total duration
        $totalDuration += ($hours * 3600) + ($minutes * 60) + $seconds;
    }
}

// Convert the total duration back to hours, minutes, and seconds
$hours = floor($totalDuration / 3600);
$minutes = floor(($totalDuration % 3600) / 60);
$seconds = $totalDuration % 60;

echo "Total video length: {$hours} hours, {$minutes} minutes, and {$seconds} seconds";
?>