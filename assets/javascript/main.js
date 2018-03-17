$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBKKI1ret6b6SjDya6hubo4AqPGwk0ajq8",
        authDomain: "rps-multiplayer-splaver.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-splaver.firebaseio.com",
        projectId: "rps-multiplayer-splaver",
        storageBucket: "rps-multiplayer-splaver.appspot.com",
        messagingSenderId: "115898659707"
        };
    firebase.initializeApp(config);

    var database = firebase.database();

    var userConnections = database.ref("/connections");

    var connectedUsers = database.ref(".info/connected");

    var connectionID = database.ref("connected");
    console.log("connectionsID: " + connectionID.toString());
    
    connectedUsers.on("value", function(snap) {
        if (snap.val()) {
            var con = userConnections.push(true);
            console.log(userConnections.toString());
            connectionID = con.key; // toString();
            console.log("New connectionID: " + connectionID);
            con.onDisconnect().remove();
        }
    });

    // var connectionID;
    userConnections.on("value", function(snap) {
        $("#lobby").text(snap.numChildren() + " people in the lobby.");
        console.log($("#lobby").text());
    })
    // Initialize the player's scores variables
    var playerOneWins = 0, playerOneLosses = 0, playerOneTies = 0, playerTwoWins = 0, playerTwoLosses = 0, playerTwoTies = 0; //, wins, losses, ties;


    database.ref().on("value", function(snapshot) {
        if ((snapshot.child("playerOneID") !== null) && (snapshot.child("playerOneName") !== null) && (snapshot.child("playerOneWins") !== null) && (snapshot.child("playerOneLosses") !== null) && (snapshot.child("playerOneTies") !== null) && (snapshot.child("playerTwoID") !== null) && (snapshot.child("playerTwoName") !== null) && (snapshot.child("playerTwoWins") !== null) && (snapshot.child("playerTwoLosses") !== null) && (snapshot.child("playerTwoTies") !== null)) {
            alert("There are currently two players already playing \nPlease wait until there is a free spot");

            playerOneID = snapshot.val().playerOneID, playerOneName = snapshot.val().playerOneName, playerOneWins = snapshot.val().playerOneWins, playerOneLosses = snapshot.val().playerOneTies;

            playerTwoID = snapshot.val().playerTwoID, playerTwoName = snapshot.val().playerTwoName, playerTwoWins = snapshot.val().playerTwoWins, playerTwoLosses = snapshot.val().playerTwoLosses, playerTwoTies = snapshot.val().playerTwoTies;

            if ((snapshot.child("playerOneID") === null) && (snapshot.child("playerOneName") === null) && (snapshot.child("playerOneScore") === null) && (snapshot.child("playerTwoID") !== null) && (snapshot.child("playerTwoID") !== null) && (snapshot.child("playerTwoID") !== null)) {
                alert("Seat one is now available if you wish to play");
            }
        }
    })
    function currentScores(playerNum, wins, losses, ties) {
        var score = $(("#player") + playerNum + "Score");
        score = $(score).text("Current Score: \nWins: " + wins + "    Losses: " + losses + "    Ties: " + ties);
        console.log(score.text());
    }

    $("#btnSubmit").on("click", function(event) {
        event.preventDefault();
        $("#player1Title").text("Player 1: " + $("#inputUser").val());
        // to test the scores player1
        for (var x = 0; x < 5; x ++) {
            var randWins = 0, randLosses = 0, randTies = 0;
            randWins = Math.floor(Math.random() * 100);
            randLosses = Math.floor(Math.random() * 100);
            randTies = Math.floor(Math.random() * 100);
        
            currentScores(1, randWins, randLosses, randTies);
        
            // alert("Player1 scores have changed iteration{" + x + "]");
        }
    });
})
