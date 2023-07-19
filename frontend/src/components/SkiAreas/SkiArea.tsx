import React from 'react';
import { Container, Header, Icon } from "semantic-ui-react";

interface SkiAreaProps {
    name: string;
    country: string;
    region: string;
    lat: number;
    long: number;
    url: string
}

const SkiArea: React.FC<SkiAreaProps> = ({ name, country, region, lat, long, url }) => {
    
    return (
        <Container text>
            <Header size="huge">{ name }</Header>
            <Container textAlign='right'>
                <p style={{ color: "royalblue" }}>{ country }</p>
                <p style={{ color: "royalblue" }}>{ region }</p>
                <a style={{ color: "royalblue" }} href={url}>{ url }</a>
            </Container>
            <Container textAlign='right'>
                <p><small><span style={{ color: "royalblue" }}><Icon name='map outline' /></span> { lat }, { long }</small></p>
            </Container>
        </Container>
    )
}

export default SkiArea;