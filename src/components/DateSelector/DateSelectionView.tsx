import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from 'antd';
import DatePicker from './DatePicker'
import { Dayjs } from 'dayjs';
import getRandomDate from './getRandomDate';

interface DateSelectionProps {
    handleSubmit: (epoch: number) => void
}

const DateSelectionView: React.FC<DateSelectionProps> = (props) => {

    const [date, setDate] = useState<Dayjs | null>(getRandomDate())

    useEffect(() => {
        // Only update the parent date if it's not null
        if (date) {
            props.handleSubmit(date.startOf('day').unix())
        }
    }, [])

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
                        Select a date or click <strong>Random</strong> to see the most upvoted news, pictures and memes from a particular day between 2010 and now.
                    </p>
                    <Row gutter={16} justify="center" style={{ padding: '8px 0' }}>
                        <Col>
                            <Button size="large" onClick={() => setDate(getRandomDate())}>
                                Random
                            </Button>
                        </Col>
                        <Col>
                            <DatePicker
                                value={date}
                                format="MM-DD-YYYY"
                                onChange={(value) => setDate(value)}
                                size="large"
                                aria-label="date selector"
                            />
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" size="large"
                                disabled={date === null || date.isBefore('2010-01-01') || date.isAfter(new Date())}
                                onClick={() => {
                                    if (date) {
                                        props.handleSubmit(date.startOf('day').unix())
                                    }
                                }}>
                                Go
                            </Button>
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row>
    );
};

export default DateSelectionView;
