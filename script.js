const apiKey = "c782e038abcf422fb51b6e50fd24d55c";
const season = 2024; // Replace with the desired season
const url = `https://api.sportsdata.io/v3/nba/scores/json/Standings/${season}`;

document.addEventListener("DOMContentLoaded", () => {
  const standingsDiv = document.getElementById("standings");

  fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch standings");
      }
      return response.json();
    })
    .then((data) => {
      standingsDiv.innerHTML = "";

      data.forEach((team) => {
        const teamRow = document.createElement("div");
        teamRow.className = "standing-row";

        teamRow.innerHTML = `
          <span class="team-name">${team.Name} (${team.Conference})</span>
          <span>Wins: ${team.Wins}</span>
          <span>Losses: ${team.Losses}</span>
          <span>Win %: ${(team.Percentage * 100).toFixed(2)}%</span>
        `;

        standingsDiv.appendChild(teamRow);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      standingsDiv.innerHTML = "<p>Failed to load standings. Please try again later.</p>";
    });
});
