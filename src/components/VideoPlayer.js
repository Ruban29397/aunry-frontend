import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Increment view count
        await axios.put(`https://aunry-backend.onrender.com/api/videos/view/${id}`);

        // Fetch video details
        const res = await axios.get(`https://aunry-backend.onrender.com/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading video...</div>;
  if (error) return <div>{error}</div>;
  if (!video) return <div>Video not found.</div>;

  return (
    <div className="video-player-container">
      <h2>{video.title}</h2>
      <p>Views: {video.viewCount}</p>
      <video controls width="800" height="450">
        <source src={`http://localhost:5000/uploads/${video.videoUrl.split('/').pop()}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{video.description}</p>
    </div>
  );
};

export default VideoPlayer;
