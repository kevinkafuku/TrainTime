var config = {
    apiKey: "AIzaSyCt3YMHWqBv1oFyqu3FmwxbmPfzDzAiJO8",
    authDomain: "train-times-c4c4f.firebaseapp.com",
    databaseURL: "https://train-times-c4c4f.firebaseio.com",
    projectId: "train-times-c4c4f",
    storageBucket: "",
    messagingSenderId: "994111517805"
  };
  firebase.initializeApp(config);

  database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";


  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      name = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#first-train-time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
      });
    });
    
    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);

        $("#train-table").append("<tr> <td> " + childSnapshot.val().name +
        " </td> <td> " + childSnapshot.val().destination +
        " </td> <td> " + childSnapshot.val().frequency +
        " </td> <td> " + "THIS" + " </td> </tr>");
    })
  
