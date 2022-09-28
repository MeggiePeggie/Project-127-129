riptide = "";
shut_up_and_dance = "";

riptide_status = "";
shut_up_and_dance_status = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist= 0;
scoreRightWrist = 0;
song = "";

function preload()
{
    riptide = loadSound("Vance Joy - Riptide.mp3");
    shut_up_and_dance = loadSound("Walk The Moon - Shut Up and Dance.mp3");
}

/* function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
} */

function setup() 
{ 
    canvas = createCanvas(600, 500); 
    canvas.center();

    video = createCapture(VIDEO); 
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PosNet is initialised!')
}

/* function draw()
{
    image(video, 0, 0, 600, 500);
} */

function draw() 
{ 
    image(video, 0, 0, 600, 500);

    riptide_status = riptide.isPlaying();
    shut_up_and_dance_status = shut_up_and_dance.isPlaying();

    stroke("red");
    fill("red");  

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWirstY, 20);
        shut_up_and_dance.stop();

        if(riptide_status == false)
        {
            riptide.play();
            document.getElementById("song").innerHTML = "Playing Riptide by Vance Joy";
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        riptide.stop();

        if(shut_up_and_dance_status == false)
        {
            shut_up_and_dance.play();
            document.getElementById("song").innerHTML = "Playing Shut Up and Dance by Walk The Moon";
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("leftWristScore = " + leftWristScore + "rightWristScore = " + rightWristScore);

        leftwristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}