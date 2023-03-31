"use strict";

var playerData = []; 

// Load player data from JSON file
getData("./src/data/players.json").then(function (data) {
    playerData = data;

     // Build dropdown menu for player selection
    function buildDropdown() {
        const playerSelect = document.getElementById("player-select");
        for (let i = 0; i < playerData.length; i++) {
          const name = playerData[i].player.name.first + " " + playerData[i].player.name.last;
          const option = document.createElement("option");
          option.textContent = name;
          option.value = name;
          playerSelect.appendChild(option);
        }
        playerSelect.addEventListener("change", function (selection) {
          const playerIndex = playerData.findIndex(
            (player) =>
              `${player.player.name.first} ${player.player.name.last}` ===
              selection.target.value
          );
          changePlayer(playerData[playerIndex]);
        });
      }

       // Display selected player's information and statistics
      
      function changePlayer(player) {
        const playerContainer = document.getElementById("player-container");
        const playerName = document.getElementById("player-name");
        const playerPosition = document.getElementById("player-position");
        const clubBadge = document.getElementById("badge");
        const apperances = document.getElementById("appearances");
        const goals = document.getElementById("goals");
        const assists = document.getElementById("assists");
        const goalsPerMatch = document.getElementById("goals-per-match");
        const passesPerMinute = document.getElementById("passes-per-minute");
        const children = playerContainer.getElementsByTagName('img');
      
        // Remove existing headshot images
        while (playerContainer.firstChild) {
          playerContainer.removeChild(playerContainer.firstChild);
        }
      
        // Create new playerContainer images
        for (let i = 0; i < playerData.length; i++) {
          const playerImg = document.createElement("img");
          playerImg.className = "player-img";
          playerImg.id = playerData[i].player.id;
          playerImg.src = `./src/assets/players/p${playerData[i].player.id}.png`;
          playerImg.alt = `${playerData[i].player.name.first} ${playerData[i].player.name.last}`;
          playerContainer.appendChild(playerImg);
        }
      
        // Hide all playerContainer images
        for (let i = 0; i < children.length; i++) {
          children[i].style.opacity = "0";
        }
      
        // Show player image
        const playerImg = document.getElementById(player.player.id);
        playerImg.style.opacity = "1";
      
        // Update other elements
        playerName.innerHTML = player.player.name.first + " " + player.player.name.last;
        playerPosition.innerHTML = decodePosition(player.player.info.position);
        clubBadge.style.backgroundPosition = getBadge(player.player.currentTeam.shortName);      
  
        for (let i = 0; i < player.stats.length; i++) {
        const stat = player.stats[i];
        switch (stat.name) {
            case "appearances":
            apperances.innerHTML = stat.value;
            break;
            case "goals":
            goals.innerHTML = stat.value;
            if (player === playerData[3]) {
                goalsPerMatch.innerHTML = roundTwo(stat.value / player.stats[5].value);
            } else if (stat.name === "goals" && player.stats[6].name === "appearances") {
                goalsPerMatch.innerHTML = roundTwo(stat.value / player.stats[6].value);
            }
            break;
            case "goal_assist":
            assists.innerHTML = stat.value;
            break;
            case "fwd_pass":
            if (player.stats[4].name === "fwd_pass" && player.stats[8].name === "backward_pass" && player.stats[7].name === "mins_played") {
                passesPerMinute.innerHTML = roundTwo((player.stats[4].value + player.stats[8].value) / player.stats[7].value);
            }
            break;
            default:
            break;
        }
    }
}
    buildDropdown();
    changePlayer(playerData[0]);
  }); 

function getData(url) {
  return new Promise(function (res, rej) {
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (data) {
      data = data.players;
      res(data);
    })["catch"](function (err) {
      return rej(err);
    });
  });
}

function decodePosition(code) {
    const positionMap = {
      D: "Defender",
      M: "Midfielder",
      F: "Striker"
    };
    return positionMap[code] || "";
  }
  
  function getBadge(team) {
    const teamMap = {
      'Spurs': '-500px -1000px',
      'Man City': '-800px -700px',
      'Man Utd': '-600px -800px',
      'Arsenal': '-100px -100px',
      'Leicester': '0px 0px'
    };
    return teamMap[team] || '';
  }  
  
  function roundTwo(num) {
    return parseFloat(num.toFixed(2));  
  }
  