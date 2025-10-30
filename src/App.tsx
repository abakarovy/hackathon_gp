import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Routes, Route, NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Auth from './loginPage';

const caspianBounds: [[number, number], [number, number]] = [
  [20, 40], // Southwest
  [52, 70]  // Northeast
];

// Choose a tileset: prefer MapTiler Outdoor (green land) when key present, otherwise fallback to Carto Dark
const MAPTILER_KEY = (import.meta as any).env?.VITE_MAPTILER_KEY as string | undefined;
const TILE_URL = MAPTILER_KEY
  ? `https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`
  : `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`;

// Demo series for charts
const co2Data = [
  { t: 't1', v: 30 },
  { t: 't2', v: 35 },
  { t: 't3', v: 50 },
  { t: 't4', v: 45 },
  { t: 't5', v: 65 },
  { t: 't6', v: 55 },
  { t: 't7', v: 72 },
  { t: 't8', v: 60 },
];

const tempData = [
  { t: 't1', v: 42 },
  { t: 't2', v: 58 },
  { t: 't3', v: 50 },
  { t: 't4', v: 62 },
  { t: 't5', v: 54 },
  { t: 't6', v: 66 },
  { t: 't7', v: 53 },
  { t: 't8', v: 64 },
];

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 h-20 bg-[#181c1e] rounded-2xl">
      {/* Logo left */}
      <div className="flex items-center gap-3">
        <img src="/applogo.png" alt="App logo" className="w-12 h-12 rounded-full object-cover" />
        <div className="leading-tight hidden sm:block select-none" style={{fontFamily: 'Nunito, Inter, Arial, sans-serif'}}>
          <div className="text-white text-lg font-light tracking-wide">CASPIAN</div>
          <div className="text-green-300 text-base font-normal tracking-wide"><sub>GREEN PORTS</sub></div>
        </div>
      </div>
      {/* Controls right */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#23282e] hover:bg-gray-700 text-gray-100 text-base font-medium transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <circle cx="11" cy="11" r="7" stroke="currentColor"/>
            <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeLinecap="round"/>
          </svg>
          Search
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const activeCls = 'bg-green-500 text-white font-semibold';
  const baseBtn = 'w-full flex justify-center items-center gap-3 py-3 text-gray-200 hover:bg-gray-700 font-medium cursor-pointer text-base rounded-full';
  return (
    <aside className="fixed left-0 top-29 z-20 w-64 ml-6 bg-[#212529] rounded-2xl pt-8 pb-6 min-h-[calc(100vh-8rem)] flex flex-col items-center gap-4 shadow-lg">
      <button className="flex items-center gap-3 w-full mb-1 focus:outline-none justify-center" onClick={() => navigate('/profile')}>
        <img
          src="./src/assets/blank-profile.png"
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-white text-lg font-medium">Иван Иванов</span>
      </button>
      <nav className="flex flex-col gap-2 w-full mt-2">
        <NavLink to="/" end className={({isActive}) => `${baseBtn} ${isActive ? activeCls : ''} rounded-none`}>
          Главная
        </NavLink>
        <NavLink to="/compare" className={({isActive}) => `${baseBtn} ${isActive ? activeCls : ''} rounded-none`}>
          Сравнение
        </NavLink>
        <NavLink to="/admin" className={({isActive}) => `${baseBtn} ${isActive ? activeCls : ''} rounded-none`}>
          Админ панель
        </NavLink>
      </nav>
    </aside>
  );
}

function Layout() {
  return (
    <div className="bg-[#181c1e] min-h-screen w-full">
      <Header />
      <Sidebar />
      <div className="flex w-full">
        <main className="flex-1 px-6 pt-30 pl-80">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="w-full flex items-start justify-center">
      <div className="bg-[#23282e] rounded-2xl p-8 shadow max-w-xl w-full">
        <div className="flex items-center gap-4">
          <img src="/blank-profile.png" alt="profile" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <div className="text-white text-xl font-semibold">Иван Иванов</div>
            <div className="text-gray-300">ivan@example.com</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-gray-300 text-sm">
          <div>
            <div className="text-gray-400">Роль</div>
            <div>Пользователь</div>
          </div>
          <div>
            <div className="text-gray-400">Организация</div>
            <div>Caspian Green Ports</div>
          </div>
          <div>
            <div className="text-gray-400">Язык</div>
            <div>Русский</div>
          </div>
          <div>
            <div className="text-gray-400">Уведомления</div>
            <div>Включены</div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Link to="/" className="text-green-400 hover:underline">Вернуться на главную</Link>
          <Link to="/login" className="px-4 py-2 rounded-md bg-[#05df72] hover:bg-[#05c766] text-white font-medium">Выйти</Link>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-4 w-full min-w-0 min-h-0">
        {/* Map column */}
        <div className="flex-[65_0_0%] min-w-[320px] flex-shrink-0">
          <div className="bg-[#23282e] rounded-xl h-[480px] flex items-center justify-center overflow-hidden">
            <MapContainer
              center={[41, 32]}
              zoom={5}
              minZoom={3}
              zoomControl={false}
              style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
              className="focus:outline-none"
              worldCopyJump={false}
              maxBounds={caspianBounds}
              maxBoundsViscosity={1.0}
            >
              <TileLayer
                url={TILE_URL}
                noWrap={true}
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> & <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
              />
              <Marker position={[42.99750, 47.49700]}>
                <Popup>
                  Махачкалинский порт
                </Popup>
              </Marker>
              <Marker position={[40.2343, 49.5256]}>
                <Popup>
                  Махачкалинский порт
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
        {/* Green Score column */}
        <div className="flex-[35_0_0%] min-w-[220px] flex-shrink-0 ml-4">
          <div className="bg-[#23282e] rounded-xl h-[480px] flex flex-col justify-center items-center p-5 overflow-hidden">
            <div className="relative mb-2">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-green-400 to-green-700 flex items-center justify-center mx-auto shadow-inner">
                <div className="w-32 h-32 rounded-full bg-[#23282e] flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-white">92</span>
                  <span className="text-green-700 mt-1 text-md font-medium">Green Score</span>
                </div>
              </div>
            </div>
            <div className="text-[#bdc9c5] text-[15px] font-normal mb-2 px-6 leading-tight">
            Комплексный индекс экологической устойчивости порта. Чем выше показатель — тем чище вода, воздух и ниже уровень выбросов.

            </div>
            <div className="flex justify-between w-full my-1 gap-2 text-[13px]">
              <div className="flex flex-col items-center flex-1">
                <span className="inline-block mb-1">
                  <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" stroke="#80FFBB" strokeWidth="2" fill="none"/><text x="4" y="13" fontSize="7" fill="#bdc9c5">CO₂</text></svg>
                </span>
                <span className="text-[#bdc9c5]">CO₂</span>
                <span className="text-xs text-gray-400">ph</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="inline-block mb-1">
                  <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" stroke="#80FFBB" strokeWidth="2" fill="none"/><text className='text-center' x="4" y="13" fontSize="7" fill="#bdc9c5">П</text></svg>
                </span>
                <span className="text-[#bdc9c5]">22%</span>
                <span className="text-xs text-gray-400">7.0</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 text-center rounded-full bg-green-400 hover:bg-green-500 text-white font-semibold text-lg transition">
              Сообщить о проблеме
            </button>
          </div>
        </div>
      </div>

      {/* Bottom section: Summary + Charts */}
      <div className="mt-10 w-full">
        <div className="flex flex-row gap-4 w-full min-w-0 min-h-0">
          {/* Table */}
          <div className="flex-[65_0_0%] min-w-[320px] flex-shrink-0">
            <div className="bg-[#23282e] rounded-xl p-6 shadow flex flex-col">
              <h2 className="text-xl text-white font-semibold mb-4">Сводка портов</h2>
              <table className="w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2">Дата</th>
                    <th>Метрика</th>
                    <th>Качество</th>
                    <th>Источник (PDF)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800 last:border-none">
                    <td className="py-3">2025-05-01</td>
                    <td>PM2.5</td>
                    <td>21 мкг/м3</td>
                    <td><a className="text-green-400 underline" href="#">report.pdf</a></td>
                  </tr>
                  <tr className="border-b border-gray-800 last:border-none">
                    <td className="py-3">2025-05-02</td>
                    <td>CO₂</td>
                    <td>6 мг/м3</td>
                    <td><a className="text-green-400 underline" href="#">report.pdf</a></td>
                  </tr>
                  <tr>
                    <td className="py-3">2025-05-03</td>
                    <td>Water PH</td>
                    <td>7.1</td>
                    <td><a className="text-green-400 underline" href="#">report.pdf</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Charts column */}
          <div className="flex-[35_0_0%] min-w-[220px] flex-shrink-0 ml-4">
            <div className="bg-[#23282e] rounded-xl p-4 mb-4">
              <div className="text-white font-semibold mb-3">Выбросы CO<sub>2</sub></div>
              <div className="w-full min-w-0">
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={co2Data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="co2Fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#62a074" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#62a074" stopOpacity={0.08} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#2f353b" strokeDasharray="3 3" />
                    <XAxis dataKey="t" tick={{ fill: '#9aa3ad', fontSize: 11 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                    <YAxis tick={{ fill: '#9aa3ad', fontSize: 11 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                    <Tooltip contentStyle={{ background: '#1f2429', border: '1px solid #2f353b', color: '#e5e7eb' }} />
                    <Area type="monotone" dataKey="v" stroke="none" fill="url(#co2Fill)" />
                    <Line type="monotone" dataKey="v" stroke="#62a074" strokeWidth={3} dot={{ r: 3, stroke: '#62a074', fill: '#62a074' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-[#23282e] rounded-xl p-4">
              <div className="text-white font-semibold mb-3">Показатели температуры</div>
              <div className="w-full min-w-0">
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={tempData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#62a074" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#62a074" stopOpacity={0.08} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#2f353b" strokeDasharray="3 3" />
                    <XAxis dataKey="t" tick={{ fill: '#9aa3ad', fontSize: 11 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                    <YAxis tick={{ fill: '#9aa3ad', fontSize: 11 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                    <Tooltip contentStyle={{ background: '#1f2429', border: '1px solid #2f353b', color: '#e5e7eb' }} />
                    <Area type="monotone" dataKey="v" stroke="none" fill="url(#tempFill)" />
                    <Line type="monotone" dataKey="v" stroke="#62a074" strokeWidth={3} dot={{ r: 3, stroke: '#62a074', fill: '#62a074' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparePage() {
  // Mock comparison datasets
  const co2A = co2Data; // series A
  const co2B = [
    { t: 't1', v: 26 },
    { t: 't2', v: 40 },
    { t: 't3', v: 46 },
    { t: 't4', v: 52 },
    { t: 't5', v: 58 },
    { t: 't6', v: 50 },
    { t: 't7', v: 68 },
    { t: 't8', v: 55 },
  ];

  const tempA = tempData;
  const tempB = [
    { t: 't1', v: 48 },
    { t: 't2', v: 60 },
    { t: 't3', v: 55 },
    { t: 't4', v: 65 },
    { t: 't5', v: 52 },
    { t: 't6', v: 62 },
    { t: 't7', v: 58 },
    { t: 't8', v: 67 },
  ];

  // Merge by key for Recharts multi-series
  const mergeByKey = (a: {t:string,v:number}[], b: {t:string,v:number}[]) => a.map((p, i) => ({ t: p.t, a: p.v, b: b[i]?.v ?? p.v }));
  const co2Merged = mergeByKey(co2A, co2B);
  const tempMerged = mergeByKey(tempA, tempB);

  return (
    <div className="w-full">
      <h1 className="text-white text-2xl font-semibold mb-4">Сравнение</h1>
      <div className="grid grid-cols-1 gap-6">
        {/* CO2 comparison */}
        <div className="bg-[#23282e] rounded-xl p-6">
          <div className="text-white font-semibold mb-1">Выбросы CO₂ — сравнение</div>
          <div className="text-gray-400 text-sm mb-4">Серия A (зелёный) vs Серия B (синий)</div>
          <div className="w-full min-w-0" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={co2Merged} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cmpA1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#62a074" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#62a074" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="cmpB1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5ea1d6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#5ea1d6" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#2f353b" strokeDasharray="3 3" />
                <XAxis dataKey="t" tick={{ fill: '#9aa3ad', fontSize: 12 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                <YAxis tick={{ fill: '#9aa3ad', fontSize: 12 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                <Tooltip contentStyle={{ background: '#1f2429', border: '1px solid #2f353b', color: '#e5e7eb' }} />
                <Area type="monotone" dataKey="a" name="Серия A" stroke="none" fill="url(#cmpA1)" />
                <Area type="monotone" dataKey="b" name="Серия B" stroke="none" fill="url(#cmpB1)" />
                <Line type="monotone" dataKey="a" stroke="#62a074" strokeWidth={3} dot={{ r: 3, stroke: '#62a074', fill: '#62a074' }} />
                <Line type="monotone" dataKey="b" stroke="#5ea1d6" strokeWidth={3} dot={{ r: 3, stroke: '#5ea1d6', fill: '#5ea1d6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature comparison */}
        <div className="bg-[#23282e] rounded-xl p-6">
          <div className="text-white font-semibold mb-1">Показатели температуры — сравнение</div>
          <div className="text-gray-400 text-sm mb-4">Серия A (зелёный) vs Серия B (синий)</div>
          <div className="w-full min-w-0" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tempMerged} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cmpA2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#62a074" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#62a074" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="cmpB2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5ea1d6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#5ea1d6" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#2f353b" strokeDasharray="3 3" />
                <XAxis dataKey="t" tick={{ fill: '#9aa3ad', fontSize: 12 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                <YAxis tick={{ fill: '#9aa3ad', fontSize: 12 }} axisLine={{ stroke: '#66707a' }} tickLine={{ stroke: '#66707a' }} />
                <Tooltip contentStyle={{ background: '#1f2429', border: '1px solid #2f353b', color: '#e5e7eb' }} />
                <Area type="monotone" dataKey="a" name="Серия A" stroke="none" fill="url(#cmpA2)" />
                <Area type="monotone" dataKey="b" name="Серия B" stroke="none" fill="url(#cmpB2)" />
                <Line type="monotone" dataKey="a" stroke="#62a074" strokeWidth={3} dot={{ r: 3, stroke: '#62a074', fill: '#62a074' }} />
                <Line type="monotone" dataKey="b" stroke="#5ea1d6" strokeWidth={3} dot={{ r: 3, stroke: '#5ea1d6', fill: '#5ea1d6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<DashboardContent />} />
      </Route>
    </Routes>
  );
}