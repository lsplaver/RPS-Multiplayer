$(document).ready(function () {
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

    connectedUsers.on("value", function (snap) {
        if (snap.val()) {
            var con = userConnections.push(true);
            connectionID = con.key;
            con.onDisconnect().remove();
            if (playerOneID === connectionID) {
                rootRef.set({
                    "playerOneID": null,
                    'playerOneName': null,
                    'playerOneWins': null,
                    "playerOneLosses": null
                });
            }

            else if (playerTwoID === connectionID) {
                rootRef.set({
                    "playerTwoID": null,
                    "playerTwoName": null,
                    "playerTwoWins": null,
                    "playerTwoLosses": null,
                    "playerTwoTies": null
                });
            }
        }
    });

    var currentLobbySize;
    userConnections.on("value", function (snap) {
        currentLobbySize = snap.numChildren();
        $("#lobby").text(snap.numChildren() + " people in the lobby.");
    });

    // Initialize the player's scores variables
    var initialPlayerOneID = "randIDOne", initialPlayerOneName = "randNameOne", initialPlayerOneWins = "RandWinsOne", initialPlayerOneLosses = "RandLossesOne", initialPlayerOneTies = "randTiesOne";
    var initialPlayerTwoID = "randIDTwo", initialPlayerTwoName = "randNamrTwo", initialPlayerTwoWins = "randWinsTwo", initialPlayerTwoLosses = "randLossesTwo", initialPlayerTwoTies = "randTiesTwo";
    var playerOneID, playerOneName, playerOneWins, playerOneLosses, playerOneTies;
    var playerTwoID, playerTwoName, playerTwoWins, playerTwoLosses, playerTwoTies;
    var currentSeatAvailableKey = sessionStorage.key("currentSeatAvailableKey");
    var currentSeatAvailable = sessionStorage.getItem(currentSeatAvailableKey);
    var seatAvailable = 0;
    function setDefaultPlayerOne() {
        playerOneID = initialPlayerOneID, playerOneName = initialPlayerOneName, playerOneWins = initialPlayerOneWins, playerOneLosses = initialPlayerOneLosses, playerOneTies = initialPlayerOneTies;
    }

    function setDefaultPlayerTwo() {
        playerTwoID = initialPlayerTwoID, playerTwoName = initialPlayerTwoName, playerTwoWins = initialPlayerTwoWins, playerTwoLosses = initialPlayerTwoLosses, playerTwoTies = initialPlayerTwoTies;
    }

    database.ref("/players").on("value", function (snapshot) {
        // current players and score
        var tempPlayerOneName, tempPlayerOneWins, tempPlayerOneLosses, tempPlayerOneTies, tempPlayerTwoName, tempPlayerTwoWins, tempPlayerTwoLosses, tempPlayerTwoTies;
        tempPlayerOneName = snapshot.child("playerOneName").val();
        tempPlayerOneWins = snapshot.child("playerOneWins").val();
        tempPlayerOneLosses = snapshot.child("playerOneLosses").val();
        tempPlayerOneTies = snapshot.child("playerOneTies").val();
        tempPlayerTwoName = snapshot.child("playerTwoName").val();
        tempPlayerTwoWins = snapshot.child("playerTwoWins").val();
        tempPlayerTwoLosses = snapshot.child("playerTwoLosses").val();
        tempPlayerTwoTies = snapshot.child("playerTwoTies").val();

        $("#player1Title").text("Player 1: " + tempPlayerOneName);
        currentScores(1, tempPlayerOneWins, tempPlayerOneLosses, tempPlayerOneTies);
        $("#player2Title").text("Player 2: " + tempPlayerTwoName);
        currentScores(2, tempPlayerTwoWins, tempPlayerTwoLosses, tempPlayerTwoTies);
        if (snapshot.child("playerOneID").exists() && snapshot.child("playerOneName").exists() && snapshot.child("playerOneWins").exists() && snapshot.child("playerOneLosses").exists() && snapshot.child("playerOneTies").exists() && snapshot.child("playerTwoID").exists() && snapshot.child("playerTwoName").exists() && snapshot.child("playerTwoWins").exists() && snapshot.child("playerTwoLosses").exists() && snapshot.child("playerTwoTies").exists()) {
            if (((snapshot.child("playerOneID") !== "randIDOne") && (snapshot.child("playerOneName") !== "randNameOne") && (snapshot.child("playerOneWins") !== "randWinsOne") && (snapshot.child("playerOneLosses") !== "randLossesOne") && (snapshot.child("playerOneTies") !== "randTiesOne") && (snapshot.child("playerTwoID") !== "randIDTwo") && (snapshot.child("playerTwoName") !== "randNameTwo") && (snapshot.child("playerTwoWins") !== "randWinsTwo") && (snapshot.child("playerTwoLosses") !== "randLossesTwo") && (snapshot.child("/playerTwoTies") !== "randTiesTwo"))) {

                playerOneID = snapshot.child("playerOneID").val(), playerOneName = snapshot.child("playerOneName").val(), playerOneWins = snapshot.child("playerOneWins").val(), playerOneLosses = snapshot.child("playerOneLosses").val(), playerOneTies = snapshot.child("playerOneTies").val();

                playerTwoID = snapshot.child("playerTwoID").val(), playerTwoName = snapshot.child("playerTwoName").val(), playerTwoWins = snapshot.child("playerTwoWins").val(), playerTwoLosses = snapshot.child("playerTwoLosses").val(), playerTwoTies = snapshot.child("playerTwoTies").val();

                seatAvailable = 3; // both seats currently taken
            }

            else if ((snapshot.child("playerOneID") === "randIDOne") && (snapshot.child("playerOneName") === "randNameOne") && (snapshot.child("playerOneWins") === "randWinsOne") && (snapshot.child("playerOneLosses") === "randLossesOne") && (snapshot.child("playerOneTies") === "randTiesOne") && (snapshot.child("playerTwoID") !== "randIDTwo") && (snapshot.child("playerTwoName") !== "randNameTwo") && (snapshot.child("playerTwoWins") !== "randWinsTwo") && (snapshot.child("playerTwoLosses") !== "randLossesTwo") && (snapshot.child("playerTwoTies") !== "randTiesTwo")) {

                playerTwoID = snapshot.child("playerTwoID").val(), playerTwoName = snapshot.child("playerTwoName").val(), playerTwoWins = snapshot.child("playerTwoWins").val(), playerTwoLosses = snapshot.child("playerTwoLosses").val(), playerTwoTies = snapshot.child("playerTwoTies").val();

                seatAvailable = 1;
            }

            else if ((snapshot.child("playerOneID") !== "randIDOne") && (snapshot.child("playerOneName") !== "randNameOne") && (snapshot.child("playerOneWins") !== "randWinsOne") && (snapshot.child("playerOneLosses") !== "randLossesOne") && (snapshot.child("playerOneTies") !== "randTiesOne") && (snapshot.child("playerTwoID") === "randIDTwo") && (snapshot.child("playerTwoName") === "randNameTwo") && (snapshot.child("playerTwoWins") === "randWinsTwo") && (snapshot.child("playerTwoLosses") === "randLossesTwo") && (snapshot.child("playerTwoTies") === "randTiesTwo")) {

                playerOneID = snapshot.child("playerOneID").val(), playerOneName = snapshot.child("playerOneName").val(), playerOneWins = snapshot.child("playerOneWins").val(), playerOneLosses = snapshot.child("playerOneLosses").val(), playerOneTies = snapshot.child("playerOneTies").val();

                seatAvailable = 2;
            }

            else {
                // since both are available it will automatically seat the player in the first available seat
                seatAvailable = 0;
            }
        }

        else {
            setDefaultPlayerOne();
            setDefaultPlayerTwo();
            rootRef.set({
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
        }
    });

    function currentScores(playerNum, wins, losses, ties) {
        var score = $(("#player") + playerNum + "Score");
        score = $(score).text("Current Score: \nWins: " + wins + "    Losses: " + losses + "    Ties: " + ties);
    }

    $("#btnSubmit").on("click", function (event) {
        event.preventDefault();
        database.ref("/players").on("value", function (snapshot) {
            var tempPlayerOneID = snapshot.child("playerOneID").val();
            var tempPlayerTwoID = snapshot.child("playerTwoID").val();

            function playerOneIf() {
                if (seatAvailable <= 1) {
                    var tempName = $("#inputUser").val();
                    $("#player1Title").text("Player 1: " + tempName);
                    rootRef.update({
                        "playerOneName": tempName,
                        "playerOneID": connectionID,
                        "playerOneWins": playerOneWins,
                        "playerOneLosses": playerOneLosses,
                        "playerOneTies": playerOneTies
                    });
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
                }
            }

            function playerTwoIf() {
                if (seatAvailable = 2) {
                    var tempName = $("#inputUser").val();
                    $("#player2Title").text("Player 2: " + $("#inputUser").val());
                    rootRef.update({
                        "playerTwoName": tempName,
                        "playerTwoID": connectionID,
                        "playerTwoWins": playerTwoWins,
                        "playerTwoLosses": playerTwoLosses,
                        "playerTwoTies": playerTwoTies
                    });
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
                }
            }

            switch (connectionID) {
                case (tempPlayerOneID && tempPlayerTwoID):
                    break;
                case (tempPlayerOneID && (!(tempPlayerTwoID))):
                    playerOneIf();
                    break;
                case ((!(tempPlayerOneID)) && tempPlayerTwoID):
                    playerTwoIf();
                    break;
                default:
                    playerOneIf();
                    break;
            };
        });
    });
})
