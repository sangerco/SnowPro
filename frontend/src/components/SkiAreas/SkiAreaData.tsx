import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import SkiArea from "./SkiArea";
import axios from "axios";

interface SkiResort {
    slug: string;
    name: string;
    country: string;
    region: string;
    location: {
      latitude: number;
      longitude: number;
    };
    url: string;
}

interface SkiResortDataResponse {
    object: {
      page: number;
      per_page: number;
      pre_page: null;
      next_page: number;
      total: number;
      total_pages: number;
    };
    data: SkiResort[];
} 

const SkiAreaData = () => {
    const [skiAreaResponse, setSkiAreaResponse] = useState<SkiResort[]>([]);

    useEffect(() => {
        const fetchSkiAreaData =async () => {
            try {
                const response: SkiResortDataResponse = await axios.get('http://localhost:5000/ski-areas');
                setSkiAreaResponse(response.data);
            } catch (e) {
                console.error(e)
            }
        };

        fetchSkiAreaData();
    }, []);

    if(skiAreaResponse) {
        return (
            <div>
                {skiAreaResponse.map((skiArea) => (
                    <SkiArea 
                        key={skiArea.slug}
                        name={skiArea.name}
                        country={skiArea.country}
                        region={skiArea.region}
                        lat={skiArea.location.latitude}
                        long={skiArea.location.longitude}
                        url={skiArea.url}
                    />
            ))}
            </div>
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
