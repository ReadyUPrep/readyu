document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const scores = {};
  const counts = {};
  
  const questions = document.querySelectorAll(".question");
  
  questions.forEach((q) => {
    const category = q.dataset.category;
    const reverse = q.dataset.reverse === "true";
    const selected = q.querySelector('input[type="radio"]:checked');
  
    if (!scores[category]) {
      scores[category] = 0;
      counts[category] = 0;
    }
  
    if (selected) {
      let value = parseInt(selected.value);
      if (reverse) value = 6 - value;
      scores[category] += value;
      counts[category]++;
    }
  });

  // Scale scores to 0–100
  const scaled = {};
  for (let cat in scores) {
    if (counts[cat] > 0) {
      scaled[cat] = ((scores[cat] - counts[cat]) / (4 * counts[cat])) * 100;
    }
  }

  // Sort categories
//  const sorted = Object.entries(scaled).sort((a, b) => b[1] - a[1]);
//  const [top1, top2] = [sorted[0][0], sorted[1][0]];

  // NEW ONES:
  // Convert the scaled scores object into a sortable array
const sorted = Object.entries(scaled)
  .filter(entry => typeof entry[1] === "number") // filter out any undefined or non-number entries
  .sort((a, b) => b[1] - a[1]); // sort descending by score

// Make sure there are at least 2 categories to select
if (sorted.length >= 2) {
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];

  // Continue with your personality typing logic here
  console.log("Top two categories:", top1, top2);
} else {
  // Handle error gracefully
  alert("Not enough valid category scores to determine result.");
}

  // Archetype lookup
  const archetypes = {
    "Analytical|Experiential": "Engineer",
    "Analytical|Collaborative": "Strategist",
    "Analytical|Creative": "Innovator",
    "Analytical|Organized": "Architect",
    "Experiential|Collaborative": "Facilitator",
    "Experiential|Creative": "Maker",
    "Experiential|Organized": "Producer",
    "Collaborative|Creative": "Storyteller",
    "Collaborative|Organized": "Coordinator",
    "Creative|Organized": "Designer",
  };
  const key = [top1, top2].sort().join("|");
  const result = archetypes[key] || "Custom Type";

  document.getElementById("archetype-name").innerText = result;
  document.getElementById("archetype-desc").innerText =
    `Top 1: ${top1}, Top 2: ${top2}\nScore Summary: ` +
    sorted.map(([cat, score]) => `${cat}: ${Math.round(score)}`).join(", ");
  document.getElementById("results").style.display = "block";
  };
                                                      window.onload = function () {
  const container = document.getElementById("question-container");
  const questions = Array.from(container.querySelectorAll(".question"));

  // Fisher-Yates shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  };

  // Clear and re-add in random order
  container.innerHTML = "";
  questions.forEach(q => container.appendChild(q));
});
