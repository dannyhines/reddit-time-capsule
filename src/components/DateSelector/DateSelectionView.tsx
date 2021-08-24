import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Row } from 'antd';
import DatePicker from './DatePicker'
import { Dayjs } from 'dayjs';
import getRandomDate from './getRandomDate';
import useWindowDimensions from "../../utils/useWindowDimensions";

interface DateSelectionProps {
    handleSubmit: (epoch: number) => void
}

const DateSelectionView: React.FC<DateSelectionProps> = (props) => {

    const { handleSubmit } = props;
    const { width } = useWindowDimensions();
    const [date, setDate] = useState<Dayjs | null>(getRandomDate())

    useEffect(() => {
        // If the date exists, update the parent
        if (date) {
            handleSubmit(date.startOf('day').unix())
        }
    }, [])

    const buttonSize = width > 500 ? "large" : "middle"
    return (
        <Row justify="center" style={{ padding: 20 }}>
            <Col lg={14} md={18}>
                <Card
                    bordered={false}
                    headStyle={{ borderBottom: 0 }}
                >
                    <h1>
                        The Internet on a Day
                    </h1>
                    <p style={{ marginBottom: '1rem' }}>
                        See what the internet was talking about on a random day in the past decade.
                        <br /><br />
                        Select a date or click <strong>Random</strong> to see the most upvoted news, pictures and memes from a particular day between 2010 and today.
                    </p>
                    <Row gutter={16} justify="center" align='middle'>
                        <Col>
                            Select a date:
                        </Col>
                        <Col>
                            <DatePicker
                                value={date}
                                format="MM-DD-YYYY"
                                onChange={(value) => setDate(value)}
                                size={buttonSize}
                                aria-label="date selector"
                                style={{ margin: '8px 0' }}
                            />
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" size={buttonSize}
                                style={{ paddingLeft: 10, paddingRight: 10 }}
                                disabled={date === null || date.isBefore('2010-01-01') || date.isAfter(new Date())}
                                onClick={() => {
                                    if (date) {
                                        handleSubmit(date.startOf('day').unix())
                                    }
                                }}>
                                Go
                            </Button>
                        </Col>
                    </Row>

                    <Row justify='center' align='middle'>
                        <Divider style={{ width: '40%', minWidth: '40%' }}>
                            or
                        </Divider>

                    </Row>
                    <Row justify='center'>
                        <Button
                            onClick={() => handleSubmit(getRandomDate().startOf('day').unix())}
                            size='large'
                            style={{ margin: '8px 0' }}
                        >
                            Random
                        </Button>
                    </Row>
                </Card>
            </Col>
        </Row >
    );
};

export default DateSelectionView;
