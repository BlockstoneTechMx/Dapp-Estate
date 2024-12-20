import React, { useState, useRef } from 'react';
import ic from "ic0";

const Ledger = ic("jqlpl-3aaaa-aaaap-anr2a-cai");

const LoaderOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
    <div className="loader border-t-4 border-indigo-600 rounded-full w-8 h-8 animate-spin"></div>
  </div>
);

const AddItem = ({ principal, onSubmit, onCancel }) => {
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '0', // Store price as a string
    downloadLink: '',
    image: null,
    imagePreview: '',
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = async (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewItem((prev) => ({
            ...prev,
            image: file,
            imagePreview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: value, // Directly set the value as a string
      }));
    }
  };

  const handleRemoveImage = () => {
    setNewItem((prev) => ({
      ...prev,
      image: null,
      imagePreview: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const id = `${Date.now()}${Math.random()}`;
    try {
      const response = await Ledger.call("addProduct", id, principal, newItem.title, newItem.description, parseFloat(newItem.price), newItem.downloadLink, newItem.imagePreview);
      console.log("Added Item:", response);
      onSubmit({ ...newItem, id, image: newItem.imagePreview });
      setNewItem({
        title: '',
        description: '',
        price: '0', // Reset price as a string
        downloadLink: '',
        image: null,
        imagePreview: '',
      });
    } catch (e) {
      console.log("Error Adding Item:", e);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden relative">
      {loading && <LoaderOverlay />}
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              name="title"
              value={newItem.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="price"
                name="price"
                type="text" // Keep as text to avoid automatic rounding
                value={newItem.price}
                onChange={handleInputChange}
                required
                pattern="^\d+(\.\d{0,2})?$" // Allow up to two decimal places
                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-700">Download Link</label>
            <input
              id="downloadLink"
              name="downloadLink"
              value={newItem.downloadLink}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              ref={fileInputRef}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          {newItem.imagePreview && (
            <div className="mt-4 relative inline-block">
              <p className="text-sm text-gray-600">Image Preview</p>
              <img src={newItem.imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-md mt-2" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0.5 right-0 left-24 bg-white text-red-500 rounded-full p-1 -mt-2 -mr-2 focus:outline-none"
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? <LoaderOverlay /> : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
