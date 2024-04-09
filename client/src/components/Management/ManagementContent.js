import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../authUtils';
import { createContent, fetchContents, fetchContentCategories, fetchTopics } from '../../api/RestClient';

const ManagementContent = () => {
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState({
    title: '',
    contentCategory: '',
    topic: '',
    content: '',
    images: '',
    video: '',
    document: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topicProperties, setTopicProperties] = useState({});

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setNewContent({ ...newContent, images: response.data.filename });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setNewContent({ ...newContent, document: response.data.filename });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleCreateContent = async () => {
    try {
      await createContent(newContent);
      setNewContent({
        title: '',
        contentCategory: '',
        topic: '',
        content: '',
        images: '',
        video: '',
        document: ''
      });
      setShowModal(false);
      fetchContents(setContents);
    } catch (error) {
      console.error('Error creating content:', error);
    }
  };

  const handleModal = async () => {
    fetchTopics(setTopics);
    fetchContentCategories(setCategories);
    setShowModal(true);
  };

  useEffect(() => {
    fetchContents(setContents);
  }, []);

  const handleTopicSelect = (topicId) => {
    const selected = topics.find(topic => topic._id === topicId);

    if (selected) {
      setTopicProperties(selected);
      setNewContent({
        ...newContent,
        topic: topicId,
        images: selected.allowImage ? '' : null,
        video: selected.allowVideo ? '' : null,
        document: selected.allowDocument ? '' : null
      });
    }
  };

  const handleContentCategorySelect = (categoryId) => {
    const selected = categories.find(category => category._id === categoryId);
    setNewContent({ ...newContent, contentCategory: selected._id });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-2">Contenido</h2>
        <button
          onClick={handleModal}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Agregar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Título</th>
              <th className="py-3 px-6 text-left">Contenido</th>
              <th className="py-3 px-6 text-left">Categoría de Contenido</th>
              <th className="py-3 px-6 text-left">Creditos</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {contents.map(content => (
              <tr key={content._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{content.title}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{content.content}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{content.contentCategory.name}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{content.createdBy.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Contenido</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Título:</label>
              <input
                type="text"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                placeholder="Título"
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Contenido:</label>
              <textarea
                value={newContent.content}
                onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                placeholder="Contenido"
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría de Contenido:</label>
              <select
                onChange={(e) => handleContentCategorySelect(e.target.value)}
                id="category"
                value={newContent.contentCategory}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tema:</label>
              <select
                value={newContent.topic}
                onChange={(e) => handleTopicSelect(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Seleccionar Tema</option>
                {topics.map(topic => (
                  <option key={topic._id} value={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            {newContent.topic && (
              <>
                {topicProperties.allowImage && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Imagen:</label>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept=".jpg,.jpeg,.png"
                      className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
                {topicProperties.allowVideo && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">URL de Video:</label>
                    <input
                      type="text"
                      value={newContent.video}
                      onChange={(e) => setNewContent({ ...newContent, video: e.target.value })}
                      placeholder="URL de Video"
                      className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
                {topicProperties.allowDocument && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Documento:</label>
                    <input
                      type="file"
                      onChange={handleDocumentUpload}
                      accept=".txt"
                      className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleCreateContent}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
              >
                Crear
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementContent;
