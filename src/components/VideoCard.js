import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <Link to={`/video/${video._id}`}>
        <img src={`https://aunry-backend.onrender.com${video.thumbnailUrl}`} alt={video.title} />
        <h3>{video.title}</h3>
        <p>Views: {video.viewCount}</p>
      </Link>
    </div>
  );
};

export default VideoCard;
