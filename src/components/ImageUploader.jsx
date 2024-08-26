import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ImageUploader = ({ onImageUpload }) => {
  const [images, setImages] = useState([]);

  const handleFileChange = event => {
    const files = Array.from(event.target.files);
    setImages(prev => prev.concat(files));
  };

  const handleUpload = async () => {
    console.log(images);

    if (images.length > 0) {
      const uploadedImages = [];
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        try {
          console.log(formData);

          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGBB_API_KEY}`,
            formData
          );

          if (response.data.data.url) {
            toast.success("Image Uploaded!");
            const url = response.data.data.url;
            uploadedImages.push({ url, alt: `Product Image ${uploadedImages.length + 1}` });
          }
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
      onImageUpload(uploadedImages);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button
        type="button"
        onClick={handleUpload}
        className="text-sm py-2 text-center text-white bg-primaryColor border border-primaryColor rounded hover:bg-transparent hover:text-primaryColor transition uppercase font-roboto font-medium px-6"
      >
        Upload Images
      </button>
    </div>
  );
};

export default ImageUploader;
