import "./Battle.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { languageStore } from "../../store/language/LanguageStore";

const Battle = observer(() => {
  return (
    <div className="Battle">
      <MatchFinder />
    </div>
  );
});

const MatchFinder = observer(() => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const { Languages, getCurrentLanguage, setCurrentLanguage } = languageStore;
  const navigate = useNavigate();

  async function findMatch() {
    setLoading(true);

    try {
      // const response = await fetch("https://example.com/find-match");
      // const data = await response.json();

      if (getCurrentLanguage() === "javascript") {
        setTimeout(() => {
          setMatch(true);
        }, 1000);
        setTimeout(() => {
          setLoading(false);
          navigate("/battle"); // Redirect to BattleScreen with a 2-second delay
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setMatch(false);
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setMatch(false);
    }
  }

  return (
    <div className="match-finder">
      <div className="language-selector">
        <label htmlFor="language-select">Choose a programming language:</label>
        <select
          id="language-select"
          value={getCurrentLanguage()}
          onChange={(e) => setCurrentLanguage(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value={Languages.JAVASCRIPT}>JavaScript</option>
          <option value={Languages.PYTHON}>Python</option>
        </select>
        <div className="find-match">
          {!match && !loading && (
            <button className="find-match-button" onClick={findMatch}>
              Find Match
            </button>
          )}
          {!match && loading && (
            <div className="loading-container">
              <p className="loading">Looking for nerds...</p>
              <div className="loader"></div>
            </div>
          )}
          {match && loading && <h2>The nerd for the battle has been found</h2>}
          {match !== null && !loading && <h2>Nerds not found</h2>}
        </div>
      </div>
    </div>
  );
});

export default Battle;
