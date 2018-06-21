var config = {
    apiKey: "AIzaSyCt3YMHWqBv1oFyqu3FmwxbmPfzDzAiJO8",
    authDomain: "train-times-c4c4f.firebaseapp.com",
    databaseURL: "https://train-times-c4c4f.firebaseio.com",
    projectId: "train-times-c4c4f",
    storageBucket: "train-times-c4c4f.appspot.com",
    messagingSenderId: "994111517805"
  };
  firebase.initializeApp(config);

  database = firebase.database();

  var name = "";
  var destination = "";
  var givenTrainTime = "";
  var firstTrainTime = "";
  var frequency = "";



  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      name = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#first-time-input").val().trim();

      
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
      });
    });
    
    database.ref().on("child_added", function(childSnapshot){

      var currentTrainTime = childSnapshot.val().firstTrainTime;
      var timeFormat = "HH:mm";
      var convertedTime = moment(currentTrainTime, timeFormat);
      var displayedTime = moment(convertedTime).format("hh:mm A");

      var frequencyRate = childSnapshot.val().frequency;

      var firstTimeConverted = moment(currentTrainTime, "HH:mm").subtract(1, "years");
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % frequencyRate;
      var tMinutesTillTrain = frequencyRate - tRemainder;


        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);

        // minutes away from firstTrainTime

        // firstTrainTime - current time = ??

        

        $("#train-table").append("<tr> <td> " + childSnapshot.val().name +
        " </td> <td> " + childSnapshot.val().destination +
        " </td> <td> " + childSnapshot.val().frequency +
        " </td> <td> " + displayedTime + " </td> <td> " + tMinutesTillTrain + " </td> </tr> "
    );
  
  });
