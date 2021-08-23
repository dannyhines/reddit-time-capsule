import React, { useEffect, useState } from "react";
import { BackTop, Row, Col, Spin, Typography, Divider } from 'antd';
import DateSelectionView from '../DateSelector';
import './ContentView.css'
import NewsView from "../NewsView";
import { Post } from "../../types/Post";
import dayjs, { Dayjs } from 'dayjs';
const { Title } = Typography;

interface ContentViewProps {
}

const ContentView: React.FC<ContentViewProps> = (props) => {

    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState<number>(0)
    const [posts, setPosts] = useState<Post[]>([])

    function dateChanged(value: number) {
        setStartDate(value)
    }

    useEffect(() => {
        const endDate = (startDate || new Date().getTime()) + 86400
        // console.log("making request with startDate ", startDate, ", endDate: ", endDate)
        const url = `https://api.pushshift.io/reddit/search/submission/?q=&after=${startDate}&before=${endDate}&subreddit=news&metadata=false&frequency=hour&advanced=false&sort=desc&sort_type=num_comments&size=10`;

        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log("success, response: ", json.data);
                setPosts(json.data.slice(0, 10))
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false)
            }
        };

        if (startDate) {
            fetchData();
        }
    }, [startDate]);

    const dateObj: Dayjs = dayjs(startDate * 1000)
    const stringDate = `${getWeekDay(dateObj)},  ${dateObj.format('MMMM')} ${getOrdinalNum(dateObj.date())} ${dateObj.year()}`

    return (
        <div className="content-view">
            <BackTop />

            <DateSelectionView handleSubmit={dateChanged} />

            <div style={{ textAlign: 'center', paddingTop: 16 }}>
                <Spin spinning={loading} size="large" />
                {!loading &&
                    <div>
                        <Divider style={{ borderTopColor: '#636363' }}>
                            <Title level={2}>{stringDate}</Title>
                        </Divider>
                        <Row gutter={16} justify='center'>
                            <Col lg={12} md={18} xs={24}>
                                <NewsView stories={posts} />
                            </Col>
                            {/* <Col span={6}>
                            <ImageCard
                                title="Here's a title"
                                subtitle="r/memes · 714 pts"
                                imgSrc="https://i.redditmedia.com/SCPNX3yCl7HZk8I-7nkAQ8dcccBmqjr4pNlNfLPPA50.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=216&s=78902c1f4daa0c98fa61469a1dee9250"
                            />
                        </Col>
                        <Col span={6}>
                            <ImageCard
                                title="Here's a title"
                                subtitle="r/memes · 714 pts"
                                imgSrc="https://i.redditmedia.com/SCPNX3yCl7HZk8I-7nkAQ8dcccBmqjr4pNlNfLPPA50.jpg?fit=crop&crop=faces%2Centropy&arh=2&w=216&s=78902c1f4daa0c98fa61469a1dee9250"
                            />
                        </Col> */}
                        </Row>
                    </div>
                }
            </div>
        </div>
    );
};

const getWeekDay = (date: Dayjs) => {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[date.day()];
}

function getOrdinalNum(n: number) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

export default ContentView;
