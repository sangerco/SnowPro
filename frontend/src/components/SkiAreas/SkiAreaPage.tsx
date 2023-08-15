import React, { useState, useEffect } from 'react';
import { Dimmer, Loader, Container, Grid, Divider, List } from 'semantic-ui-react';
import { URL } from '../../utils/config';
import axios from 'axios';
import { SkiAreaPageData } from '../../interfaces/skiAreaInterfaces';
import { useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import SkiAreaMap from './SkiAreaMap';
import SkiAreaReviewView from './SkiAreaReviewView';

type LiftStats = {
    open: number;
    hold: number;
    scheduled: number;
    closed: number;
};

type PercentageStats = {
    open: number;
    hold: number;
    scheduled: number;
    closed: number;
};

type Stats = {
    stats: LiftStats & { percentage: PercentageStats };
};

type LiftStatus = 'closed' | 'open' | 'hold' | 'scheduled';

const SkiAreaPage = () => {
    const { slug } = useParams();

    const [skiAreaData, setSkiAreaData] = useState<SkiAreaPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkiAreaData = async () => {
            try {
                const response = await axios.get(`${URL}/ski-areas/${slug}`);
                const responseData = response.data;
                setSkiAreaData(responseData);
                setLoading(false);
            } catch (e: any) {
                const errorMessage = e.message;
                setLoading(false);
                console.error(`Error Loading Ski Area! Error: ${errorMessage}`);
            }
        };

        fetchSkiAreaData();
    }, [slug]);



    if(loading) {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    } else if (skiAreaData !== null) {
        const statsObject = skiAreaData.lifts.stats;
        const { percentage, ...statsWithoutPercentObject } = statsObject
        const percentageObject = statsObject.percentage

        const statusColor = (status: LiftStatus): string => {
            switch (status) {
                case "closed":
                    return 'red';
                case "open":
                    return 'green';
                case "hold":
                    return 'yellow';
                case "scheduled":
                    return 'blue'
            }
        }

        const stats = Object.keys(statsWithoutPercentObject).map((key) => {
            const value = statsObject[key as keyof LiftStats];
            return ( 
                <List.Item key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{key}: </span>
                    <span>{value}</span>
                </List.Item>)
        });

        const percent = Object.keys(percentageObject).map((key) => {
            const value = percentageObject[key as keyof PercentageStats];
            return (
                    <List.Item key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{key}: </span>
                        <span>{value}%</span>
                    </List.Item>)
        })

        const liftsObject = skiAreaData.lifts.status;

        const lifts = Object.keys(liftsObject).map((liftName) => {
            const liftStatus = liftsObject[liftName];
            const color = statusColor(liftStatus as LiftStatus)
            return (
                <List.Item key={liftName} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{liftName}</span>
                    <span style={{ color }}>{liftStatus}</span>
                </List.Item>
            );
        });
        
        const reviews = skiAreaData.reviewData.map(review => {
            return (
                <SkiAreaReviewView review={review}  />
            )
        })

        return (
            <Container fluid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={6}>
                            <a href={skiAreaData.href}><Header as='h1' color='green'>{skiAreaData.name}</Header></a>
                            <Divider />
                            <Header as='h4' textAlign='right'>Country: {skiAreaData.country}</Header>
                            <Header as='h4' textAlign='right'>Region: {skiAreaData.region}</Header>
                            <Divider />
                            { reviews }
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <SkiAreaMap skiAreaPageData={skiAreaData} />
                            <Divider />
                            <Header as='h2'>Lift Status</Header>
                            {/* <List divided relaxed> */}
                                { stats }
                            {/* </List> */}
                            <br />
                            {/* <List divided relaxed> */}
                                { percent }
                            {/* </List> */}
                            <Header as='h3'>Lifts</Header>
                            {/* <List divided relaxed> */}
                                { lifts }
                            {/* </List> */}
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }

    return null;

};

export default SkiAreaPage;