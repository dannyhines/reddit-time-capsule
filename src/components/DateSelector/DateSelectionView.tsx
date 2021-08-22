import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from 'antd';
import DatePicker from './DatePicker'
// import * as dayjs from 'dayjs'
import { Dayjs } from 'dayjs';
import getRandomDate from './getRandomDate';

interface DateSelectionProps {
    dateChanged: (epoch: number) => void
}

const DateSelectionView: React.FC<DateSelectionProps> = (props) => {

    const [date, setDate] = useState<Dayjs | null>(getRandomDate())

    useEffect(() => {
        // Only update the parent date if it's not null
        if (date) {
            props.dateChanged(date.unix())
        }
    }, [date])

    function onChange(value: Dayjs | null, dateString: string) {
        console.log("onChange(): ", value, dateString);
        setDate(value)
    }

    return (
        <Row justify="center" gutter={16} >
            <Col lg={14} md={18}>
                <Card
                    bordered={false}
                    style={{ textAlign: 'left' }}
                    headStyle={{ borderBottom: 0 }}
                >
                    <h2>
                        Reddit on a Day
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Get a glimpse of what the internet was talking about on a random day in the past decade.
                        Select a date or click <strong>Random</strong> to see the most upvoted news, pictures and memes from a particular day between 2010 and today.
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
                                onChange={onChange}
                                size="large"
                                aria-label="date selector"
                            />
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" size="large" disabled={date === null}>
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
