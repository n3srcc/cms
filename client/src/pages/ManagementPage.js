import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ManagementContentCategory from './../components/Management/ManagementContentCategory';
import ManagementContent from './../components/Management/ManagementContent';
import ManagementTopic from '../components/Management/ManagementTopic';

const ManagementPage = () => {
  const location = useLocation();
  const isContentCategoryPage = location.pathname === '/management/content-category';
  const isContentPage = location.pathname === '/management/content';
  const isTopicPage = location.pathname === '/management/topic';

  if (isContentCategoryPage) {
    return <ManagementContentCategory />;
  }

  if (isContentPage) {
    return <ManagementContent />
  }

  if (isTopicPage) {
    return <ManagementTopic />
  }
};

export default ManagementPage;
