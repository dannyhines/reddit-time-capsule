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

    function dateChanged(value: number) {
        setStartDate(value)
        setLoading(true)
    }

    useEffect(() => {
        const endDate = (startDate || new Date().getTime()) + 86400
        // console.log("making request with startDate ", startDate, ", endDate: ", endDate)
        const url = `https://api.pushshift.io/reddit/search/submission/?q=&after=${startDate}&before=${endDate}&metadata=false&frequency=hour&advanced=false&sort=desc&sort_type=score&size=8&subreddit=`;

        const fetchData = async () => {
            setLoading(true)
            try {
                const newsResponse = await fetch(url + 'news,worldnews');
                const memesResponse = await fetch(url + 'memes,memeeconomy,dankmemes');
                const picsResponse = await fetch(url + 'pics');
                const politicsResponse = await fetch(url + 'politics');

                const newsJson = await newsResponse.json();
                const memesJson = await memesResponse.json();
                const picsJson = await picsResponse.json();
                const politicsJson = await politicsResponse.json();

                setNews(newsJson.data.slice(0, 10))
                setMemes(memesJson.data.slice(0, 10))
                setPics(picsJson.data.slice(0, 8))
                setPolitics(politicsJson.data.slice(0, 8))

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
                            <Col lg={8} md={12} xs={24}>
                                <ListView title="News" posts={news} />
                                <br />
                                <ListView title="Politics" posts={politics} />
                            </Col>
                            <Col lg={8} md={12} xs={12}>
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
                            <Col lg={8} md={12} xs={12}>
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
