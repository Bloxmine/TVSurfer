<?php
// FFMPEG CODE TO GET VIDEO LENGTH
// Array of directories containing the video files
$directories = ['video/test', 'video/channel2', 'video/channel3'];

$directoryDurations = [];

foreach ($directories as $directory) {
    $totalDuration = 0;

    // Get all MP4 files in the directory
    $videoFiles = glob($directory . '/*.mp4');
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

    $directoryDurations[$directory] = "{$hours}h {$minutes}m {$seconds}s";
}

// Save the output to a file
$outputString = "";
foreach ($directoryDurations as $directory => $duration) {
    $outputString .= "$directory $duration\n";
}

file_put_contents('output.txt', $outputString);

echo nl2br($outputString);
?>