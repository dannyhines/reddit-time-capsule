import React, { useEffect, useState } from "react";
import { BackTop, Row, Col, Spin } from 'antd';
import ImageCard from '../ImageCard';
import DateSelectionView from '../DateSelector';
import './ContentView.css'
import NewsView from "../NewsView";

interface ContentViewProps {
}

const ContentView: React.FC<ContentViewProps> = (props) => {

    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState<number | undefined>()

    function dateChanged(value: number) {
        console.log("dateChanged, ", value);
        setStartDate(value)
    }

    useEffect(() => {
        const endDate = (startDate || new Date().getTime()) + 86400
        // console.log("making request with startDate ", startDate, ", endDate: ", endDate)
        const url = `https://api.pushshift.io/reddit/search/submission/?q=&after=${startDate}&before=${endDate}&subreddit=memes&author=&aggs=&metadata=false&frequency=hour&advanced=false&sort=desc&domain=&sort_type=score`;

        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log("success, response: ", json.data);
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

    return (
        <div className="content-view">
            <BackTop />

            <DateSelectionView handleSubmit={dateChanged} />

            <div style={{ textAlign: 'center', paddingTop: 16 }}>
                {/* <Spin spinning={loading} size="large" /> */}
                {!loading &&
                    <Row gutter={16}>
                        <Col lg={12}>
                            <NewsView stories={[{ title: "something" }]} />
                        </Col>
                        <Col span={6}>
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
                        </Col>
                    </Row>
                }
            </div>
        </div>
    );
};


export default ContentView;
