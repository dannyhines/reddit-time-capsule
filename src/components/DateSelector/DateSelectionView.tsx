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
    // this variable makes sure they don't spam the 'Go' or 'Random' btns
    const [btnDisabled, setbtnDisabled] = useState(false)

    const submitDate = (date: Dayjs | null) => {
        if (date && !btnDisabled) {
            // Update the parent date to call api
            handleSubmit(date.startOf('day').unix())
            setTimeout(() => {
                setbtnDisabled(false)
            }, 1500)
            setbtnDisabled(true)
        }
    }

    const handleRandom = () => {
        if (!btnDisabled) {
            const date = getRandomDate()
            setDate(date)
            submitDate(date)
        }
    }
    useEffect(() => {
        // set random to start
        submitDate(date)
    }, [])

    const buttonSize = width > 500 ? "large" : "middle"
    return (
        <Row justify="center" >
            <Col lg={14} md={18}>
                <Card
                    bordered={false}
                    headStyle={{ borderBottom: 0 }}
                    style={{ padding: '0 8px' }}
                >
                    <h1>
                        The Internet on a Day
                    </h1>
                    <p style={{ marginBottom: '1rem' }}>
                        See what the internet was talking about on a random day in the past decade.
                        <br /><br />
                        Select a date or click <strong>Random</strong> to see the most upvoted news, pictures and memes from a particular day between 2010 and today.
                    </p>
                    <Row gutter={16} justify="center" align='middle' style={{ marginTop: 12, padding: 8 }}>
                        <Col>
                            <h4 style={{ margin: 0 }}>Select a date:</h4>
                        </Col>
                        <Col>
                            <DatePicker
                                value={date}
                                format="MM-DD-YYYY"
                                onChange={(value) => setDate(value)}
                                size={buttonSize}
                                aria-label="date selector"
                            />
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" size={buttonSize}
                                style={{ paddingLeft: 10, paddingRight: 10 }}
                                disabled={btnDisabled || date === null || date.isBefore('2010-01-01') || date.isAfter(new Date())}
                                onClick={() => submitDate(date)}>
                                Go
                            </Button>
                        </Col>
                    </Row>

                    <Row justify='center' align='middle'>
                        <Divider style={{ width: '50%', minWidth: '50%', paddingBottom: 8 }}>
                            or
                        </Divider>

                    </Row>
                    <Row justify='center'>
                        <Button
                            onClick={() => handleRandom()}
                            size='large'
                            disabled={btnDisabled}
                            style={{ backgroundColor: 'black', padding: '0 20px' }}
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
