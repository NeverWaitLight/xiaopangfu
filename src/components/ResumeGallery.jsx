import React, { useState, useEffect } from 'react';

const ResumeGallery = () => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const imageCount = 32;
    const generateImages = () => {
      const imgList = [];
      for (let i = 1; i <= imageCount; i++) {
        imgList.push({
          id: i,
          src: `/assets/resume/fu/${i.toString().padStart(2, '0')}.png`,
          alt: `Resume Page ${i}`
        });
      }
      setImages(imgList);
    };
    
    generateImages();
  }, []);

  return (
    <div className="gallery">
      <div className="gallery-container">
        {images.map(image => (
          <div className="gallery-item" key={image.id}>
            <img 
              src={image.src} 
              alt={image.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeGallery; 