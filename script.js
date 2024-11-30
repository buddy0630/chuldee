const apiKey = "c782e038abcf422fb51b6e50fd24d55c";
const apiBase = "https://api.sportsdata.io/v4/nba/scores/json/GamesByDate/";

document.getElementById("fetch-scores").addEventListener("click", () => {
  const date = document.getElementById("game-date").value;
  const url = `${apiBase}${date}?key=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data.");
      return response.json();
    })
    .then((games) => {
      const scoresDiv = document.getElementById("scores");
      scoresDiv.innerHTML = "";

      games.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.className = "score-card";
        gameCard.innerHTML = `
          <h3>${game.HomeTeam} vs ${game.AwayTeam}</h3>
          <p>${game.HomeTeamScore || 0} - ${game.AwayTeamScore || 0}</p>
        `;
        scoresDiv.appendChild(gameCard);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to load scores. Please try again.");
    });
});
