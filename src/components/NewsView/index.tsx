import React from "react";
import { Avatar, Card, List } from 'antd'
import { Post } from "../../types/Post";
import dayjs from 'dayjs';

interface NewsViewProps {
    stories?: Post[]
}

const NewsView: React.FC<NewsViewProps> = (props) => {
    const { stories } = props;
    return (
        <Card style={{ textAlign: 'left' }}>
            <h1>
                r/News
            </h1>
            <List
                itemLayout="horizontal"
                dataSource={stories}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" src={item.thumbnail} />}
                            title={<a href={item.url || item.full_link}>{item.title}</a>}
                            description={`${dayjs(item.created_utc * 1000).format('h:mm a')} · ${item.author} · ${item.score?.toString()} pts`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NewsView;
