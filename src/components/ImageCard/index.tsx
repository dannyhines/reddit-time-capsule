import React from "react";
import { Card, Image } from 'antd'
const { Meta } = Card;

interface CardViewProps {
  title: string
  subtitle?: string
  imgSrc: string
}

const ImageCard: React.FC<CardViewProps> = (props) => {
  const { title, subtitle, imgSrc } = props;

  return (
    <div>
      <Card
        hoverable
        style={{ maxWidth: 400, margin: '16px 0' }}
        cover={<Image alt={title} src={imgSrc} />}
      >
        <Meta title={title} description={subtitle || ""} />
      </Card>
    </div>
  );
};

export default ImageCard;
