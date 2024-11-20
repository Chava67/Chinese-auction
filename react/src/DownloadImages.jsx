import React, { useEffect } from 'react';
import axios from 'axios';

const DownloadImages = () => {
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5281/api/File/list');
                const fileList = response.data;

                fileList.forEach(async (fileName) => {
                    const fileResponse = await axios.get(`http://localhost:5281/api/File/get/${fileName}`, {
                        responseType: 'blob',
                    });

                    const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
            } catch (error) {
                console.error('Error downloading files:', error);
            }
        };

        fetchImages();
    }, []);

    return null;
};

export default DownloadImages;
