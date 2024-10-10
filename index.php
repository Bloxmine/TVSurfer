<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TV Surfer</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            font-family: 'VCR', sans-serif;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #000;
        }
        button {
            padding: 10px;
            margin: 10px;
        }
        #timer {
            font-size: 2em;
            margin: 20px;
            color: green;
        }
        .TVcontainer {
            position: relative;
            width: 840px;
            height: 640px;
        }
        .TVimage {
            position: absolute;
            top: 10px;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }
        .TVimage img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        #videoPlayer {
            width: 80%;
            height: 80%;
            z-index: 0;
            position: absolute;
            top: 45%;
            left: 51.5%;
            transform: translate(-50%, -50%);

        }
        #channelDisplay {
            font-size: 2em;
            position: absolute;
            top: 100px;
            left: 160px;
            background-color: black;
            color: green;
            padding: 5px;
            display: none;
            z-index: 2;
        }
        @font-face {
            font-family: 'VCR';
            src: url('fonts/VCR.ttf') format('truetype');
        }
    </style>
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