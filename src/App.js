import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';

const App = () => {
  const [imageRecords, setImageRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/images`);
        setImageRecords(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image records:', error);
      }
    };

    fetchImageRecords();
  }, []);

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated_image.jpg'; // You can change the file name here if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full p-2 md:p-4 lg:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="text-center"> <div className="flex justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div></div>
        ) : imageRecords.length === 0 ? (
          <div className="text-center">No images available</div>
        ) : (
          imageRecords.map((record, index) => (
            <div key={index} className="flex flex-col justify-center items-center p-4 border border-gray-200 rounded-md shadow-md bg-gray-200">
              <div className="mb-2">
                <img src={`${BASE_URL}/${record.uploadedImagePath}`} alt="Uploaded" className="w-full h-auto rounded-md shadow" />
                <div className="text-xs font-semibold text-gray-500 mt-1">Uploaded Image</div>
              </div>
              <div>
                <img src={`${BASE_URL}/${record.generatedImagePath}`} alt="Generated" className="w-full h-auto rounded-md shadow" />
                <div className="text-xs font-semibold text-gray-500 mt-1">Generated Image</div>
                <button onClick={() => handleDownload(`${BASE_URL}/${record.generatedImagePath}`)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <img src='/assets/downloadIcon.png' />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
