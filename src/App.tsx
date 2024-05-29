import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GodPage from "./pages/GodPage";
import AbilityPage from "./pages/AbilityPage";
import "./App.css";
import God from "./services/Gods";
import getGodsList from "./services/getGodsList";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

function App() {
  const url = "https://smite.fandom.com/wiki/List_of_gods";
  //"https://smite.fandom.com/api.php?action=query&prop=revisions&titles=List_of_gods&rvslots=*&rvprop=content&format=json&formatversion=2";

  const [gods, setGods] = useState<Array<God>>([]);

  const getGods = () => {
    getGodsList(url).then((res) => setGods(res));
  };

  useEffect(() => getGods(), []);

  if (gods.length < 1) {
    return;
  }
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/god" element={<GodPage gods={gods} />}></Route>
          <Route path="/ability" element={<AbilityPage gods={gods} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
