status="";
object=[];

function preload()
{
    video = createVideo("videoplayback.mp4");
}

function setup()
{
    canvas = createCanvas(600,600);
    canvas.center();
}

function draw()
{
    image(video,0,0,600,600);

    if(status!="")
    {
        objectDetector.detect(video, gotResult);

        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML = " Status: Objects Detected ";
            document.getElementById("number_of_objects").innerHTML = " Number of Objects Detected is " +object.length;

            fill("black");
            percent = Math.floor(object[i].confidence*100);
            text(object[i].label+ "" + percent + "%", object[i].x,object[i].y );
            noFill();
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    
}

function start()
{
    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = " Status: Detecting Objects ";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        object = result;
    }

}