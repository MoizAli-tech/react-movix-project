import React, { useState } from 'react'
import "../style.scss"
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)

    function onTabChange(tab: string, index: number): any {
        setEndpoint(tab.toLowerCase());
    }
    return (

        <div className={'carouselSection'}>
            <ContentWrapper >
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movie", "TV"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default TopRated