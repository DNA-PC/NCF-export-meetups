const fs = require("fs");
const path = require("path");

// Traduction des mois en français
const moisFrancais = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const inputPath = path.join(__dirname, "events.json");
const outputPath = path.join(__dirname, "events.csv");

const rawData = fs.readFileSync(inputPath, "utf8");
const jsonData = JSON.parse(rawData);

const edges = jsonData?.data?.groupByUrlname?.pastEvents?.edges ?? [];

const extractVille = (title) => {
  const match = title.match(/^([^\s:-]+)/);
  return match ? match[1].trim().toUpperCase() : "INCONNUE";
};

// En-têtes du CSV
const csvLines = [
  ["title", "date", "url", "ville", "année", "mois", "moisNom", "période"]
];

// Génération des lignes
edges.forEach(({ node }) => {
  const title = node.title.replace(/"/g, '""');
  const dateStr = node.dateTime;
  const url = node.eventUrl;
  const ville = extractVille(node.title);

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const monthIndex = date.getMonth(); // 0-indexed
  const month = String(monthIndex + 1).padStart(2, "0");
  const monthName = moisFrancais[monthIndex];
  const period = `${year}-${month}`;

  csvLines.push([
    `"${title}"`,
    `"${dateStr}"`,
    `"${url}"`,
    `"${ville}"`,
    year,
    month,
    `"${monthName}"`,
    `"${period}"`
  ]);
});

fs.writeFileSync(outputPath, csvLines.map(line => line.join(",")).join("\n"), "utf8");

console.log("✅ Fichier CSV généré avec enrichissement temporel :", outputPath);
