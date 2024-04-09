import React, { useState, useEffect } from 'react';
import { fetchTopics } from '../../api/RestClient';

const ListContent = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics(setTopics);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Biblioteca de Contenidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => (
          <div key={topic._id} className="border p-4 rounded">
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${topic.coverImage}`} alt={topic.name} className="mb-2" />
            <h3 className="text-lg font-semibold">{topic.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListContent;
