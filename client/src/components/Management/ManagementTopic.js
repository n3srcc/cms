import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../authUtils';
import { createTopic, fetchTopics } from '../../api/RestClient';

const ManagementTopic = () => {
  const [topics, setTopics] = useState([]);
  const [topicData, setTopicData] = useState({
    name: '',
    coverImage: '',
    allowImage: false,
    allowVideo: false,
    allowDocument: false
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTopicData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe ser mayor a 2MB');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData,
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
        setTopicData({ ...topicData, coverImage: response.data.filename });
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    }
  };

  const handleCreateTopic = async () => {
    try {
      if (!topicData.name) {
        alert('Por favor, ingresa un nombre de categoría');
        return;
      }

      const checkedCount = Object.values(topicData).filter(value => value).length;
      if (checkedCount <= 1) {
        alert('Por favor, selecciona solo una opción a permitir');
        return;
      }

      await createTopic(topicData);
      setTopicData({
        name: '',
        coverImage: null,
        allowImage: false,
        allowVideo: false,
        allowDocument: false
      });
      setShowModal(false);
      fetchTopics(setTopics);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  useEffect(() => {
    fetchTopics(setTopics);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-2">Temáticas de Contenido</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Agregar
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">Nombre</th>
            <th className="py-2 px-4 bg-gray-200">Imagen de Portada</th>
            <th className="py-2 px-4 bg-gray-200">Permitir Imágenes</th>
            <th className="py-2 px-4 bg-gray-200">Permitir Videos</th>
            <th className="py-2 px-4 bg-gray-200">Permitir Documentos</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => (
            <tr key={topic._id}>
              <td className="py-2 px-4">{topic.name}</td>
              <td className="py-2 border-b border-gray-300">
                <img src={`${process.env.REACT_APP_API_URL}/uploads/${topic.coverImage}`} alt="Imagen de portada" className="h-12" />
              </td>
              <td className="py-2 px-4">{topic.allowImage ? 'Sí' : 'No'}</td>
              <td className="py-2 px-4">{topic.allowVideo ? 'Sí' : 'No'}</td>
              <td className="py-2 px-4">{topic.allowDocument ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Crear Nueva Temática de Contenido</h2>
            <input
              type="text"
              name="name"
              value={topicData.name}
              onChange={handleInputChange}
              placeholder="Nombre de la tematica"
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-grow mb-4"
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Imagen de Portada:</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg,image/png"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                name="allowImage"
                checked={topicData.allowImage}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-gray-700">Permitir Imágenes</span>
            </label>
            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                name="allowVideo"
                checked={topicData.allowVideo}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-gray-700">Permitir Videos</span>
            </label>
            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                name="allowDocument"
                checked={topicData.allowDocument}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-gray-700">Permitir Documentos</span>
            </label>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTopic}
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
}

export default ManagementTopic;
