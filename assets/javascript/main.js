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
    var rootRef = database.ref("players");
    console.log("connectionsID: " + connectionID.toString());
    
    connectedUsers.on("value", function(snap) {
        if (snap.val()) {
            var con = userConnections.push(true);
            console.log(userConnections.toString());
            connectionID = con.key; // toString();
            console.log("New connectionID: " + connectionID);
            con.onDisconnect().remove();
            if (playerOneID === connectionID) {
                rootRef.set({
                    "playerOneID": null,
                    'playerOneName': null,
                    'playerOneWins': null,
                    "playerOneLosses": null
                });

                console.log("playerOneID: " + playerOneID);
                console.log("playerOneName: " + playerOneName);
                console.log("playerOneWins: " + playerOneWins);
                console.log("playerOneLosses: " + playerOneLosses);
                console.log("playerOneTies: " + playerOneTies);
            }

            // con.onDisconnect().remove();
            else if (playerTwoID === connectionID) {
                rootRef.set({
                    "playerTwoID": null,
                    "playerTwoName": null,
                    "playerTwoWins": null,
                    "playerTwoLosses": null,
                    "playerTwoTies": null
                });

                console.log("playerTwoID: " + playerTwoID);
                console.log("playerTwoName: " + playerTwoName);
                console.log("playerTwoWins: " + playerTwoWins);
                console.log("playerTwoLosses: " + playerTwoLosses);
                console.log("playerTwoTies: " + playerTwoTies);
            }
        }
    });

    // var connectionID;
    var currentLobbySize;
    userConnections.on("value", function(snap) {
        currentLobbySize = snap.numChildren();
        $("#lobby").text(snap.numChildren() + " people in the lobby.");
        console.log($("#lobby").text());
    });
    // Initialize the player's scores variables
    // var playerOneWins = 0, playerOneLosses = 0, playerOneTies = 0, playerTwoWins = 0, playerTwoLosses = 0, playerTwoTies = 0; //, wins, losses, ties;

    var initialPlayerOneID = "randIDOne", initialPlayerOneName = "randNameOne", initialPlayerOneWins = "RandWinsOne", initialPlayerOneLosses = "RandLossesOne", initialPlayerOneTies = "randTiesOne";
    var initialPlayerTwoID = "randIDTwo", initialPlayerTwoName = "randNamrTwo", initialPlayerTwoWins = "randWinsTwo", initialPlayerTwoLosses = "randLossesTwo", initialPlayerTwoTies = "randTiesTwo";
    var playerOneID, playerOneName, playerOneWins, playerOneLosses, playerOneTies;
    var playerTwoID, playerTwoName, playerTwoWins, playerTwoLosses, playerTwoTies;
    function setDefaultPlayerOne() {
        playerOneID = initialPlayerOneID, playerOneName = initialPlayerOneName, playerOneWins = initialPlayerOneWins, playerOneLosses = initialPlayerOneLosses, playerOneTies = initialPlayerOneTies;
    }

    function setDefaultPlayerTwo() {
        playerTwoID = initialPlayerTwoID, playerTwoName = initialPlayerTwoName, playerTwoWins = initialPlayerTwoWins, playerTwoLosses = initialPlayerTwoLosses, playerTwoTies = initialPlayerTwoTies;
        }

    database.ref().on("value", function(snapshot) {
        event.preventDefault();
        // console.log("players/playerOneID Exists: " + snapshot.child("players/playerOneID").exists());
        // console.log("players/playerOneName Exists: " + snapshot.child("players/playerOneName").exists());
        // console.log("players/playerOneWins Exists: " + snapshot.child("players/playerOneWins").exists());
        // console.log("players/playerOneLosses Exists: " + snapshot.child("players/playerOneLosses").exists());
        // console.log("players/playerOneTies Exists: " + snapshot.child("players/playerOneTies").exists());
        // console.log("players/playerTwoID Exists: " + snapshot.child("players/playerTwoID").exists());
        // console.log("players/playerTwoName Exists: " + snapshot.child("players/playerTwoName").exists());
        // console.log("players/playerTwoWins Exists: " + snapshot.child("players/playerTwoWins").exists());
        // console.log("players/playerTwoLosses Exists: " + snapshot.child("players/playerTwoLosses").exists());
        // console.log("players/playerTwoTies Exists: " + snapshot.child("players/playerTwoTies").exists());
        if (snapshot.child("players/playerOneID").exists() && snapshot.child("players/playerOneName").exists() && snapshot.child("players/playerOneWins").exists() && snapshot.child("players/playerOneLosses").exists() && snapshot.child("players/playerOneTies").exists() && snapshot.child("players/playerTwoID").exists() && snapshot.child("players/playerTwoName").exists() && snapshot.child("players/playerTwoWins").exists() && snapshot.child("players/playerTwoLosses").exists() && snapshot.child("players/playerTwoTies").exists()) {
            console.log("players/playerOneID Exists: " + snapshot.child("players/playerOneID").exists());
            console.log("players/playerOneName Exists: " + snapshot.child("players/playerOneName").exists());
            console.log("players/playerOneWins Exists: " + snapshot.child("players/playerOneWins").exists());
            console.log("players/playerOneLosses Exists: " + snapshot.child("players/playerOneLosses").exists());
            console.log("players/playerOneTies Exists: " + snapshot.child("players/playerOneTies").exists());
            console.log("players/playerTwoID Exists: " + snapshot.child("players/playerTwoID").exists());
            console.log("players/playerTwoName Exists: " + snapshot.child("players/playerTwoName").exists());
            console.log("players/playerTwoWins Exists: " + snapshot.child("players/playerTwoWins").exists());
            console.log("players/playerTwoLosses Exists: " + snapshot.child("players/playerTwoLosses").exists());
            console.log("players/playerTwoTies Exists: " + snapshot.child("players/playerTwoTies").exists());
            if ((currentLobbySize < 2) && ((snapshot.child("players/playerOneID") !== "randIDOne") && (snapshot.child("players/playerOneName") !== "randNameOne") && (snapshot.child("players/playerOneWins") !== "randWinsOne") && (snapshot.child("players/playerOneLosses") !== "randLossesOne") && (snapshot.child("players/playerOneTies") !== "randTiesOne") && (snapshot.child("players/playerTwoID") !== "randIDTwo") && (snapshot.child("players/playerTwoName") !== "randNameTwo") && (snapshot.child("players/playerTwoWins") !== "randWinsTwo") && (snapshot.child("players/playerTwoLosses") !== "randLossesTwo") && (snapshot.child("/players/playerTwoTies") !== "randTiesTwo"))) {
                // alert("There are currently two players already playing \nPlease wait until there is a free spot");
            
                // playerOneID = snapshot.val().playerOneID, playerOneName = snapshot.val().playerOneName, playerOneWins = snapshot.val().playerOneWins, playerOneLosses = snapshot.val().playerOneLosses, playerOneTies = snapshot.val().playerOneTies;
            
                // playerTwoID = snapshot.val().playerTwoID, playerTwoName = snapshot.val().playerTwoName, playerTwoWins = snapshot.val().playerTwoWins, playerTwoLosses = snapshot.val().playerTwoLosses, playerTwoTies = snapshot.val().playerTwoTies;

                playerOneID = snapshot.child("players/playerOneID").val(), playerOneName = snapshot.child("players/playerOneName").val(), playerOneWins = snapshot.child("players/playerOneWins").val(), playerOneLosses = snapshot.child("players/playerOneLosses").val(), playerOneTies = snapshot.child("players/playerOneTies").val();
            
                playerTwoID = snapshot.child("players/playerTwoID").val(), playerTwoName = snapshot.child("players/playerTwoName").val(), playerTwoWins = snapshot.child("players/playerTwoWins").val(), playerTwoLosses = snapshot.child("players/playerTwoLosses").val(), playerTwoTies = snapshot.child("players/playerTwoTies").val();

                seatAvailable = 3; // both seats currently taken
            
                console.log("playerOneID: " + playerOneID);
                console.log("playerOneName: " + playerOneName);
                console.log("playerOneWins: " + playerOneWins);
                console.log("playerOneLosses: " + playerOneLosses);
                console.log("playerOneTies: " + playerOneTies);
                console.log("playerTwoID: " + playerTwoID);
                console.log("playerTwoName: " + playerTwoName);
                console.log("playerTwoWins: " + playerTwoWins);
                console.log("playerTwoLosses: " + playerTwoLosses);
                console.log("playerTwoTies: " + playerTwoTies);
            }

            else if ((snapshot.child("players/playerOneID") === "randIDOne") && (snapshot.child("players/playerOneName") === "randNameOne") && (snapshot.child("players/playerOneWins") === "randWinsOne") && (snapshot.child("players/playerOneLosses") === "randLossesOne") && (snapshot.child("players/playerOneTies") === "randTiesOne") && (snapshot.child("players/playerTwoID") !== "randIDTwo") && (snapshot.child("players/playerTwoName") !== "randNameTwo") && (snapshot.child("players/playerTwoWins") !== "randWinsTwo") && (snapshot.child("players/playerTwoLosses") !== "randLossesTwo") && (snapshot.child("players/playerTwoTies") !== "randTiesTwo")) {
                // alert("Seat one is now available if you wish to play");

                // playerTwoID = snapshot.val().playerTwoID, playerTwoName = snapshot.val().playerTwoName, playerTwoWins = snapshot.val().playerTwoWins, playerTwoLosses = snapshot.val().playerTwoLosses, playerTwoTies = snapshot.val().playerTwoTies;

                playerTwoID = snapshot.child("players/playerTwoID").val(), playerTwoName = snapshot.child("players/playerTwoName").val(), playerTwoWins = snapshot.child("players/playerTwoWins").val(), playerTwoLosses = snapshot.child("players/playerTwoLosses").val(), playerTwoTies = snapshot.child("players/playerTwoTies").val();

                console.log("playerTwoID: " + playerTwoID);
                console.log("playerTwoName: " + playerTwoName);
                console.log("playerTwoWins: " + playerTwoWins);
                console.log("playerTwoLosses: " + playerTwoLosses);
                console.log("playerTwoTies: " + playerTwoTies);

                seatAvailable = 1;
            }

            else if ((snapshot.child("players/playerOneID") !== "randIDOne") && (snapshot.child("players/playerOneName") !== "randNameOne") && (snapshot.child("players/playerOneWins") !== "randWinsOne") && (snapshot.child("players/playerOneLosses") !== "randLossesOne") && (snapshot.child("players/playerOneTies") !== "randTiesOne") && (snapshot.child("players/playerTwoID") === "randIDTwo") && (snapshot.child("players/playerTwoName") === "randNameTwo") && (snapshot.child("players/playerTwoWins") === "randWinsTwo") && (snapshot.child("players/playerTwoLosses") === "randLossesTwo") && (snapshot.child("players/playerTwoTies") === "randTiesTwo")) {
            // alert("Seat two is now available if you wish to play");

            // playerOneID = snapshot.val().playerOneID, playerOneName = snapshot.val().playerOneName, playerOneWins = snapshot.val().playerOneWins, playerOneLosses = snapshot.val().playerOneLosses, playerOneTies = snapshot.val().playerOneTies;

            playerOneID = snapshot.child("players/playerOneID").val(), playerOneName = snapshot.child("players/playerOneName").val(), playerOneWins = snapshot.child("players/playerOneWins").val(), playerOneLosses = snapshot.child("players/playerOneLosses").val(), playerOneTies = snapshot.child("players/playerOneTies").val();
            
            seatAvailable = 2;

                console.log("playerOneID: " + playerOneID);
                console.log("playerOneName: " + playerOneName);
                console.log("playerOneWins: " + playerOneWins);
                console.log("playerOneLosses: " + playerOneLosses);
                console.log("playerOneTies: " + playerOneTies);
            }

            else {
                // alert("Both seats are free");

                // since both are available it will automatically seat the player in the first available seat
                seatAvailable = 0;
            }
        }

        else {
            setDefaultPlayerOne();
            setDefaultPlayerTwo();
            rootRef.set({
            // database.ref().child("").set({ //.push({ //.set({
                "playerOneID": playerOneID,
                "playerOneName": playerOneName,
                "playerOneWins": playerOneWins,
                "playerOneLosses": playerOneTies,
                "playerTwoID": playerTwoID,
                "playerTwoName": playerTwoName,
                "playerTwoWins": playerTwoWins,
                "playerTwoLosses": playerTwoLosses,
                "playerTwoTies": playerTwoTies
            });

            seatAvailable = 0;
            console.log("seatAvailable (0 means both): " + seatAvailable);
            console.log("playerOneID: " + playerOneID);
            console.log("playerOneName: " + playerOneName);
            console.log("playerOneWins: " + playerOneWins);
            console.log("playerOneLosses: " + playerOneLosses);
            console.log("playerOneTies: " + playerOneTies);
            console.log("playerTwoID: " + playerTwoID);
            console.log("playerTwoName: " + playerTwoName);
            console.log("playerTwoWins: " + playerTwoWins);
            console.log("playerTwoLosses: " + playerTwoLosses);
            console.log("playerTwoTies: " + playerTwoTies);
    }
    });

    function currentScores(playerNum, wins, losses, ties) {
        var score = $(("#player") + playerNum + "Score");
        score = $(score).text("Current Score: \nWins: " + wins + "    Losses: " + losses + "    Ties: " + ties);
        console.log(score.text());
    }

    $("#btnSubmit").on("click", function(event) {
        event.preventDefault();
        database.ref().on("value", function(snapshot) {
            var tempPlayerOneID = snapshot.child("players/playerOneID").val();
            console.log("tempPlayerOneID: " + tempPlayerOneID);
            var tempPlayerTwoID = snapshot.child("players/playerTwoID").val();
            console.log("tempPlayerTwoID: " + tempPlayerTwoID);

            if (tempPlayerOneID !== tempPlayerTwoID) {
            if (seatAvailable <= 1) {
            // if ((((tempPlayerOneID == " ") || (tempPlayerOneID == "")) && ((tempPlayerTwoID == "") || (tempPlayerTwoID == " "))) || ((tempPlayerOneID == "") || (tempPlayerOneID == " ") && ((tempPlayerTwoID != "") || (tempPlayerTwoID != " ")))) {
                    var tempName = $("#inputUser").val();
                $("#player1Title").text("Player 1: " + tempName); // + $("#inputUser").val());
                // to test the scores player1
                var playerOneWins = 0, playerOneLosses = 0, playerOneTies = 0;
                rootRef.update({
                    "playerOneName": tempName,
                    "playerOneID": connectionID,
                    "playerOneWins": playerOneWins,
                    "playerOneLosses": playerOneLosses,
                    "playerOneTies": playerOneTies
                });
                for (var x = 0; x < 5; x ++) {
                    var randWins = 0, randLosses = 0, randTies = 0;
                    randWins = Math.floor(Math.random() * 100);
                    randLosses = Math.floor(Math.random() * 100);
                    randTies = Math.floor(Math.random() * 100);
                
                    currentScores(1, randWins, randLosses, randTies);

                    playerOneWins = randWins;
                    playerOneLosses = randLosses;
                    playerOneTies = randTies;

                    rootRef.update({
                        "playerOneName": tempName,
                        "playerOneID": connectionID,
                        "playerOneWins": playerOneWins,
                        "playerOneLosses": playerOneLosses,
                        "playerOneTies": playerOneTies
                    });
    
                
                    seatAvailable = 50;
                    // alert("Player1 scores have changed iteration{" + x + "]");
                }
            }
        
            // if (((tempPlayerOneID != " ") || (tempPlayerOneID != "")) && ((tempPlayerTwoID == "") || (tempPlayerTwoID == " "))) {
            else if (seatAvailable = 2) {
                var tempName = $("#inputUser").val();
                $("#player1Title").text("Player 2: " + $("#inputUser").val());
                // to test the scores player1
                var playerTwoWins = 0, playerTwoLosses = 0, playerTwoTies = 0;
                rootRef.update({
                    "playerTwoName": tempName,
                    "playerTwoID": connectionID,
                    "playerTwoWins": playerTwoWins,
                    "playerTwoLosses": playerTwoLosses,
                    "playerTwoTies": playerTwoTies
                });
                for (var x = 0; x < 5; x ++) {
                    var randWins = 0, randLosses = 0, randTies = 0;
                    randWins = Math.floor(Math.random() * 100);
                    randLosses = Math.floor(Math.random() * 100);
                    randTies = Math.floor(Math.random() * 100);

                    currentScores(2, randWins, randLosses, randTies);
                
                    playerTwoWins = randWins;
                    playerTwoLosses = randLosses;
                    playerTwoTies = randTies;

                    rootRef.update({
                        "playerTwoName": tempName,
                        "playerTwoID": connectionID,
                        "playerTwoWins": playerTwoWins,
                        "playerTwoLosses": playerTwoLosses,
                        "playerTwoTies": playerTwoTies
                    });

                    seatAvailable = 100;
                        // alert("Player1 scores have changed iteration{" + x + "]");
                }
            }
        
            else {
                // alert("You need to wait until there is an open seat");
            }
        }
        else {

        }
        
        });

        switch(seatAvailable) {
            case 50:
            case 100:
                seatAvailable = 3;
                break;
            default:
                break;                
        }
    });

    
})
