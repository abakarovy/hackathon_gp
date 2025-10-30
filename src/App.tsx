import React from 'react';

const sidebarLinks = [
  { icon: '🏠', label: 'Главная — Кеуга пглов', active: true },
  { icon: '📊', label: 'Сравнениe' },
  { icon: '🔔', label: 'Подписки' },
  { icon: '📧', label: 'Подoиски' },
  { icon: '⚙️', label: 'Админ панель' },
];

const ports = [
  { name: 'Баку', x: '30%', y: '24%' },
  { name: 'Атырау', x: '57%', y: '33%' },
  { name: 'Актау', x: '40%', y: '53%' },
  { name: 'Максаскка', x: '24%', y: '73%' },
  { name: 'Туркменбаши', x: '80%', y: '69%' },
];

const summaryRows = [
  ['🏠', 'Air', 'Air', 1, 4],
  ['🏠', 'Air', 'Incidents', 5, 5],
  ['🅲', 'CO₂', 'Инastweater', 8, 8],
  ['#', 'Incidents', 'Wastewater', 8, 152],
];

function Sidebar() {
  return (
    <aside className="w-64 bg-[#212529] rounded-l-2xl px-6 py-8 flex flex-col gap-6 min-h-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-white text-lg">CG</div>
        <div className="leading-tight">
          <div className="font-bold text-white text-sm">CASPIAN</div>
          <div className="text-green-400 text-xs font-semibold">GREEN PORTS</div>
        </div>
      </div>
      <input
        placeholder="Search"
        className="w-full bg-[#283138] text-gray-200 py-2 px-3 rounded mb-4 text-sm outline-none placeholder:text-gray-400"
      />
      <nav className="flex flex-col gap-3">
        {sidebarLinks.map((l, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-sm font-medium ${l.active ? "bg-green-500/80 text-white" : "text-gray-300 hover:bg-[#222c2e]/50"}`}>
            <span>{l.icon}</span> <span>{l.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function MainMap() {
  return (
    <div className="flex-1 bg-[#25362a] rounded-2xl p-4 flex flex-col min-h-[340px]">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-green-500/70 text-white text-xs rounded-xl px-3 py-1 font-medium">Зеленые порты</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white">Данные порты</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
      {/* Fake SVG map area */}
      <div className="flex-1 relative bg-[#2b5036] rounded-xl p-2 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 100 60" className="w-full h-60 max-w-3xl">
          <rect x="0" y="0" width="100" height="60" fill="#31663e" />
          {/* Border lines */}
          <path d="M5,35 C20,20 40,20 55,30 C70,40 85,35 95,30" stroke="#223" strokeWidth="0.8" fill="#071" opacity="0.09" />
          {ports.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={3.3} fill="#38e89c" />
              <text x={p.x} y={`calc(${p.y} + 7%)`} fontSize={4} fill="white">{p.name}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="bg-[#212529] rounded-2xl p-6 flex flex-col gap-3 text-white items-center w-72">
      <div className="w-28 h-28 rounded-full bg-green-200 flex items-center justify-center mb-3">
        <span className="text-5xl font-bold text-green-700">92</span>
      </div>
      <div className="mb-2 mt-1 text-center">
        <div className="font-bold text-xl text-green-400">Green Score</div>
        <div className="text-xs text-gray-400 mt-1 leading-tight">Sowr magret casitone tiehrarne moreryl esik thsmre por tounenls</div>
      </div>
      <div className="flex justify-between items-center w-full text-xs text-gray-400 mt-2 mb-2 gap-2">
        <div>
          <div>CO₂</div>
          <div>1,7/2евим</div>
        </div>
        <div>
          <div>22%</div>
          <div>7.9</div>
        </div>
      </div>
      <button className="w-full mt-4 mb-1 py-2 rounded-xl bg-green-500 font-semibold text-base text-white hover:bg-green-600 transition">Павзросе в пвгте</button>
    </div>
  );
}

function SummaryTable() {
  return (
    <div className="bg-[#212529] rounded-2xl p-4 mt-2 text-white w-full">
      <div className="mb-2 text-lg font-semibold">Сводка порта</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2 text-left">Дата</th>
            <th className="text-left">Метурга</th>
            <th className="text-left">Знвнно</th>
            <th className="text-left">Источник (PDF)</th>
          </tr>
        </thead>
        <tbody>
          {summaryRows.map((row, i) => (
            <tr key={i} className="border-b border-[#31383f] last:border-none">
              <td className="py-2">{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]} / {row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title }: { title: string }) {
  return (
    <div className="bg-[#212529] rounded-2xl px-4 py-3 text-white h-44 flex flex-col gap-2 w-full">
      <div className="text-sm font-semibold mb-1">{title}</div>
      <div className="flex-1 flex items-center justify-center">
        <svg height="60" width="160">
          <polyline fill="none" stroke="#38e89c" strokeWidth="3" points="0,50 30,30 60,30 120,40 150,20 160,35" />
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex bg-[#181c1e] min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col gap-5 p-7 bg-[#181c1e]">
        <div className="flex gap-5 w-full">
          <MainMap />
          <div className="flex flex-col gap-5 min-w-[290px]">
            <StatsCard />
          </div>
        </div>
        <div className="flex gap-5 mt-2 w-full">
          <SummaryTable />
          <div className="flex flex-col gap-4 min-w-[260px]">
            <Card title="PM2.5 Levels" />
            <Card title="CO₂ Emissions" />
          </div>
        </div>
      </main>
    </div>
  );
}