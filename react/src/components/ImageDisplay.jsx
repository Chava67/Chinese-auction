import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = ({ imageName }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:5281/api/File/get/camera.png`, {
                    responseType: 'arraybuffer',
                });

                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [imageName]);

    return (
        <div>
            {imageSrc ? <img src={imageSrc} alt="uploaded file" /> : <p>Loading...</p>}
        </div>
    );
};

export default ImageDisplay;
