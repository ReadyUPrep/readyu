document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const questions = document.querySelectorAll(".question");
  const scores = {
    Analytical: 0,
    Experiential: 0,
    Creative: 0,
    Collaborative: 0,
    Organized: 0,
  };
  const counts = { ...scores };

  questions.forEach((q) => {
    const category = q.dataset.category;
    const reverse = q.dataset.reverse === "true";
    const value = parseInt(q.querySelector("select").value);
    const score = reverse ? 6 - value : value;

    scores[category] += score;
    counts[category]++;
  });

  // Scale scores to 0–100
  const scaled = {};
  for (let cat in scores) {
    if (counts[cat] > 0) {
      scaled[cat] = ((scores[cat] - counts[cat]) / (4 * counts[cat])) * 100;
    }
  }

  // Sort categories
  const sorted = Object.entries(scaled).sort((a, b) => b[1] - a[1]);
  const [top1, top2] = [sorted[0][0], sorted[1][0]];

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
});