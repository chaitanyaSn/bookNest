const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const optimizeImage = (url, options = {}) => {
  // Extract the base URL without transformation parameters
  const baseUrl = url.split('/upload/')[0] + '/upload/';
  const imagePath = url.split('/upload/')[1];

  // Default optimization parameters
  const defaultOptions = {
    width: options.width || 800,
    quality: options.quality || 'auto',
    format: options.format || 'auto',
  };

  // Construct transformation string
  const transformation = [
    `w_${defaultOptions.width}`,
    `q_${defaultOptions.quality}`,
    `f_${defaultOptions.format}`,
  ].join(',');

  // Return the transformed URL
  return `${baseUrl}${transformation}/${imagePath}`;
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const timestamp = new Date().getTime();
    // Create signature
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    
    const params = {
      public_id: publicId,
      timestamp: timestamp,
      api_key: apiKey
    };

    // Make the request
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}; 