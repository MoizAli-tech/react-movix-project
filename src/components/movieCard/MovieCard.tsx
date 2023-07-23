import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { Root_Redux } from "../../redux/datatypes/types";
import { Data, Results } from "../../pages/GeneralTypes/generalTypes";
import Img from "../lazyLoading/Img";
import PosterFallBack from "../../assets/no-poster.png"

type Props = {
    data: Results,
    mediaType: string,
}



const MovieCard: React.FC<Props> = ({ data, mediaType }) => {
    const { url } = useSelector((state: Root_Redux) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallBack;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img classes="posterImg" src={posterUrl} />

                <React.Fragment>
                    <CircleRating rating={data.vote_average} />
                    <Genres data={data.genre_ids.slice(0, 2)} />
                </React.Fragment>

            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;