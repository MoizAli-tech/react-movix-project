import React from 'react';
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideoSection from './videoSection/VideoSection';
import Similar from './crousels/Similar';
import Recommendation from './crousels/Recommendations';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: videos, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);


    return (
        <div>
            <DetailsBanner
                video={videos?.results?.[0]}
                credits={credits?.crew}
            />

            <Cast loading={creditsLoading} data={credits?.cast} />
            <VideoSection data={videos?.results} loading={videoLoading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />


        </div>
    )
}

export default Details