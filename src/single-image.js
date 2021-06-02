import React from 'react';

const SingleItem = ({
  alt_description,
  urls: { regular },
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium }
  }
}) => {
  return (
    <article className="item">
      <img src={regular} alt={alt_description} />
      <div className="info">
        <div>
          <h3>{name}</h3>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url} target="_blank" rel="noreferrer">
          <img src={medium} alt={name} />
        </a>
      </div>
    </article>
  );
};

export default SingleItem;
