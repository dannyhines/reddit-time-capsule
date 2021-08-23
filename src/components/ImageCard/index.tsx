import React from "react";
import { Card, Image } from 'antd'
import { Post } from "../../types/Post";
const { Meta } = Card;

interface CardViewProps {
  post: Post
}

const ImageCard: React.FC<CardViewProps> = (props) => {
  const { post } = props;

  return (
    <div>
      <Card
        hoverable
        style={{ maxWidth: 400, margin: '16px 0' }}
        cover={<Image alt="Failed to load image" src={post.url} />}
      >
        <a href={post.full_link}>
          <Meta
            title={post.title}
            description={`r/${post.subreddit} · ${post.score} pts`}
          />
        </a>
      </Card>
    </div>
  );
};

export default ImageCard;
