song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("music.mp3 ");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");
    if(scoreleftwrist>0.2){
        circle(leftWristX, leftWristY, 20);
        numberleftWrist=Number(leftWristY);
        remove_decimal=floor(numberleftWrist);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
    }
}

function gotPoses(results){
    if(results.length > 0);{
        console.log(results);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+leftWristY);

        rightWristX = result[0].pose.rightWrist.x;
        rightWristy = result[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY ="+rightWristY);
        scoreleftwrist=results[0].pose.keypoints[9].score;
    }
}

function modelLoaded(){
    console.log('Posenet is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}