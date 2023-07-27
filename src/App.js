import "./App.css";
import { useState } from "react";

function App() {
  const [pojamPretrazivanja, setPojamPretrazivanja] = useState("");
  const [podaci, setPodaci] = useState(null);

  const getData = (search) => {
    if (search !== "") {
      fetch(`https://itunes.apple.com/search?term=${search}&entity=song`)
        .then((response) => response.json())
        .then((data) => {
          setPodaci(data);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pojamPretrazivanja) {
      getData(pojamPretrazivanja);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pojamPretrazivanja}
          onChange={(e) => setPojamPretrazivanja(e.target.value)}
        />
        <button type="submit">Pretrazi</button>
      </form>
      <div></div>
      <div>
        {podaci && (
          <div>
            {podaci.results.map((podatak, index) => (
              <li key={index}>
                {podatak.artistName} - {podatak.trackName}
              </li>
            ))}
          </div>
        )}
        {podaci.resultCount === 0 && <p>Nema rezultata</p>}
      </div>
    </div>
  );
}

export default App;
