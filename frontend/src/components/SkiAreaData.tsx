import React, { useEffect, useState } from "react";
import { Container, Header, Dimmer, Loader, Icon } from "semantic-ui-react";

interface SkiAreaDataResponse {
    data: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
        };
        twitter: {
            user: string;
        }
    };
}

const SkiAreaData = () => {
    const [ name, setName ] = useState<string | null>(null);
    const [ lat, setLat ] = useState<number | null>(null);
    const [ long, setLong ] = useState<number | null>(null);
    const [ twitterUser, setTwitterUser ] = useState<string | null>(null)

    useEffect(() => {
        const fetchSkiAreaData =async () => {
            try {
                const response = await fetch('http://localhost:5000/resort/example');
                const responseData: SkiAreaDataResponse = await response.json();
                setName(responseData.data.name);
                setLat(responseData.data.location.latitude);
                setLong(responseData.data.location.longitude);
                setTwitterUser(responseData.data.twitter.user);
            } catch (e) {
                console.error(e)
            }
        };

        fetchSkiAreaData();
    }, []);

    if(name) {
        return (
            <Container text>
                <Header size="huge">{ name }</Header>
                <Container textAlign='right'>
                    <p style={{ color: "royalblue" }}>Twitter: { twitterUser }</p>
                </Container>
                <Container textAlign='right'>
                    <p><small><span style={{ color: "royalblue" }}><Icon name='map outline' /></span> { lat }, { long }</small></p>
                </Container>
            </Container>
        )
    } else {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    }
};

export default SkiAreaData;
