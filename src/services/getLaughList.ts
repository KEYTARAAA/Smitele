import cheerio from "cheerio";
import God from "./Gods";
import Voiceline from "./Voiceline";

const getLaughList = (url: string, god: God): Promise<Array<Voiceline>> => {
  return new Promise<Array<Voiceline>>((resolve, reject) => {
    fetch("https://corsproxy.io/?" + encodeURIComponent(url))
      .then((res) => res.text())
      .then((res) => resolve(getLaughListFromHTML(god, res)))
      .catch((e) => reject(e));
  });
};

const getLaughListFromHTML = (god: God, text: string): Array<Voiceline> => {
  const html = cheerio.load(text);
  // Find the specific table by its class or ID
  const spanElement = html("#Laughs");
  const h2Element = spanElement.closest("h2");
  const ulElement = h2Element.next("ul");
  const sources = ulElement.find("source");
  let laughs: Array<Voiceline> = [];
  sources.map((_idx, audio) => {
    let jk = audio.attribs["src"];
    jk = jk.substring(0, jk.indexOf(".ogg") + 4);
    laughs.push({ god: god, voiceline: jk });
  });
  laughs = laughs.slice(1);
  return laughs;
};
export default getLaughList;
