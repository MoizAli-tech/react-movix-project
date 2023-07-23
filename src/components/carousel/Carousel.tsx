import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/contentWrapper";
import Img from "../lazyLoading/Img";
import { Root_Redux } from "../../redux/datatypes/types";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
import Genres from "../genres/Genres";
import PosterFallBack from "../../assets/no-poster.png"

//TypeScript data Types

type carouselItem = {
    adult: boolean
    backdrop_path: string
    id: number
    name?: string
    title?: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface Props {
    loading: boolean,
    data: Array<carouselItem>
    endpoint?: string
    title?: string
}




const Carousel: React.FC<Props> = ({ title, data, loading, endpoint }) => {

    const carouselContainer = useRef<HTMLDivElement | null>(null);
    const { url } = useSelector((state: Root_Redux) => state.home);
    const navigate = useNavigate();

    function navigation(ty: "left" | "right") {
        const container = carouselContainer.current;
        if (container) {
            let scrollAmount: number = 0;
            switch (ty) {

                case "left":
                    console.log("left")
                    scrollAmount = container?.scrollLeft - (container?.offsetWidth + 20)
                    break;
                case "right":
                    scrollAmount = container?.scrollLeft + (container?.offsetWidth + 20)
                    break;
                default:
                    console.error("Enter a valid type");
                    scrollAmount = 0;
                    break;
            }

            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
            })


        }

    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"carousel"}>
            <ContentWrapper>
                {title &&
                    <div className="carouselTitle">
                        {title}
                    </div>
                }
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")} />
                {!loading ?
                    (
                        <div className="carouselItems" ref={carouselContainer} >
                            {
                                data?.map((item: carouselItem) => {
                                    let posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallBack;

                                    return (
                                        <div key={item?.id} className="carouselItem" onClick={() => navigate(`/${item.media_type ? item.media_type : endpoint}/${item.id}`)}>
                                            <div className="posterBlock">
                                                <Img src={posterUrl} classes={""} />
                                                <CircleRating rating={item.vote_average} />
                                                <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>

                                            <div className="textBlock">
                                                <span className="title">
                                                    {item.title || item.name}
                                                </span>
                                                <span className="date">
                                                    {dayjs(item.release_date).format('MMM DD, YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) :

                    (<div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>)}
            </ContentWrapper>
        </div>
    )
}

export default Carousel