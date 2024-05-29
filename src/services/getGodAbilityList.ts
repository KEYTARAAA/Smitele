import cheerio, { Element } from "cheerio";
import God from "./Gods";
import Ability from "./Ability";
import AbilityPage from "../pages/AbilityPage";

const getAbilityList = (url: string, god: God): Promise<Array<Ability>> => {
  /*return fetch("https://corsproxy.io/?" + encodeURIComponent(url))
    .then((res) => res.text())
    .then((res) => getAbilityListFromHTML(god, res));*/
  return new Promise<Array<Ability>>((resolve, reject) => {
    fetch("https://corsproxy.io/?" + encodeURIComponent(url))
      .then((res) => res.text())
      .then((res) => resolve(getAbilityListFromHTML(god, res)))
      .catch((e) => reject(e));
  });
};

const getAbilityListFromHTML = (god: God, text: string): Array<Ability> => {
  const html = cheerio.load(text);
  // Find the specific table by its class or ID
  const span = html("#Abilities");
  const h2 = span.closest("h2");
  const table = h2.next("table");
  const tables: string[] = [];
  table.find("table.wikitable").each((index: number, element: Element) => {
    tables.push(html(element).html() || "");
  });
  const abilities: Array<Ability> = [];
  abilities.push(getAbility(god, tables[0]));
  abilities.push(getAbility(god, tables[1]));
  abilities.push(getAbility(god, tables[2]));
  abilities.push(getAbility(god, tables[3]));
  abilities.push(getAbility(god, tables[4]));
  return abilities;
};

const getAbility = (god: God, table: string): Ability => {
  const html = cheerio.load(table);
  let name: string = html("span").first().next("span").html() || "";
  let image: string = html("a").first().attr("href") || "";
  image = image.substring(0, image.indexOf(".png") + 4);
  let abilityPosition: string =
    html("span").first().html()?.replace(" -", "") || "";
  let abilityType: string = "";
  html("body")
    .contents()
    .each(function () {
      if (
        this.nodeType === 3 &&
        this.nodeValue &&
        this.nodeValue.includes("Ability Type")
      ) {
        abilityType = this.nodeValue.trim().split(": ")[1];
        return false; // Exit the loop once the text is found
      }
    });

  const ability: Ability = {
    name: name,
    image: image,
    abilityPosition: abilityPosition,
    abilityType: abilityType,
    god: god,
  };
  return ability;
};
export default getAbilityList;
