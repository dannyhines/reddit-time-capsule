import React, { useEffect, useState } from "react";
import { BackTop, Row, Col, Spin, Divider } from 'antd';
import DateSelectionView from '../DateSelector';
import './ContentView.css'
import ListView from "../ListView";
import { Post } from "../../types/Post";
import dayjs, { Dayjs } from 'dayjs';
import ImageCard from "../ImageCard";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ListTitle from "../common/ListTitle";

interface ContentViewProps {
}

const ContentView: React.FC<ContentViewProps> = (props) => {

    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState<number>(0)
    const [news, setNews] = useState<Post[]>([])
    const [memes, setMemes] = useState<Post[]>([])
    const [pics, setPics] = useState<Post[]>([])
    const [politics, setPolitics] = useState<Post[]>([])
    const [predictions, setPredictions] = useState<Post[]>([])

    function dateChanged(value: number) {
        setStartDate(value)
        setLoading(true)
    }

    useEffect(() => {
        const endDate = (startDate || new Date().getTime()) + 86400 // 1 day
        const oneMonth = 2629743

        const baseURl = 'https://api.pushshift.io/reddit/search/submission/?sort_type=score&sort=desc&size=25'
        const url = baseURl + `&after=${startDate}&before=${endDate}&subreddit=`;
        const predictionsUrl = baseURl + `&after=${startDate - oneMonth}&before=${endDate + oneMonth}&subreddit=futurology&q="by%202020"||"by%202021"||"by%202022"`

        const fetchData = async () => {
            setLoading(true)
            try {
                const newsPoliticsResponse = await fetch(url + 'news,worldnews,politics');
                const memesResponse = await fetch(url + 'memes,memeeconomy,dankmemes,adviceanimals');
                const picsResponse = await fetch(url + 'pics');

                const newsPoliticsJson = await newsPoliticsResponse.json();
                const memesJson = await memesResponse.json();
                const picsJson = await picsResponse.json();

                setNews(newsPoliticsJson.data.filter((x: Post) => x.subreddit === 'news' || x.subreddit === 'worldnews').slice(0, 8))
                setMemes(memesJson.data.slice(0, 10))
                setPolitics(newsPoliticsJson.data.filter((x: Post) => x.subreddit === 'politics').slice(0, 6))
                setPics(picsJson.data.slice(0, 7))

                // Only fetch predictions if posts are 2+ years old
                const twoYears = 63113852
                if (startDate + twoYears < new Date().getTime()) {
                    const predicitonsResponse = await fetch(predictionsUrl);
                    const predictionsJson = await predicitonsResponse.json();
                    setPredictions(predictionsJson.data.slice(0, 6))
                }

            } catch (error) {
                console.log("error fetching posts: ", error);
            } finally {
                setLoading(false)
            }
        };

        if (startDate) {
            fetchData();
        }
    }, [startDate]);

    const dateObj: Dayjs = dayjs(startDate * 1000)
    const stringDate = `${getWeekDay(dateObj)},  ${dateObj.format('MMM.')} ${getOrdinalNum(dateObj.date())} ${dateObj.year()}`

    const { width } = useWindowDimensions();

    return (
        <div className="content-view">
            <BackTop />

            <DateSelectionView handleSubmit={dateChanged} />

            <div style={{ textAlign: 'center', paddingTop: 16, minHeight: 500 }}>

                {loading ? <Spin spinning={loading} size="large" /> :
                    <div>
                        <Divider style={{ borderTopColor: '#636363' }}>
                            {width > 450 ? <h1>{stringDate}</h1> : <h3>{stringDate}</h3>}
                        </Divider>
                        <Row gutter={16} justify='center'>
                            <Col lg={8} span={24} sm={{ order: 1 }} xs={{ order: 3 }}>
                                <ListView title="News" posts={news} />

                                <br />
                                <ListView title="Predictions" posts={predictions} />

                                <br />
                                <ListView title="Politics" posts={politics} />
                            </Col>
                            <Col lg={8} span={12} order={2} xs={{ order: 1 }} >
                                <ListTitle>
                                    Pictures
                                </ListTitle>
                                {pics.filter(x => x.url.length).map((item) => (
                                    <ImageCard
                                        key={item.id}
                                        post={item}
                                    />
                                ))}

                            </Col>
                            <Col lg={8} span={12} order={3} xs={{ order: 2 }} >
                                <ListTitle>
                                    Memes
                                </ListTitle>
                                {memes.filter(x => x.url.length).map((item) => (
                                    <ImageCard
                                        key={item.id}
                                        post={item}
                                    />
                                ))}

                            </Col>
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
