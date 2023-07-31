import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../config';
import { Container, Header, Icon } from "semantic-ui-react";
import { SkiAreaProps, SkiAreaData } from '../../interfaces/skiAreaInterfaces';

const SkiArea: React.FC<SkiAreaProps> = ({ slug, name, country, region, lat, long, url }) => {
    const [skiAreaDataObject, setSkiAreaDataObject] = useState({href: ''});

    useEffect(() => {
        const fetchSkiAreaData = async () => {
            try {
                const response: SkiAreaData = await axios.get(`${URL}/ski-areas/${slug}`);
                setSkiAreaDataObject(response.data)
            } catch (e) {
                console.error(e)
            }
        };

        fetchSkiAreaData()
    }, [slug])

    const href = skiAreaDataObject.href;

    return (
        <Container text>
            <Header size="huge"><a href={href}>{ name }</a></Header>
            <Container textAlign='right'>
                <p style={{ color: "royalblue" }}>{ country }</p>
                <p style={{ color: "royalblue" }}>{ region }</p>
                {/* <a style={{ color: "royalblue" }} href={url}>{ url }</a> */}
            </Container>
            <Container textAlign='right'>
                <p><small><span style={{ color: "royalblue" }}><Icon name='map outline' /></span> { lat }, { long }</small></p>
            </Container>
        </Container>
    )
}

export default SkiArea;