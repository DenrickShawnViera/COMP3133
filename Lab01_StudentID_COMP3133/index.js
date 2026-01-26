const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const INPUT_FILE = path.join(__dirname, "input_countries.csv");
const CANADA_FILE = path.join(__dirname, "canada.txt");
const USA_FILE = path.join(__dirname, "usa.txt");

async function deleteIfExists(filePath) {
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

async function main() {
  await deleteIfExists(CANADA_FILE);
  await deleteIfExists(USA_FILE);

  const canadaStream = fs.createWriteStream(CANADA_FILE, { flags: "a" });
  const usaStream = fs.createWriteStream(USA_FILE, { flags: "a" });

  canadaStream.write("country,year,population\n");
  usaStream.write("country,year,population\n");

  fs.createReadStream(INPUT_FILE)
    .pipe(csv())
    .on("data", (row) => {
      const country = row.country?.toLowerCase().trim();
      const year = row.year;
      const population = row.population;

      if (country === "canada") {
        canadaStream.write(`canada,${year},${population}\n`);
      } else if (country === "united states") {
        usaStream.write(`united states,${year},${population}\n`);
      }
    })
    .on("end", () => {
      canadaStream.end();
      usaStream.end();
      console.log("Finished processing CSV");
    });
}

main();
