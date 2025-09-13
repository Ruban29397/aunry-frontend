import React, { useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState('');

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!title || !description || !video || !thumbnail) {
      setMessage('Please fill in all fields and select both files.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);
    formData.append('thumbnail', thumbnail);

    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      await axios.post('https://aunry-backend.onrender.com/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        },
      });
      setMessage('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideo(null);
      setThumbnail(null);
      e.target.reset(); // Clear form fields
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || 'Error uploading video');
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>Upload New Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        <button type="submit">Upload Video</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminUpload;
