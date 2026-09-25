"use client";

import { useEffect, useRef, useState } from "react";

type Race = "Demonios" | "Humanos" | "Elfos";
type Language = "es" | "en" | "ru";

type Player = {
  id: number;
  powerByRace: Record<Race, string>;
};

type ClanStats = {
  players: number;
  power: number;
  strength: number;
  counts: Record<Race, number>;
  powerByRace: Record<Race, number>;
  troopsByRace: Record<Race, number>;
  attackByRace: Record<Race, number>;
  defenseByRace: Record<Race, number>;
  attack: number;
  defense: number;
  attackPercent: number;
};

type Labels = {
  brand: string;
  live: string;
  season: string;
  heroTitle: string;
  heroTitleStrong: string;
  heroSubtitle: string;
  languageLabel: string;
  languageOptions: Record<Language, { label: string; flag: string }>;
  yourClan: string;
  enemyClan: string;
  offensive: string;
  defensive: string;
  clanName: string;
  clanNamePlaceholder: string;
  battleOrder: string;
  playersLabel: string;
  addPlayer: string;
  playerPower: string;
  raceLabel: string;
  removePlayer: string;
  generalData: string;
  consolidatedData: string;
  playersStat: string;
  strengthStat: string;
  attackStat: string;
  defenseStat: string;
  attackPercentStat: string;
  powerStat: string;
  troopsStat: string;
  tacticalReading: string;
  matchupForecast: string;
  attackPhase: string;
  defensePhase: string;
  attackVictory: string;
  attackDefeat: string;
  defenseVictory: string;
  defenseDefeat: string;
  metricsFooter: string;
  formulaUpdate: string;
  raceNames: Record<Race, string>;
  defaultClanNames: {
    user: string;
    enemy: string;
  };
};

const races: Race[] = ["Demonios", "Humanos", "Elfos"];
const localeMap: Record<Language, string> = {
  es: "es-ES",
  en: "en-US",
  ru: "ru-RU",
};

