export default function AdminPanel() {

    return (
        <>
            {/* <div className="bg-[#23282e] p-8 rounded-2xl flex flex-col text-white gap-4">
                <h1 className="text-3xl">Упс...</h1>
                <p>Данный сервис доступен только Админам :)</p>
            </div> */}

            {/* Container for Sources and Metrics */}
            <div className="flex gap-6 flex-wrap">
                {/* Sources Container */}
                <div className="bg-[#23282e] rounded-2xl p-6 text-white flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">Источники</h2>
                    
                    {/* Add Source Button */}
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg mb-4 flex items-center gap-2 transition-colors">
                        <span className="text-lg">+</span>
                        <span>Добавить источник</span>
                    </button>
                    <hr></hr>

                    {/* Source List */}
                    <div className="space-y-2 mb-4 flex-grow">
                        <div className="flex items-center justify-between p-3 hover:bg-[#2d3339] rounded-lg cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                {/* Document Icon */}
                                <svg 
                                    className="w-5 h-5 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                                    />
                                </svg>
                                <span className="text-sm">EcoPorts Report 2025</span>
                            </div>
                            
                            {/* Chevron Icon */}
                            <svg 
                                className="w-5 h-5 text-gray-400 group-hover:text-gray-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                />
                            </svg>
                        </div>
                    </div>

                    {/* View all Reports Button */}
                    <button className="w-full text-emerald-500 hover:text-emerald-400 text-sm font-medium py-2 transition-colors">
                        Просмотреть все отчёты
                    </button>
                </div>

                {/* Metrics Container */}
                <div className="bg-[#23282e] rounded-2xl p-6 text-white flex flex-col flex-1">
                    <h2 className="text-xl font-semibold mb-4">Метрика</h2>
                    
                    {/* Port and Date Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Порт</label>
                            <select className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600">
                                <option>Актау</option>
                                <option>Махачкала</option>
                                <option>Астрахань</option>
                                <option>Баку</option>
                                <option>Туркменбаши</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Дата</label>
                            <input 
                                type="text" 
                                value="2024-04-22"
                                className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Water and Air PM Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Вода</label>
                            <input 
                                type="number" 
                                value="13"
                                className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Воздух PM₃ (ug/m)</label>
                            <input 
                                type="number" 
                                value="12"
                                className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>
                    </div>

                    {/* CO2 and Wastewater Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">CO₂ (t)</label>
                            <input 
                                type="number" 
                                value="760"
                                className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Загрязненная вода (m³)</label>
                            <input 
                                type="number" 
                                value="520000"
                                className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>
                    </div>

                    {/* Incidents */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-2">Инциденты</label>
                        <input 
                            type="number" 
                            value="1"
                            className="w-full bg-[#2d3339] text-white px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-lg transition-colors">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>

            {/* Pollution Reports Container */}
            <div className="bg-[#23282e] rounded-2xl p-6 text-white mt-6 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-4">Жалобы о загрязнении</h2>
                
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Пользователь</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Порт</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Комментарий</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800 hover:bg-[#2d3339] transition-colors">
                                <td className="py-3 px-4 text-sm">Иван Петров</td>
                                <td className="py-3 px-4 text-sm">Aktau</td>
                                <td className="py-3 px-4 text-sm">Обнаружен разлив нефти в акватории порта</td>
                                <td className="py-3 px-4 text-sm">2024-04-22</td>
                            </tr>
                            <tr className="border-b border-gray-800 hover:bg-[#2d3339] transition-colors">
                                <td className="py-3 px-4 text-sm">Мария Сидорова</td>
                                <td className="py-3 px-4 text-sm">Bautino</td>
                                <td className="py-3 px-4 text-sm">Превышение уровня PM2.5 в воздухе</td>
                                <td className="py-3 px-4 text-sm">2024-04-21</td>
                            </tr>
                            <tr className="border-b border-gray-800 hover:bg-[#2d3339] transition-colors">
                                <td className="py-3 px-4 text-sm">Алексей Ковалев</td>
                                <td className="py-3 px-4 text-sm">Aktau</td>
                                <td className="py-3 px-4 text-sm">Сброс сточных вод без очистки</td>
                                <td className="py-3 px-4 text-sm">2024-04-20</td>
                            </tr>
                            <tr className="hover:bg-[#2d3339] transition-colors">
                                <td className="py-3 px-4 text-sm">Ольга Николаева</td>
                                <td className="py-3 px-4 text-sm">Kuryk</td>
                                <td className="py-3 px-4 text-sm">Высокий уровень шума от погрузочных работ</td>
                                <td className="py-3 px-4 text-sm">2024-04-19</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
