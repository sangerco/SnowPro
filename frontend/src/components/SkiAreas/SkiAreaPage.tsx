import React, { useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { skiAreaDataUrl } from '../../config';
import axios from 'axios';
import { SkiAreaData } from '../../interfaces/skiAreaInterfaces';
import { useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';


const SkiAreaPage = () => {
    const slug = useParams();

    const [skiAreaData, setSkiAreaData] = useState<SkiAreaData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkiAreaData = async () => {
            try {
                const response = await axios.get(`${skiAreaDataUrl}/${slug}`);
                const responseData: SkiAreaData = response.data;
                setSkiAreaData(responseData);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
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
        return (
            <div>
                <Header>
                    {skiAreaData.data.name}
                </Header>
                <p>{skiAreaData.data.slug}</p>
            </div>
        )
    }

};

export default SkiAreaPage;