
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/1kWhrYMVr/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";


  //Variables del documento

  let body = document.querySelector('body');
  let audio = document.querySelector('#audio');
  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    let margin = 3;
    fill(0);
    rect(width, height - 0, 0, 0);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error

    if(label == "Apagado"){

      body.className = "off";
      
      
      
    }
    else if(label == "Encencido"){ //En el modelo lo guarde como encencido jajaj
      body.className = "on";
      
    }
    else{
      
    }

    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }

  //Lograr que esta funcion solo se ejecute una vez cuando se cambia de color!
  //Idea, verificar la clase que tiene!
  function sonido(){
    if(label == "Apagado"){

      body.className = "off";
      
      audio.play();
      
    }
    else if(label == "Encencido"){ //En el modelo lo guarde como encencido jajaj
      body.className = "on";
      audio.play();
    }
    else{
      
    }
  }