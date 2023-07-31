import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { URL } from "../../config";
import SkiArea from "./SkiArea";
import axios from "axios";
import { SkiResort, SkiResortDataResponse } from "../../interfaces/skiAreaInterfaces";

const SkiAreaData = () => {
    const [skiAreaResponse, setSkiAreaResponse] = useState<SkiResort[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkiAreaData =async () => {
            try {
                const response: SkiResortDataResponse = await axios.get(`${URL}/ski-areas`);
                setSkiAreaResponse(response.data);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        fetchSkiAreaData();
    }, []);

    if(skiAreaResponse === null) {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    } else {
        return (
            <div>
                {skiAreaResponse.map((skiArea) => (
                    <SkiArea 
                        key={skiArea.slug}
                        slug={skiArea.slug}
                        name={skiArea.name}
                        country={skiArea.country}
                        region={skiArea.region}
                        lat={skiArea.location.latitude}
                        long={skiArea.location.longitude}
                        url={skiArea.url}
                    />
            ))}
            </div>
        );
    }
};

export default SkiAreaData;
