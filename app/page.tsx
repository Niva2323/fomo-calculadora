"use client";

import Link from "next/link";
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
  dataActions: string;
  importData: string;
  exportXls: string;
  exportCsv: string;
  importSuccess: string;
  importError: string;
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
    addPlayer: "Añadir fila",
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
    dataActions: "Datos",
    importData: "Importar",
    exportXls: "Exportar XLS",
    exportCsv: "Exportar CSV",
    importSuccess: "Datos importados correctamente",
    importError: "No se pudo leer el archivo. Usa un XLS o CSV exportado desde esta herramienta.",
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
    addPlayer: "Add row",
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
    dataActions: "Data",
    importData: "Import",
    exportXls: "Export XLS",
    exportCsv: "Export CSV",
    importSuccess: "Data imported successfully",
    importError: "Could not read the file. Use an XLS or CSV exported from this tool.",
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
    addPlayer: "Добавить строку",
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
    dataActions: "Данные",
    importData: "Импорт",
    exportXls: "Экспорт XLS",
    exportCsv: "Экспорт CSV",
    importSuccess: "Данные успешно импортированы",
    importError: "Не удалось прочитать файл. Используйте XLS или CSV из этого инструмента.",
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

const exportSections = ["clans", "battle", "general", "consolidated", "tactical"] as const;
type ExportSection = (typeof exportSections)[number];

type ExportRows = (string | number)[][];

function getSectionTitle(section: ExportSection, labels: Labels) {
  const sectionLabels: Record<ExportSection, string> = {
    clans: labels.clanName,
    battle: labels.battleOrder,
    general: labels.generalData,
    consolidated: labels.consolidatedData,
    tactical: labels.tacticalReading,
  };
  return sectionLabels[section];
}

function getSectionRows(rows: unknown[][], section: ExportSection) {
  const knownTitles = Object.values(translations).map((labels) => getSectionTitle(section, labels));
  const sectionIndex = rows.findIndex((row) => knownTitles.includes(cellText(row[0])));
  if (sectionIndex < 0) {
    return [];
  }

  const headerIndex = sectionIndex + 1;
  const dataRows: unknown[][] = [];
  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const row = rows[index];
    if (!row || row.every((cell) => cell === undefined || cell === null || cell === "")) {
      break;
    }
    dataRows.push(row);
  }
  return dataRows;
}

function cellText(value: unknown) {
  return value === undefined || value === null ? "" : String(value);
}

