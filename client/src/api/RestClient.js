import axios from 'axios';
import { getToken } from '../authUtils';

const fetchContentCategories = async (setCategories) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content-category`);
        setCategories(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const createContentCategory = async (categoryName) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/content-category`,
            { name: categoryName },
            {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
    } catch (error) {
        console.error('Error creating category:', error);
    }
};

const fetchTopics = async (setTopics) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/topic`);
        setTopics(response.data);
    } catch (error) {
        console.error('Error creating category:', error);
    }
};

const createTopic = async (topic) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/topic`,
            topic,
            {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
    } catch (error) {
        console.error('Error creating topic:', error);
    }
};

const fetchContents = async (setContents) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/content`);
        setContents(response.data);
    } catch (error) {
        console.error('Error creating content:', error);
    }
};

const createContent = async (content) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/content`,
            content,
            {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
    } catch (error) {
        console.error('Error creating content:', error);
    }
};

export { fetchContentCategories, createContentCategory, fetchTopics, createTopic, fetchContents, createContent }