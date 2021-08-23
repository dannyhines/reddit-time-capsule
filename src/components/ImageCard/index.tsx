import React from "react";
import { Card } from 'antd'
const { Meta } = Card;

interface CardViewProps {
  title: string
  subtitle?: string
  imgSrc: string
}

const ImageCard: React.FC<CardViewProps> = (props) => {
  const { title, subtitle, imgSrc } = props;
  return (
    <Card
      hoverable
      style={{ maxWidth: 400 }}
      cover={<img alt="example" src={imgSrc} />}
    >
      <Meta title={title} description={subtitle || ""} />
    </Card>
  );
};

export default ImageCard;
