import React from "react";
import { Card, Image } from 'antd'
import { Post } from "../../types/Post";
import { useImage } from "./useImage";
const { Meta } = Card;

interface CardViewProps {
  post: Post
}

const ImageCard: React.FC<CardViewProps> = (props) => {

  const { post } = props;
  const { hasError } = useImage(post.url);

  if (hasError) {
    return null;
  }
  return (
    <div>
      <Card
        hoverable
        style={{ maxWidth: 400, margin: '16px 0' }}
        cover={<Image alt="Failed to load image" src={post.url} />}
        bodyStyle={{ padding: 12 }}
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
