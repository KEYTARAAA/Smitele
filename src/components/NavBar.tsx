import { useLocation } from "react-router-dom";
import "../styles/NavBar.css";
function NavBar() {
  const page = useLocation().pathname.replace("/", "");
  return (
    <nav className="nav-bar">
      <a href="/">
        <img className="nav-bar-image" src="/images/smite.png"></img>
        <h3>Smitle</h3>
      </a>
      <ul>
        <li className={page == "god" ? "active" : ""}>
          <a href="/god">God</a>
        </li>
        <li className={page == "ability" ? "active" : ""}>
          <a href="/ability">Ability</a>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;