const translations: Record<Language, Labels> = {
  es: {
    brand: "FOMO WAR ROOM",
    live: "Cálculo en vivo",
    season: "Planificador de clanes · Temporada 04",
    heroTitle: "Antes del choque,",
    heroTitleStrong: "conoce tu fuerza.",
    heroSubtitle: "Construye los ejércitos de ambos clanes y deja que los números hablen antes de entrar al campo de batalla.",
    languageLabel: "Idioma",
    languageOptions: {
      es: { label: "Español", flag: "🇪🇸" },
      en: { label: "English", flag: "🇬🇧" },
      ru: { label: "Русский", flag: "🇷🇺" },
    },
    yourClan: "Tu clan",
    enemyClan: "Clan enemigo",
    offensive: "OFENSIVA",
    defensive: "DEFENSIVA",
    clanName: "Nombre del clan",
    clanNamePlaceholder: "Escribe un nombre",
    battleOrder: "Orden de batalla",
    playersLabel: "jugadores",
    addPlayer: "Añadir jugador",
    playerPower: "Poder del jugador",
    raceLabel: "Raza",
    removePlayer: "Eliminar jugador",
    generalData: "Datos generales",
    consolidatedData: "Datos consolidados",
    playersStat: "Jugadores",
    strengthStat: "Fuerza",
    attackStat: "Ataque",
    defenseStat: "Defensa",
    attackPercentStat: "% Ataque",
    powerStat: "Poder",
    troopsStat: "Tropas",
    tacticalReading: "Lectura táctica",
    matchupForecast: "Pronóstico del enfrentamiento",
    attackPhase: "En ataque",
    defensePhase: "Al defender",
    attackVictory: "Victoria en el Ataque",
    attackDefeat: "Derrota en el Ataque",
    defenseVictory: "Victoria al Defender",
    defenseDefeat: "Derrota al Defender",
    metricsFooter: "FOMO WAR ROOM",
    formulaUpdate: "Las fórmulas se actualizan con cada cambio",
    raceNames: {
      Demonios: "Demonios",
      Humanos: "Humanos",
      Elfos: "Elfos",
    },
    defaultClanNames: {
      user: "Centinelas del Alba",
      enemy: "Legión del Vacío",
    },
  },
  en: {
    brand: "FOMO WAR ROOM",
    live: "Live calculation",
    season: "Clan planner · Season 04",
    heroTitle: "Before the clash,",
    heroTitleStrong: "know your strength.",
    heroSubtitle: "Build the armies of both clans and let the numbers speak before stepping onto the battlefield.",
    languageLabel: "Language",
    languageOptions: {
      es: { label: "Español", flag: "🇪🇸" },
      en: { label: "English", flag: "🇬🇧" },
      ru: { label: "Русский", flag: "🇷🇺" },
    },
    yourClan: "Your clan",
    enemyClan: "Enemy clan",
    offensive: "OFFENSE",
    defensive: "DEFENSE",
    clanName: "Clan name",
    clanNamePlaceholder: "Write a name",
    battleOrder: "Battle order",
    playersLabel: "players",
    addPlayer: "Add player",
    playerPower: "Player power",
    raceLabel: "Race",
    removePlayer: "Remove player",
    generalData: "General data",
    consolidatedData: "Consolidated data",
    playersStat: "Players",
    strengthStat: "Strength",
    attackStat: "Attack",
    defenseStat: "Defense",
    attackPercentStat: "Attack %",
    powerStat: "Power",
    troopsStat: "Troops",
    tacticalReading: "Tactical read",
    matchupForecast: "Battle forecast",
    attackPhase: "On offense",
    defensePhase: "When defending",
    attackVictory: "Attack victory",
    attackDefeat: "Attack defeat",
    defenseVictory: "Defense victory",
    defenseDefeat: "Defense defeat",
    metricsFooter: "FOMO WAR ROOM",
    formulaUpdate: "The formulas update with every change",
    raceNames: {
      Demonios: "Demons",
      Humanos: "Humans",
      Elfos: "Elves",
    },
    defaultClanNames: {
      user: "Dawn Sentinels",
      enemy: "Void Legion",
    },
  },
  ru: {
    brand: "FOMO WAR ROOM",
    live: "Живой расчёт",
    season: "Планировщик кланов · Сезон 04",
    heroTitle: "До столкновения,",
    heroTitleStrong: "узнай свою силу.",
    heroSubtitle: "Создайте армии обоих кланов и позвольте цифрам говорить до начала битвы.",
    languageLabel: "Язык",
    languageOptions: {
      es: { label: "Español", flag: "🇪🇸" },
      en: { label: "English", flag: "🇬🇧" },
      ru: { label: "Русский", flag: "🇷🇺" },
    },
    yourClan: "Ваш клан",
    enemyClan: "Вражеский клан",
    offensive: "НАПАДЕНИЕ",
    defensive: "ЗАЩИТА",
    clanName: "Название клана",
    clanNamePlaceholder: "Напишите имя",
    battleOrder: "Порядок боя",
    playersLabel: "игроков",
    addPlayer: "Добавить игрока",
    playerPower: "Сила игрока",
    raceLabel: "Раса",
    removePlayer: "Удалить игрока",
    generalData: "Общие данные",
    consolidatedData: "Сводные данные",
    playersStat: "Игроки",
    strengthStat: "Сила",
    attackStat: "Атака",
    defenseStat: "Защита",
    attackPercentStat: "% Атаки",
    powerStat: "Сила",
    troopsStat: "Войска",
    tacticalReading: "Тактическая оценка",
    matchupForecast: "Прогноз боя",
    attackPhase: "В нападении",
    defensePhase: "При защите",
    attackVictory: "Победа в атаке",
    attackDefeat: "Поражение в атаке",
    defenseVictory: "Победа в защите",
    defenseDefeat: "Поражение в защите",
    metricsFooter: "FOMO WAR ROOM",
    formulaUpdate: "Формулы обновляются при каждом изменении",
    raceNames: {
      Demonios: "Демоны",
      Humanos: "Люди",
      Elfos: "Эльфы",
    },
    defaultClanNames: {
      user: "Стражи Рассвета",
      enemy: "Легион Пустоты",
    },
  },
};

const initialPlayers = (id: number): Player[] => [
  { id, powerByRace: { Demonios: "", Humanos: "", Elfos: "" } },
];

