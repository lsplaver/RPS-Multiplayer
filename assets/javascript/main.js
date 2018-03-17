$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBKKI1ret6b6SjDya6hubo4AqPGwk0ajq8",
        authDomain: "rps-multiplayer-splaver.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-splaver.firebaseio.com",
        projectId: "rps-multiplayer-splaver",
        storageBucket: "",
        messagingSenderId: "115898659707"
    };
    firebase.initializeApp(config);

    // Initialize the player's scores variables
    var player1Wins = 0, player1Losses = 0, player1Ties = 0, player2Wins = 0, player2Losses = 0, player2Ties = 0; //, wins, losses, ties;

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
