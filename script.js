const API_URL = 'https://api.isportsapi.com/sport/basketball/nba';
const API_KEY = 'VqK0NEvPlZ9mYz57';

// Fetch live game data
async function fetchGames() {
    const response = await fetch(`${API_URL}/games?apiKey=${API_KEY}`);
    const data = await response.json();
    displayGames(data.games);
}

// Display games on the scoreboard
function displayGames(games) {
    const gamesContainer = document.getElementById('games');
    gamesContainer.innerHTML = '';
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
            <h3>${game.home_team} vs. ${game.away_team}</h3>
            <p>${game.home_score} - ${game.away_score}</p>
            <p>Status: ${game.status}</p>
        `;
        gamesContainer.appendChild(gameDiv);
    });
}

// Fetch team stats
async function fetchTeamStats() {
    const response = await fetch(`${API_URL}/teams?apiKey=${API_KEY}`);
    const data = await response.json();
    displayTeams(data.teams);
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
            <p>Wins: ${team.wins}, Losses: ${team.losses}</p>
        `;
        teamsContainer.appendChild(teamDiv);
    });
}

// Fetch player stats
async function fetchPlayerStats() {
    const response = await fetch(`${API_URL}/players?apiKey=${API_KEY}`);
    const data = await response.json();
    displayPlayers(data.players);
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
