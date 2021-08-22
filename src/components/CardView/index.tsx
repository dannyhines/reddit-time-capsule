import React from "react";
import { Card } from 'antd'
const { Meta } = Card;

interface CardViewProps {
  title: string
  subtitle?: string
  imgSrc: string
}

const CardView: React.FC<CardViewProps> = (props) => {
  const { title, subtitle, imgSrc } = props;
  return (
    <Card
      hoverable
      style={{ maxWidth: 400, textAlign: 'left' }}
      cover={<img alt="example" src={imgSrc} />}
    >
      <Meta title={title} description={subtitle || ""} />
    </Card>
  );
};

export default CardView;
