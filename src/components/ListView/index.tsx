import React from "react";
import { Avatar, Card, List } from 'antd'
import { Post } from "../../types/Post";
import ListTitle from "../common/ListTitle";

interface NewsViewProps {
    title: string
    posts?: Post[]
}

const ListView: React.FC<NewsViewProps> = (props) => {
    const { title, posts } = props;
    return (
        <>
            <ListTitle>
                {title}
            </ListTitle>

            <Card style={{ textAlign: 'left' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={posts}
                    renderItem={item => (
                        <a href={item.full_link} target="_blank" rel="noopener noreferrer">
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src={item.thumbnail} size='large' />}
                                    title={<a href={item.url}>{item.title}</a>}
                                    description={`r/${item.subreddit} · ${item.author} · ${item.score?.toString()} pts`}
                                />
                            </List.Item>
                        </a>
                    )}
                />
            </Card>
        </>
    );
};

export default ListView;
