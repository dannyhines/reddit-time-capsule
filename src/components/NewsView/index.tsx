import React from "react";
import { Card } from 'antd'
import { Post } from "../../types/Post";

interface NewsViewProps {
    stories?: Post[]
}

const NewsView: React.FC<NewsViewProps> = (props) => {
    const { stories } = props;

    return (
        <Card>
            <h2>
                r/News
            </h2>
            {stories && stories.map((post: Post) => {
                <p>{post.title}</p>
            })}
        </Card>
    );
};

export default NewsView;
