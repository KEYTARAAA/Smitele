import cheerio from "cheerio";
import God from "./Gods";
import Voiceline from "./Voiceline";

const getVoicelineList = (url: string, god: God): Promise<Array<Voiceline>> => {
  return new Promise<Array<Voiceline>>((resolve, reject) => {
    fetch("https://corsproxy.io/?" + encodeURIComponent(url))
      .then((res) => res.text())
      .then((res) => resolve(getVoicelineListFromHTML(god, res)))
      .catch((e) => reject(e));
  });
};

const getVoicelineListFromHTML = (god: God, text: string): Array<Voiceline> => {
  const html = cheerio.load(text);
  // Find the specific table by its class or ID
  const div = html("div.mw-parser-output");
  const sources = div.find("source");
  let voicelines: Array<Voiceline> = [];
  sources.map((_idx, audio) => {
    let vl = audio.attribs["src"];
    vl = vl.substring(0, vl.indexOf(".ogg") + 4);
    voicelines.push({ god: god, voiceline: vl });
  });
  voicelines = voicelines.slice(1);
  return voicelines;
};
export default getVoicelineList;
