//https://teachablemachine.withgoogle.com/models/aosQbpNzn/

Webcam.set({
   width:350,
   height:300,
   image_format:"png",
   png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aosQbpNzn/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The prediction is "+prediction1;
    var utter_this=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utter_this);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if(results[0].label=="Amazing"){
            document.getElementById("update_meaning").innerHTML="&#128076;";
        }
        if(results[0].label=="Good"){
           document.getElementById("update_meaning").innerHTML="&#128077;";
       }
       if(results[0].label=="Cornasign"){
           document.getElementById("update_meaning").innerHTML="&#129304;";
       }
       if(results[0].label=="Victory"){
           document.getElementById("update_meaning").innerHTML="&#9996;";
       }
    }
}