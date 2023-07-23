import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoading/Img";
import PosterFallBack from "../../../assets/no-poster.png"
import { Root_Redux } from "../../../redux/datatypes/types";
import CircleRating from "../../../components/circleRating/CircleRating";
import PlayIcon from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";


type genre = { id: number, name: string }
type crew = {
    adult: boolean
    credit_id: string
    department: string
    gender: number
    id: number
    job: string
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
}

type Props = {
    video: {
        id: number
        iso_639_1: string
        iso_3166_1: string
        key: string
        name: string
        official: true
        published_at: Date
        site: string
        size: number
        type: string
    }

    ,
    credits: crew[]
}

const DetailsBanner: React.FC<Props> = ({ video, credits: crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);


    const { url } = useSelector((state: Root_Redux) => state.home);

    const _genres = data?.genres?.map((genre: genre) => {
        return genre.id;
    })


    const director = crew?.filter((f) => {
        f.job === "Director"
    })

    const writer = crew?.filter((f) => f.job == "Screenplay" || f.job == "Story" || f.job == "Writer")


    return (
        <div className="detailsBanner">
            {(!loading && data) ? (
                <div>
                    <div className="backdrop-img">
                        <Img classes={``} src={url.backdrop + data.backdrop_path} />
                    </div>

                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ?
                                    (<Img classes="posterImg"
                                        src={url.backdrop + data.poster_path}
                                    />
                                    )
                                    :
                                    (
                                        <Img src={PosterFallBack} classes="" />
                                    )
                                }
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title}
                                    ${dayjs(data.release_data).format("YYYY")}
                                    `}
                                </div>
                                <div className="subtite">
                                    {data.tagline}
                                </div>
                                <Genres data={_genres} />

                                <div className="row">
                                    <CircleRating rating={data.vote_average} />
                                    <div onClick={() => {
                                        setShow(true)
                                        setVideoId(video.key)
                                    }} className="playbtn">
                                        <PlayIcon />
                                        <span className="text">Watch Trailer</span>
                                    </div>

                                </div>

                                <div className="overview">

                                    <div className="heading">OverView</div>
                                    <div className="description">
                                        {data.overview}
                                    </div>

                                </div>

                                <div className="info">
                                    {data.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status: {""}
                                            </span>

                                            <span className="text">
                                                {data.status}
                                            </span>
                                        </div>

                                    )}

                                    {data.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Release Date: {""}
                                            </span>

                                            <span className="text">
                                                {dayjs(data.release_date).format("MMM DD YYYY")}
                                            </span>
                                        </div>

                                    )}



                                </div>

                                {
                                    director?.length > 0
                                    &&
                                    (
                                        <div className="info">
                                            <span className="text bold">
                                                Director:{""}
                                            </span>
                                            <span className="text">
                                                {director?.map((d, i) =>
                                                (
                                                    <span key={i}>
                                                        {d.name}
                                                        {director.length - 1 !== i && ','}
                                                    </span>
                                                )

                                                )}
                                            </span>
                                        </div>
                                    )
                                }

                                {
                                    writer?.length > 0
                                    &&
                                    (
                                        <div className="info">
                                            <span className="text bold">
                                                Writer:{""}
                                            </span>
                                            <span className="text">
                                                {writer?.map((w, i) =>
                                                (
                                                    <span key={i}>
                                                        {w.name}
                                                        {director.length - 1 !== i && ','}
                                                    </span>
                                                )

                                                )}
                                            </span>
                                        </div>
                                    )
                                }

                            </div>


                        </div>
                    </ContentWrapper>

                    <VideoPopup
                        show={show}
                        videoId={videoId}
                        setShow={setShow}
                        setVideoId={setVideoId}

                    />

                </div>

            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;