const formatNumber = (value: number, digits = 0, language: Language = "es") =>
  new Intl.NumberFormat(localeMap[language], {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);

const getRaceName = (race: Race, language: Language) => translations[language].raceNames[race];

function calculateStats(players: Player[]): ClanStats {
  const powerByRace: Record<Race, number> = {
    Demonios: 0,
    Humanos: 0,
    Elfos: 0,
  };
  const counts: Record<Race, number> = {
    Demonios: 0,
    Humanos: 0,
    Elfos: 0,
  };

  players.forEach((player) => {
    races.forEach((race) => {
      const power = Number(player.powerByRace[race]) || 0;
      powerByRace[race] += Math.max(power, 0);
      if (power > 0) {
        counts[race] += 1;
      }
    });
  });

  const troopsByRace = {
    Demonios: powerByRace.Demonios / 2,
    Humanos: powerByRace.Humanos / 2,
    Elfos: powerByRace.Elfos / 3,
  };
  const attackByRace = {
    Demonios: troopsByRace.Demonios * 65,
    Humanos: troopsByRace.Humanos * 35,
    Elfos: troopsByRace.Elfos * 50,
  };
  const defenseByRace = {
    Demonios: troopsByRace.Demonios * 35,
    Humanos: troopsByRace.Humanos * 65,
    Elfos: troopsByRace.Elfos * 50,
  };
  const power = Object.values(powerByRace).reduce((sum, value) => sum + value, 0);
  const attackTotal = Object.values(attackByRace).reduce((sum, value) => sum + value, 0);
  const defenseTotal = Object.values(defenseByRace).reduce((sum, value) => sum + value, 0);
  const attack = (attackTotal / 3) * 0.81 * 1.1436;
  const defense = (defenseTotal / 3) * 0.75 * 1.1436;

  return {
    players: players.length,
    power,
    strength: Math.round(power + 100 + players.length * 0.0333),
    counts,
    powerByRace,
    troopsByRace,
    attackByRace,
    defenseByRace,
    attack,
    defense,
    attackPercent: defense > 0 ? (attack / defense) * 100 : 0,
  };
}

function StatValue({ label, value, accent = "" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="stat-value">
      <span>{label}</span>
      <strong className={accent}>{value}</strong>
    </div>
  );
}

function ClanPanel({
  title,
  eyebrow,
  clanName,
  players,
  onNameChange,
  onPlayersChange,
  labels,
  language,
}: {
  title: string;
  eyebrow: string;
  clanName: string;
  players: Player[];
  onNameChange: (name: string) => void;
  onPlayersChange: (players: Player[]) => void;
  labels: Labels;
  language: Language;
}) {
  const [isBattleOrderOpen, setIsBattleOrderOpen] = useState(true);
  const nextPlayerId = useRef(3);
  const stats = calculateStats(players);

  const addPlayer = () => {
    onPlayersChange([
      ...players,
      { id: nextPlayerId.current++, powerByRace: { Demonios: "", Humanos: "", Elfos: "" } },
    ]);
  };

  const updatePlayerPower = (id: number, race: Race, power: string) => {
    onPlayersChange(players.map((player) => (
      player.id === id
        ? { ...player, powerByRace: { ...player.powerByRace, [race]: power } }
        : player
    )));
  };

  const removePlayer = (id: number) => {
    if (players.length === 1) {
      onPlayersChange(initialPlayers(players[0].id));
      return;
    }
    onPlayersChange(players.filter((player) => player.id !== id));
  };

  return (
    <section className="clan-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <span className="panel-mark" aria-hidden="true">✦</span>
      </div>

      <label className="field-label" htmlFor={`${eyebrow}-name`}>{labels.clanName}</label>
      <input
        id={`${eyebrow}-name`}
        className="text-input"
        value={clanName}
        onChange={(event) => onNameChange(event.target.value)}
        placeholder={labels.clanNamePlaceholder}
      />

      <div className="table-heading">
        <button
          className="table-toggle"
          type="button"
          onClick={() => setIsBattleOrderOpen((isOpen) => !isOpen)}
          aria-expanded={isBattleOrderOpen}
          aria-controls={`${eyebrow}-players`}
        >
          <span><span className="table-kicker">{labels.battleOrder}</span><strong>{players.length} {labels.playersLabel}</strong></span>
          <span className={`toggle-chevron ${isBattleOrderOpen ? "is-open" : ""}`} aria-hidden="true">⌄</span>
        </button>
        {isBattleOrderOpen && <button className="add-button" type="button" onClick={addPlayer}>+ {labels.addPlayer}</button>}
      </div>
      <div className={`players-table-wrap ${isBattleOrderOpen ? "is-open" : "is-collapsed"}`} id={`${eyebrow}-players`}>
        <table className="players-table">
          <thead>
            <tr>
              <th>#</th>
              {races.map((race) => (
                <th key={race}>{getRaceName(race, language)}</th>
              ))}
              <th aria-label={labels.removePlayer} />
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id}>
                <td className="row-number">{String(index + 1).padStart(2, "0")}</td>
                {races.map((race) => (
                  <td key={race}>
                    <input
                      className={`power-input race-${race.toLowerCase()}`}
                      type="number"
                      min="0"
                      step="any"
                      value={player.powerByRace[race]}
                      onChange={(event) => updatePlayerPower(player.id, race, event.target.value)}
                      placeholder="0"
                      aria-label={`${getRaceName(race, language)} · ${labels.playerPower} ${index + 1}`}
                    />
                  </td>
                ))}
                <td>
                  <button className="remove-button" type="button" onClick={() => removePlayer(player.id)} aria-label={`${labels.removePlayer} ${index + 1}`}>
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats-section">
        <div className="section-label">{labels.generalData}</div>
        <div className="stats-grid">
          <StatValue label={labels.playersStat} value={formatNumber(stats.players, 0, language)} />
          <StatValue label={labels.strengthStat} value={formatNumber(stats.strength, 0, language)} accent="accent-orange" />
          <StatValue label={labels.attackStat} value={formatNumber(stats.attack, 1, language)} accent="accent-red" />
          <StatValue label={labels.defenseStat} value={formatNumber(stats.defense, 1, language)} accent="accent-blue" />
          <StatValue label={labels.attackPercentStat} value={`${formatNumber(stats.attackPercent, 1, language)}%`} accent="accent-green" />
        </div>
        <div className="race-counts">
          {races.map((race) => (
            <div className={`race-count race-${race.toLowerCase()}`} key={race}>
              <span>{getRaceName(race, language)}</span>
              <strong>{formatNumber(stats.counts[race], 0, language)}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section consolidated">
        <div className="section-label">{labels.consolidatedData}</div>
        {races.map((race) => (
          <div className="consolidated-row" key={race}>
            <span><i className={`dot dot-${race.toLowerCase()}`} />{getRaceName(race, language)}</span>
            <span>{labels.powerStat} <strong>{formatNumber(stats.powerByRace[race], 1, language)}</strong></span>
            <span>{labels.troopsStat} <strong>{formatNumber(stats.troopsByRace[race], 1, language)}</strong></span>
            <span>{labels.attackStat} <strong>{formatNumber(stats.attackByRace[race], 1, language)}</strong></span>
            <span>{labels.defenseStat} <strong>{formatNumber(stats.defenseByRace[race], 1, language)}</strong></span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Comparison({
  userStats,
  enemyStats,
  userName,
  enemyName,
  labels,
  language,
}: {
  userStats: ClanStats;
  enemyStats: ClanStats;
  userName: string;
  enemyName: string;
  labels: Labels;
  language: Language;
}) {
  const attackWon = userStats.attack > enemyStats.defense;
  const defenseWon = userStats.defense > enemyStats.attack;
  const comparisonBars = [
    { label: labels.attackStat, left: userStats.attack, right: enemyStats.defense, leftName: userName, rightName: `${enemyName} · ${labels.defenseStat}`, leftColor: "orange", rightColor: "red" },
    { label: labels.defenseStat, left: userStats.defense, right: enemyStats.attack, leftName: userName, rightName: `${enemyName} · ${labels.attackStat}`, leftColor: "blue", rightColor: "red" },
  ];

  return (
    <section className="result-section">
      <div className="result-heading">
        <div>
          <p className="eyebrow">{labels.tacticalReading}</p>
          <h2>{labels.matchupForecast}</h2>
        </div>
        <span className="vs-badge">VS</span>
      </div>
      <div className="verdict-grid">
        <div className={`verdict ${attackWon ? "win" : "loss"}`}>
          <span className="verdict-icon">{attackWon ? "↑" : "↓"}</span>
          <div>
            <small>{labels.attackPhase}</small>
            <strong>{attackWon ? labels.attackVictory : labels.attackDefeat}</strong>
          </div>
        </div>
        <div className={`verdict ${defenseWon ? "win" : "loss"}`}>
          <span className="verdict-icon">{defenseWon ? "◈" : "◇"}</span>
          <div>
            <small>{labels.defensePhase}</small>
            <strong>{defenseWon ? labels.defenseVictory : labels.defenseDefeat}</strong>
          </div>
        </div>
      </div>
      <div className="comparison-chart">
        {comparisonBars.map((bar) => {
          const max = Math.max(bar.left, bar.right, 1);
          return (
            <div className="bar-row" key={bar.label}>
              <div className="bar-label">
                <strong>{bar.label}</strong>
                <span>{formatNumber(bar.left, 1, language)} vs {formatNumber(bar.right, 1, language)}</span>
              </div>
              <div className="bar-track">
                <span className={`bar-fill ${bar.leftColor}`} style={{ width: `${(bar.left / max) * 100}%` }} />
                <span className={`bar-fill enemy ${bar.rightColor}`} style={{ width: `${(bar.right / max) * 100}%` }} />
              </div>
              <div className="bar-names">
                <span>{bar.leftName}</span>
                <span>{bar.rightName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [isMounted, setIsMounted] = useState(false);
  const labels = translations[language];
  const previousLanguageRef = useRef<Language>(language);
  const [userName, setUserName] = useState(labels.defaultClanNames.user);
  const [enemyName, setEnemyName] = useState(labels.defaultClanNames.enemy);
  const [userPlayers, setUserPlayers] = useState(() => initialPlayers(1));
  const [enemyPlayers, setEnemyPlayers] = useState(() => initialPlayers(2));

  useEffect(() => {
    const restoreLanguage = () => {
      const savedLanguage = localStorage.getItem("fomo-language");
      if (savedLanguage === "es" || savedLanguage === "en" || savedLanguage === "ru") {
        setLanguage(savedLanguage);
      }
      setIsMounted(true);
    };

    const timeoutId = window.setTimeout(restoreLanguage, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (userName === translations[previousLanguageRef.current].defaultClanNames.user) {
      setUserName(labels.defaultClanNames.user);
    }

    if (enemyName === translations[previousLanguageRef.current].defaultClanNames.enemy) {
      setEnemyName(labels.defaultClanNames.enemy);
    }

    previousLanguageRef.current = language;
  }, [language, isMounted, labels, userName, enemyName]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    localStorage.setItem("fomo-language", language);
    document.documentElement.lang = language;
  }, [language, isMounted]);

  const userStats = calculateStats(userPlayers);
  const enemyStats = calculateStats(enemyPlayers);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">✦</span>
          <span>{labels.brand}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <label htmlFor="language-select" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {labels.languageLabel}
          </label>

          <div
            id="language-select"
            style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "4px 8px", background: "rgba(0,0,0,0.15)" }}
          >
            {(Object.keys(labels.languageOptions) as Language[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-label={labels.languageOptions[option].label}
                title={labels.languageOptions[option].label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  border: "none",
                  borderRadius: 999,
                  background: language === option ? "#e7773b" : "transparent",
                  color: "#f3efe9",
                  cursor: "pointer",
                  padding: "6px 10px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <span aria-hidden="true">{labels.languageOptions[option].flag}</span>
                <span>{labels.languageOptions[option].label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{labels.season}</p>
          <h1>
            {labels.heroTitle}
            <br />
            <em>{labels.heroTitleStrong}</em>
          </h1>
          <p className="hero-copy">{labels.heroSubtitle}</p>
        </div>
        <div className="hero-seal">
          <span>WAR</span>
          <strong>ROOM</strong>
          <small>EST. 2026</small>
        </div>
      </section>

      <div className="battle-grid">
        <ClanPanel
          title={labels.yourClan}
          eyebrow={`01 · ${labels.offensive}`}
          clanName={userName}
          players={userPlayers}
          onNameChange={setUserName}
          onPlayersChange={setUserPlayers}
          labels={labels}
          language={language}
        />
        <ClanPanel
          title={labels.enemyClan}
          eyebrow={`02 · ${labels.defensive}`}
          clanName={enemyName}
          players={enemyPlayers}
          onNameChange={setEnemyName}
          onPlayersChange={setEnemyPlayers}
          labels={labels}
          language={language}
        />
      </div>

      <Comparison
        userStats={userStats}
        enemyStats={enemyStats}
        userName={userName || labels.yourClan}
        enemyName={enemyName || labels.enemyClan}
        labels={labels}
        language={language}
      />

      <footer>
        <span>{labels.metricsFooter}</span>
        <span>{labels.formulaUpdate}</span>
      </footer>
    </main>
  );
}
