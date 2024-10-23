import "./Battle.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useProgrammingLanguage } from "../../context/ProgrammingLanguageContext";

const Battle = observer(() => {
  return (
    <div className="Battle">
      <MatchFinder />
    </div>
  );
});

export default Battle;

function MatchFinder() {
  const [match, setMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const { language, setLanguage } = useProgrammingLanguage();

  async function findMatch() {
    setLoading(true);

    try {
      const response = await fetch("https://example.com/find-match");
      const data = await response.json();

      if (data.found) {
        setMatch(true);
      } else {
        setMatch(false);
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
      setMatch(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>} {/*индикатор загрузки*/}
      <div>
        <label htmlFor="language-select">Choose a programming language:</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      {match ? (
        <div>match found{/*матч нашелся ура ура*/}</div>
      ) : (
        <div>
          <h2>No Match Found</h2>
          <button onClick={findMatch}>Find Match</button>
        </div>
      )}
    </div>
  );
}
