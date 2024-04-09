import React, { useState, useEffect } from 'react';
import { createContentCategory, fetchContentCategories } from '../../api/RestClient';

const ContentCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const handleCreateCategory = async () => {
    try {
      if (!newCategoryName) {
        alert('Por favor, ingresa un nombre de categoría');
        return;
      }
      await createContentCategory(newCategoryName);
      setNewCategoryName('');
      setShowModal(false);
      await fetchContentCategories(setCategories);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  useEffect(() => {
    fetchContentCategories(setCategories);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-2">Categorías de Contenido</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Agregar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td className="py-3 px-6 text-left whitespace-nowrap">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear Nueva Categoría de Contenido</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la categoría:</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nombre de la categoría"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCategory}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCategory;
