import React, { useState } from "react";
import placeholderImgFile from "./placeholder.png";

const ImageWithPlaceholder = ({ src, alt, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
  
    const handleError = () => {
        setImgSrc(placeholderImgFile);
    };
  
    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
}

export default ImageWithPlaceholder