
import React from 'react'
import { asset } from '../assets/asset/assest'



const Image = ({ name, alt = "", className = "" }) => {
  const imgSrc = asset[name];

  if (!imgSrc) {
    return <p className="text-red-500">Image "{name}" not found!</p>;
  }

  return <img src={imgSrc} alt={alt || name} className={className} />;
};

export default Image;