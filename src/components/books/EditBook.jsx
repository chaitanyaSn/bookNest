import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { uploadToCloudinary,deleteFromCloudinary } from '../utils/cloudinary';
import toast from 'react-hot-toast';

function EditBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    price: '',
    branch: '',
    description: '',
    condition: '',
    imageUrls: [],
    imagePublicIds: []
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookDoc = await getDoc(doc(db, 'books', bookId));
        if (!bookDoc.exists()) {
          toast.error('Book not found');
          navigate('/dashboard');
          return;
        }

        const bookData = bookDoc.data();
        // Verify ownership
        if (bookData.userId !== user.uid) {
          toast.error('Unauthorized access');
          navigate('/dashboard');
          return;
        }

        setFormData({
          name: bookData.name,
          year: bookData.year,
          price: bookData.price.toString(),
          branch: bookData.branch,
          description: bookData.description,
          condition: bookData.condition,
          imageUrls: bookData.imageUrls || [],
          imagePublicIds: bookData.imagePublicIds || []
        });
      } catch (error) {
        console.error('Error fetching book:', error);
        toast.error('Failed to load book details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.imageUrls.length > 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }

    setUploadingImages(true);
    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedImages = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...uploadedImages.map(img => img.url)],
        imagePublicIds: [...prev.imagePublicIds, ...uploadedImages.map(img => img.publicId)]
      }));
      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Error uploading images:', error);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = async (index) => {
    try {
      // Delete from Cloudinary
      await deleteFromCloudinary(formData.imagePublicIds[index]);
      
      // Update state
      setFormData(prev => ({
        ...prev,
        imageUrls: prev.imageUrls.filter((_, i) => i !== index),
        imagePublicIds: prev.imagePublicIds.filter((_, i) => i !== index)
      }));
      
      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    try {
      setLoading(true);
      
      const bookData = {
        name: formData.name,
        year: formData.year,
        price: Number(formData.price),
        branch: formData.branch,
        description: formData.description,
        condition: formData.condition,
        imageUrls: formData.imageUrls,
        imagePublicIds: formData.imagePublicIds,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'books', bookId), bookData);
      toast.success('Book updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Book Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Book Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="text"
            name="year"
            required
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <select
            name="branch"
            required
            value={formData.branch}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            required
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Condition</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Images</label>
          <div className="mt-2 flex gap-4">
            {formData.imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Book ${index + 1}`}
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Add Images (Max 3)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {uploadingImages && (
            <p className="mt-2 text-sm text-blue-600">Uploading images...</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || uploadingImages}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
}

export default EditBook; 