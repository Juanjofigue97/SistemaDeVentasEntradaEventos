const Compras = () => {
    return (
      <div className="max-w-md border border-yellow-500 rounded-lg p-6">
        <h3 className="font-bold text-gray-700 mb-4">Selecciona un evento</h3>
        <select className="w-full p-2 border border-gray-300 rounded mb-4">
          <option>Concierto de Rock</option>
          <option>Festival de Jazz</option>
        </select>
        <button className="bg-yellow-500 text-gray-700 w-full py-2 rounded hover:bg-yellow-600">
          Entradas Compradas
        </button>
      </div>
    );
  };
  
  export default Compras;
  