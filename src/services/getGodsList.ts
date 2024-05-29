import cheerio from "cheerio";
import God from "./Gods";

const getGodsList = (url: string): Promise<Array<God>> => {
  return new Promise<Array<God>>((resolve, reject) => {
    fetch("https://corsproxy.io/?" + encodeURIComponent(url))
      .then((res) => res.text())
      .then((res) => resolve(getGodsListFromHTML(res)))
      .catch((e) => reject(e));
  });
};

const getGodsListFromHTML = (text: string): Array<God> => {
  const html = cheerio.load(text);

  // Find the specific table by its class or ID
  const specificTable = html("table.blue-window.sortable");
  if (specificTable.length > 0) {
    // Iterate through each row of the table
    const tableRows = specificTable.find("tr").slice(1); // Exclude header row
    const godList = tableRows
      .map((_, row) => {
        const columns = html(row).find("td");

        // Extracting data from columns
        const godName = html(columns[1]).text().trim();
        const pantheon = html(columns[2]).text().trim();
        const attackType = html(columns[3]).text().trim();
        const powerType = html(columns[4]).text().trim();
        const godClass = html(columns[5]).text().trim();
        const difficulty = html(columns[6]).text().trim();
        const favorCost = html(columns[7]).text().trim();
        const gemsCost = html(columns[8]).text().trim();
        const releaseDate = html(columns[9]).text().trim();
        const god: God = {
          name: godName,
          pantheon: pantheon,
          attackType: attackType,
          powerType: powerType,
          class: godClass,
          difficulty: difficulty,
          favorCost: favorCost,
          gemsCost: gemsCost,
          releaseDate: releaseDate,
          releaseYear: parseInt(releaseDate.substring(0, 4)),
        };
        // Create an object for each row
        return god;
      })
      .get();

    return godList;
  } else {
    console.log("The specified table does not exist in the HTML.");
    return [];
  }
};
export default getGodsList;
