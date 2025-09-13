import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('https://aunry-backend.onrender.com/api/videos');
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-list">
      {videos.length === 0 ? (
        <p>No videos found. Please log in as an admin to upload videos.</p>
      ) : (
        videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))
      )}
    </div>
  );
};

export default VideoList;
