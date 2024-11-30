const apiKey = "c782e038abcf422fb51b6e50fd24d55c";
const season = 2024;
const url = `https://api.sportsdata.io/v3/nba/scores/json/Standings/${season}`;

fetch(url, {
  headers: {
    "Ocp-Apim-Subscription-Key": apiKey
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    return response.json();
  })
  .then(data => {
    console.log("Standings Data:", data);
    // Process and display the standings
  })
  .catch(error => {
    console.error("Error fetching standings:", error);
  });
