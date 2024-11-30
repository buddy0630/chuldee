// Fetch live scores from iSports API
async function fetchLiveScores() {
    const apiKey = 'afsdUSvPtmMg8wc4'; // Your new API Key
    const apiUrl = `https://api.isportsapi.com/sport/basketball/match/live?api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('API Response:', data); // Debugging

        if (data.code === 0) { // Check for successful response
            displayScores(data.data);
        } else {
            console.error('API Error:', data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

// Display live scores on the page
function displayScores(matches) {
    const scoresContainer = document.getElementById('scores-container');
    scoresContainer.innerHTML = ''; // Clear previous content

    if (!matches || matches.length === 0) {
        scoresContainer.innerHTML = '<p>No live matches available.</p>';
        return;
    }

    matches.forEach(match => {
        const matchCard = `
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-white">
                    <div class="card-body">
                        <h5 class="card-title">${match.homeTeam.name} vs ${match.awayTeam.name}</h5>
                        <p class="card-text">Score: ${match.homeTeam.score} - ${match.awayTeam.score}</p>
                        <p class="card-text">Time: ${match.matchTime}</p>
                    </div>
                </div>
            </div>
        `;
        scoresContainer.innerHTML += matchCard;
    });
}

// Call the function to fetch live scores
fetchLiveScores();
