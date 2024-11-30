const API_KEY = 'VqK0NEvPlZ9mYz57'; // Your API key
const BASE_URL = 'https://api.isportsapi.com/sport/basketball/nba'; // Base API URL

// Fetch live game data
async function fetchGames() {
    try {
        const response = await fetch(`${BASE_URL}/livescores?api_key=${API_KEY}`); // Correct parameter name
        const data = await response.json();
        if (data.code === 0) { // Check for successful response
            displayGames(data.data);
        } else {
            console.error('Error fetching games:', data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

// Display games on the scoreboard
function displayGames(games) {
    const gamesContainer = document.getElementById('games');
    gamesContainer.innerHTML = '';
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
            <h3>${game.homeTeam.name} vs. ${game.awayTeam.name}</h3>
            <p>${game.homeTeam.score} - ${game.awayTeam.score}</p>
            <p>Status: ${game.status}</p>
        `;
        gamesContainer.appendChild(gameDiv);
    });
}

// Fetch team stats
async function fetchTeamStats() {
    try {
        const response = await fetch(`${BASE_URL}/teams?api_key=${API_KEY}`); // Updated endpoint
        const data = await response.json();
        if (data.code === 0) {
            displayTeams(data.data);
        } else {
            console.error('Error fetching team stats:', data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error fetching team stats:', error);
    }
}

// Display team stats
function displayTeams(teams) {
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';
    teams.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `
            <h3>${team.name}</h3>
            <p>Wins: ${team.win}, Losses: ${team.loss}</p>
        `;
        teamsContainer.appendChild(teamDiv);
    });
}

// Fetch player stats
async function fetchPlayerStats() {
    try {
        const response = await fetch(`${BASE_URL}/players?api_key=${API_KEY}`); // Updated endpoint
        const data = await response.json();
        if (data.code === 0) {
            displayPlayers(data.data);
        } else {
            console.error('Error fetching player stats:', data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error fetching player stats:', error);
    }
}

// Display player stats
function displayPlayers(players) {
    const playersContainer = document.getElementById('players');
    playersContainer.innerHTML = '';
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerHTML = `
            <h3>${player.name}</h3>
            <p>Points: ${player.points}, Assists: ${player.assists}, Rebounds: ${player.rebounds}</p>
        `;
        playersContainer.appendChild(playerDiv);
    });
}

// Initialize the dashboard
function init() {
    fetchGames();
    fetchTeamStats();
    fetchPlayerStats();
    setInterval(fetchGames, 60000); // Refresh every minute
}

document.addEventListener('DOMContentLoaded', init);
