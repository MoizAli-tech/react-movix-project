import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoading/Img';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import "./style.scss"
import { Root_Redux } from '../../../redux/datatypes/types';

const HeroBanner = () => {
    const [background, setBackground] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    const navigate = useNavigate();

    const { data, loading } = useFetch("/movie/upcoming");

    const { url } = useSelector((state: Root_Redux) => state.home)


    useEffect(() => {
        if (!loading) {
            const bg = url.backdrop + data?.results[Math.ceil(Math.random() * 20)].backdrop_path
            setBackground(bg);
        }

    }, [data])




    const searchQueryHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter" && query.length > 0) {
            navigate(`search/${query}`)
        }
    }

    const searchBtnHandler = () => {
        if (query.length > 0) {
            navigate(`search/${query}`)

        }
    }

    return (
        <div className='heroBanner'>
            {
                !loading ?
                    <div className="backdrop-img">
                        <Img src={background} classes="" />
                    </div>
                    :
                    <div>
                    </div>
            }

            <div className='opacity-layer'></div>
            <ContentWrapper>

                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">Million of movies, tv shows and people to discover. Explore Now.</span>
                    <div className="searchInput">
                        <input type="text"
                            placeholder="Search for a movie or tv show"
                            onKeyUp={(e) => searchQueryHandler(e)}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={searchBtnHandler}> Search </button>
                    </div>


                </div>
            </ContentWrapper>



        </div>
    )
}

export default HeroBanner