function downloadFile(filename: string, content: BlobPart, mimeType: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

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
    const id = Math.max(nextPlayerId.current, ...players.map((player) => player.id + 1));
    nextPlayerId.current = id + 1;
    onPlayersChange([
      ...players,
      { id, powerByRace: { Demonios: "", Humanos: "", Elfos: "" } },
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
          <span><span className="table-kicker">{labels.battleOrder}</span><strong>{Object.values(stats.counts).reduce((total, count) => total + count, 0)} {labels.playersLabel}</strong></span>
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
  const [dataMessage, setDataMessage] = useState("");
  const importInputRef = useRef<HTMLInputElement>(null);

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

  const createExportTables = (): Record<ExportSection, ExportRows> => {
    const clanRows = [
      [labels.yourClan, userName],
      [labels.enemyClan, enemyName],
    ];
    const battleRows = [
      ...userPlayers.map((player, index) => [labels.yourClan, index + 1, ...races.map((race) => Number(player.powerByRace[race]) || 0)]),
      ...enemyPlayers.map((player, index) => [labels.enemyClan, index + 1, ...races.map((race) => Number(player.powerByRace[race]) || 0)]),
    ];
    const statsByClan: [string, ClanStats][] = [
      [labels.yourClan, userStats],
      [labels.enemyClan, enemyStats],
    ];
    const generalRows = statsByClan.map(([clan, stats]) => [
        clan,
        stats.players,
        stats.strength,
        stats.attack,
        stats.defense,
        stats.attackPercent,
        ...races.map((race) => stats.counts[race]),
        stats.power,
      ]);
    const consolidatedRows = statsByClan.flatMap(([clan, stats]) => races.map((race) => [
        clan,
        getRaceName(race, language),
        stats.powerByRace[race],
        stats.troopsByRace[race],
        stats.attackByRace[race],
        stats.defenseByRace[race],
      ]));
    const tacticalRows = [
      [labels.attackPhase, userName, enemyName, userStats.attack, enemyStats.defense, userStats.attack > enemyStats.defense ? labels.attackVictory : labels.attackDefeat],
      [labels.defensePhase, userName, enemyName, userStats.defense, enemyStats.attack, userStats.defense > enemyStats.attack ? labels.defenseVictory : labels.defenseDefeat],
    ];

    return {
      clans: [[getSectionTitle("clans", labels)], [labels.clanName, "Nombre"], ...clanRows],
      battle: [[getSectionTitle("battle", labels)], [labels.clanName, "#", ...races.map((race) => getRaceName(race, language))], ...battleRows],
      general: [[getSectionTitle("general", labels)], [labels.clanName, labels.playersStat, labels.strengthStat, labels.attackStat, labels.defenseStat, labels.attackPercentStat, ...races.map((race) => getRaceName(race, language)), labels.powerStat], ...generalRows],
      consolidated: [[getSectionTitle("consolidated", labels)], [labels.clanName, labels.raceLabel, labels.powerStat, labels.troopsStat, labels.attackStat, labels.defenseStat], ...consolidatedRows],
      tactical: [[getSectionTitle("tactical", labels)], [labels.tacticalReading, labels.yourClan, labels.enemyClan, labels.attackStat, labels.defenseStat, labels.matchupForecast], ...tacticalRows],
    };
  };

  const exportXls = async () => {
    const XLSX = await import("xlsx-js-style");
    const pairedRows = (leftRows: ExportRows, rightRows: ExportRows) => {
      const rowCount = Math.max(leftRows.length, rightRows.length);
      return Array.from({ length: rowCount }, (_, index) => [
        ...(leftRows[index] ?? []),
        ...Array.from({ length: 10 - (leftRows[index]?.length ?? 0) }, () => ""),
        ...(rightRows[index] ?? []),
      ]);
    };
    const generalRows = (stats: ClanStats): ExportRows => [
      [
        labels.playersStat,
        labels.strengthStat,
        labels.attackStat,
        labels.defenseStat,
        labels.attackPercentStat,
      ],
      [
        stats.players,
        stats.strength,
        stats.attack,
        stats.defense,
        stats.attackPercent,
      ],
      [
        "",
        ...races.map((race) => getRaceName(race, language)),
        labels.powerStat,
      ],
      [
        "",
        ...races.map((race) => stats.counts[race]),
        stats.power,
      ],
    ];
    const consolidatedRows = (stats: ClanStats): ExportRows => [
      [labels.raceLabel, labels.powerStat, labels.troopsStat, labels.attackStat, labels.defenseStat],
      ...races.map((race) => [
        getRaceName(race, language),
        stats.powerByRace[race],
        stats.troopsByRace[race],
        stats.attackByRace[race],
        stats.defenseByRace[race],
      ]),
    ];
    const rows: ExportRows = [];
    const sectionTitleRows: { row: number; rightStart: number; width: number }[] = [];
    const columnHeaderRows: number[] = [];
    const mergeRanges: { s: { r: number; c: number }; e: { r: number; c: number } }[] = [];
    const addPairedSection = (
      title: string,
      leftRows: ExportRows,
      rightRows: ExportRows,
      rightStart: number,
      width: number,
    ) => {
      const titleRow = rows.length;
      const titleCells = Array.from({ length: rightStart + width }, () => "");
      titleCells[0] = title;
      titleCells[rightStart] = title;
      rows.push(titleCells);
      sectionTitleRows.push({ row: titleRow, rightStart, width });
      mergeRanges.push(
        { s: { r: titleRow, c: 0 }, e: { r: titleRow, c: width - 1 } },
        { s: { r: titleRow, c: rightStart }, e: { r: titleRow, c: rightStart + width - 1 } },
      );

      columnHeaderRows.push(rows.length);
      rows.push(...pairedRows(leftRows, rightRows));
      rows.push([]);
    };
    const heading = Array.from({ length: 19 }, () => "");
    heading[0] = labels.offensive;
    heading[10] = labels.defensive;
    const clanNames = Array.from({ length: 19 }, () => "");
    clanNames[0] = labels.yourClan;
    clanNames[1] = userName;
    clanNames[10] = labels.enemyClan;
    clanNames[11] = enemyName;
    rows.push(heading, clanNames);
    mergeRanges.push(
      { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
      { s: { r: 0, c: 10 }, e: { r: 0, c: 18 } },
    );

    addPairedSection(
      getSectionTitle("battle", labels),
      [
        [labels.clanName, "#", ...races.map((race) => getRaceName(race, language))],
        ...userPlayers.map((player, index) => [
          labels.yourClan,
          index + 1,
          ...races.map((race) => Number(player.powerByRace[race]) || 0),
        ]),
      ],
      [
        [labels.clanName, "#", ...races.map((race) => getRaceName(race, language))],
        ...enemyPlayers.map((player, index) => [
          labels.enemyClan,
          index + 1,
          ...races.map((race) => Number(player.powerByRace[race]) || 0),
        ]),
      ],
      10,
      9,
    );
    addPairedSection(getSectionTitle("general", labels), generalRows(userStats), generalRows(enemyStats), 10, 9);
    addPairedSection(getSectionTitle("consolidated", labels), consolidatedRows(userStats), consolidatedRows(enemyStats), 10, 9);

    const tacticalTitleRow = rows.length;
    rows.push([getSectionTitle("tactical", labels)]);
    mergeRanges.push({ s: { r: tacticalTitleRow, c: 0 }, e: { r: tacticalTitleRow, c: 5 } });
    columnHeaderRows.push(rows.length);
    rows.push(
      [labels.tacticalReading, labels.offensive, labels.attackStat, labels.defensive, labels.defenseStat, labels.matchupForecast],
      [labels.attackPhase, userName, userStats.attack, enemyName, enemyStats.defense, userStats.attack > enemyStats.defense ? labels.attackVictory : labels.attackDefeat],
      [labels.defensePhase, userName, userStats.defense, enemyName, enemyStats.attack, userStats.defense > enemyStats.attack ? labels.defenseVictory : labels.defenseDefeat],
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet["!cols"] = Array.from({ length: 19 }, (_, column) => ({
      wch: column === 9 ? 3 : column === 0 || column === 10 ? 20 : column < 9 ? 13 : 14,
    }));
    worksheet["!merges"] = mergeRanges;
    const colors = {
      ink: "18211F",
      muted: "73817C",
      paper: "F2EFE8",
      panel: "FBFAF7",
      line: "D9D8D0",
      orange: "E7773B",
      red: "B81F14",
      blue: "1869A3",
      green: "04AC4A",
    };
    const setCellStyle = (row: number, column: number, style: Record<string, unknown>) => {
      const address = XLSX.utils.encode_cell({ r: row, c: column });
      if (worksheet[address]) {
        worksheet[address].s = style;
      }
    };
    const setRangeStyle = (row: number, start: number, end: number, style: Record<string, unknown>) => {
      for (let column = start; column <= end; column += 1) {
        setCellStyle(row, column, style);
      }
    };
    const sectionStyle = {
      font: { bold: true, color: { rgb: colors.muted } },
      border: { bottom: { style: "thin", color: { rgb: colors.line } } },
    };
    const headerStyle = {
      fill: { patternType: "solid", fgColor: { rgb: colors.paper } },
      font: { bold: true, color: { rgb: colors.muted } },
      alignment: { vertical: "center", wrapText: true },
      border: { bottom: { style: "thin", color: { rgb: colors.line } } },
    };
    const valueStyle = (color: string) => ({ font: { color: { rgb: color }, bold: true } });

    setRangeStyle(0, 0, 8, {
      fill: { patternType: "solid", fgColor: { rgb: colors.paper } },
      font: { bold: true, color: { rgb: colors.orange } },
    });
    setRangeStyle(0, 10, 18, {
      fill: { patternType: "solid", fgColor: { rgb: colors.paper } },
      font: { bold: true, color: { rgb: colors.orange } },
    });
    [0, 10].forEach((column) => setCellStyle(1, column, { font: { bold: true, color: { rgb: colors.ink } } }));
    [1, 11].forEach((column) => setCellStyle(1, column, { font: { color: { rgb: colors.ink } } }));
    sectionTitleRows.forEach(({ row, rightStart, width }) => {
      setRangeStyle(row, 0, width - 1, sectionStyle);
      setRangeStyle(row, rightStart, rightStart + width - 1, sectionStyle);
    });
    setRangeStyle(tacticalTitleRow, 0, 5, sectionStyle);
    columnHeaderRows.forEach((row) => {
      const section = sectionTitleRows.find((item) => item.row + 1 === row);
      if (section) {
        setRangeStyle(row, 0, section.width - 1, headerStyle);
        setRangeStyle(row, section.rightStart, section.rightStart + section.width - 1, headerStyle);
      } else {
        setRangeStyle(row, 0, 5, headerStyle);
      }
    });

    const battleDataStart = columnHeaderRows[0] + 1;
    const battleDataEnd = battleDataStart + Math.max(userPlayers.length, enemyPlayers.length);
    for (let row = battleDataStart; row < battleDataEnd; row += 1) {
      [2, 12].forEach((column) => setCellStyle(row, column, valueStyle(colors.red)));
      [3, 13].forEach((column) => setCellStyle(row, column, valueStyle(colors.blue)));
      [4, 14].forEach((column) => setCellStyle(row, column, valueStyle(colors.green)));
    }

    const generalHeaderRow = columnHeaderRows[1];
    const generalValueRow = generalHeaderRow + 1;
    const raceHeaderRow = generalHeaderRow + 2;
    const raceValueRow = generalHeaderRow + 3;
    [1, 11].forEach((column) => setCellStyle(generalValueRow, column, valueStyle(colors.orange)));
    [2, 12].forEach((column) => setCellStyle(generalValueRow, column, valueStyle(colors.red)));
    [3, 13].forEach((column) => setCellStyle(generalValueRow, column, valueStyle(colors.blue)));
    [4, 14].forEach((column) => setCellStyle(generalValueRow, column, valueStyle(colors.green)));
    setRangeStyle(raceHeaderRow, 1, 4, headerStyle);
    setRangeStyle(raceHeaderRow, 11, 14, headerStyle);
    [[1, colors.red], [2, colors.blue], [3, colors.green], [4, colors.orange], [11, colors.red], [12, colors.blue], [13, colors.green], [14, colors.orange]]
      .forEach(([column, color]) => setCellStyle(raceValueRow, Number(column), valueStyle(String(color))));

    const consolidatedHeaderRow = columnHeaderRows[2];
    [consolidatedHeaderRow + 1, consolidatedHeaderRow + 2, consolidatedHeaderRow + 3].forEach((row, index) => {
      const raceColor = [colors.red, colors.blue, colors.green][index];
      setCellStyle(row, 0, valueStyle(raceColor));
      setCellStyle(row, 10, valueStyle(raceColor));
    });

    rows.slice(tacticalTitleRow + 2).forEach((row, index) => {
      const outcome = String(row[5] ?? "");
      const color = outcome === labels.attackVictory || outcome === labels.defenseVictory ? colors.green : colors.red;
      setCellStyle(tacticalTitleRow + 2 + index, 5, valueStyle(color));
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Comparativa");
    const file = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    downloadFile("fomo-war-room.xlsx", file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  };

  const exportCsv = () => {
    const tables = createExportTables();
    const csv = exportSections
      .flatMap((section) => [...tables[section], []])
      .map((row) => row.map((cell) => {
        const value = String(cell ?? "");
        return `"${value.replaceAll('"', '""')}"`;
      }).join(";"))
      .join("\r\n");
    downloadFile("fomo-war-room.csv", `\uFEFF${csv}`, "text/csv;charset=utf-8");
  };

  const importFile = async (file?: File) => {
    if (!file) {
      return;
    }

    try {
      const XLSX = await import("xlsx");
      const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const allRows = workbook.SheetNames.flatMap((sheetName) => [
        ...XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[sheetName], { header: 1, raw: true }),
        [],
      ]);
      const clanRows = getSectionRows(allRows, "clans");
      const battleRows = getSectionRows(allRows, "battle");
      const names = new Map<string, string>();
      Object.values(translations).forEach((knownLabels) => {
        names.set(knownLabels.yourClan, "user");
        names.set(knownLabels.enemyClan, "enemy");
      });

      let importedUserName = "";
      let importedEnemyName = "";
      allRows.slice(0, 3).forEach((row) => {
        for (let column = 0; column < row.length - 1; column += 1) {
          if (names.get(cellText(row[column])) === "user") importedUserName ||= cellText(row[column + 1]);
          if (names.get(cellText(row[column])) === "enemy") importedEnemyName ||= cellText(row[column + 1]);
        }
      });

      if (!importedUserName || !importedEnemyName) {
        clanRows.forEach((row) => {
          if (names.get(cellText(row[0])) === "user") importedUserName ||= cellText(row[1]);
          if (names.get(cellText(row[0])) === "enemy") importedEnemyName ||= cellText(row[1]);
        });
      }

      const importedPlayers: Record<"user" | "enemy", Player[]> = { user: [], enemy: [] };
      battleRows.forEach((row, index) => {
        const sideColumns = [
          { sideColumn: 0, powerColumn: 2 },
          { sideColumn: 10, powerColumn: 12 },
        ];
        sideColumns.forEach(({ sideColumn, powerColumn }) => {
          const side = names.get(cellText(row[sideColumn]));
          if (side !== "user" && side !== "enemy") return;
          const powerByRace = Object.fromEntries(races.map((race, raceIndex) => {
            const value = row[raceIndex + powerColumn];
            return [race, value === undefined || value === null || value === "" ? "" : cellText(value).replace(",", ".")];
          })) as Record<Race, string>;
          importedPlayers[side].push({ id: index + 1, powerByRace });
        });
      });

      if (!importedUserName || !importedEnemyName || !importedPlayers.user.length || !importedPlayers.enemy.length) {
        throw new Error("Missing clan or battle-order data");
      }

      setUserName(importedUserName);
      setEnemyName(importedEnemyName);
      setUserPlayers(importedPlayers.user);
      setEnemyPlayers(importedPlayers.enemy);
      setDataMessage(labels.importSuccess);
    } catch {
      setDataMessage(labels.importError);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">✦</span>
          <span>{labels.brand}</span>
        </div>

        <div className="topbar-tools">
          <div className="data-actions" aria-label={labels.dataActions}>
            <input
              ref={importInputRef}
              className="file-input-hidden"
              type="file"
              accept=".xls,.xlsx,.csv"
              onChange={(event) => {
                void importFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
            <button className="data-action-button" type="button" onClick={() => importInputRef.current?.click()}>{labels.importData}</button>
            <button className="data-action-button" type="button" onClick={() => void exportXls().catch(() => setDataMessage(labels.importError))}>{labels.exportXls}</button>
            <button className="data-action-button" type="button" onClick={exportCsv}>{labels.exportCsv}</button>
          </div>
          {dataMessage && <span className="data-message" role="status">{dataMessage}</span>}
          <Link className="account-link" href="/cuenta">Mi cuenta</Link>
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
