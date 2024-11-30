const API_KEY = 'VqK0NEvPlZ9mYz57'; // Your API key
const BASE_URL = 'https://api.sportsdata.io/v4/nba/scores/json'; // Updated base URL

// Fetch live game data
async function fetchGames() {
    try {
        const response = await fetch(`${BASE_URL}/GamesByDate/2024-11-30`, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY,
            },
        });
        const data = await response.json();
        if (response.ok) {
            displayGames(data); // Directly use the response data
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
    gamesContainer.innerHTML = ''; // Clear previous content
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
            <h3>${game.HomeTeam} vs. ${game.AwayTeam}</h3>
            <p>${game.HomeTeamScore || 0} - ${game.AwayTeamScore || 0}</p>
            <p>Status: ${game.Status}</p>
        `;
        gamesContainer.appendChild(gameDiv);
    });
}

// Fetch team stats
async function fetchTeamStats() {
    try {
        const response = await fetch(`${BASE_URL}/Standings/2024`, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY,
            },
        });
        const data = await response.json();
        if (response.ok) {
            displayTeams(data); // Directly use the response data
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
            <h3>${team.Name}</h3>
            <p>Wins: ${team.Wins}, Losses: ${team.Losses}</p>
        `;
        teamsContainer.appendChild(teamDiv);
    });
}

// Fetch player stats
async function fetchPlayerStats() {
    console.log('Note: SportsData.io does not provide individual player stats with their free NBA plan.');
}

// Initialize the dashboard
function init() {
    fetchGames();
    fetchTeamStats();
    setInterval(fetchGames, 60000); // Refresh live scores every minute
}

document.addEventListener('DOMContentLoaded', init);
