<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TV Surfer</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="TVcontainer">
        <video id="videoPlayer"></video>
        <div id="channelDisplay">Channel 1</div>
        <div class="TVimage">
            <img src="images/TV.png" alt="TV">
        </div>
    </div>
    <div>
        <button onclick="channelUp()">Channel Up</button>
        <button onclick="channelDown()">Channel Down</button>
    </div>
    <div id="timer">0</div>
    <script src="js/tv.js"></script>
</body>
</html>