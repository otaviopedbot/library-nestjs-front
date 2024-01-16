import React from 'react';

const Table = ({ titles, data, tableTitle }) => {
    if (!titles || !data || titles.length === 0 || data.length === 0) {
        return <h1 className='text-center mt-12'>Nenhum dado disponível.</h1>
    }

    return (
        <div className="flex items-center justify-center mt-20 mb-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Lista de {tableTitle}
                    </caption>
                    <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {titles.map((title, index) => (
                                <th key={index} className="px-6 py-3">{title}</th>
                            ))}
                            <th scope="col" className="px-6 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((rowData) => (

                            <tr key={rowData.id} className={`text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>
                                
                                {Object.entries(rowData).map(([key, value], colIndex) => key !== 'id' && (
                                    <td key={colIndex} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {value}
                                    </td>
                                ))}

                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Ver
                                    </a>
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">
                                        Editar
                                    </a>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;