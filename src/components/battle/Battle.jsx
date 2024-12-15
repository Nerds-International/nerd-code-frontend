import "./Battle.css";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { languageStore } from "../../store/language/LanguageStore";
import { webSocketStore } from "../../store/socket/WebSocketStore";

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
  const { socket } = webSocketStore;


  useEffect(() => {
    if (socket) {
      socket.on('opponentJoined', (data) => {
        console.log('Opponent joined:', data);
        setMatch(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/battle", { state: { battleId: data.battleId } })
        }, 2000);
      });
    }
  }, [socket, navigate]);

  async function findMatch() {
    setLoading(true);
    try {
      // openNewWebSocket();
      const response = await fetch("http://localhost:3000/battles/getKeys");
      const data = await response.text();
      const battleId = data;
      joinBattle(battleId);
    } catch (error) {
      console.error("Error fetching match data:", error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setMatch(false);
    }
  }

  function joinBattle(battleId) {
    if (socket) {
      socket.emit('joinBattle', battleId);
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
