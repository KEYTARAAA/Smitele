import "../styles/HomePage.css";
function HomePage() {
  return (
    <>
      <div className="layout">
        <a href="/god">
          <button>God of the Day</button>
        </a>
        <a href="/ability">
          <button>Ability of the Day</button>
        </a>
      </div>
    </>
  );
}
export default HomePage;
