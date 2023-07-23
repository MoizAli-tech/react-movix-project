import React, { useState, useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./style.scss";
import Img from "../../../components/lazyLoading/Img";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import PlayIcon from "../PlayIcon";

type video = {
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

type Props = {
    data: video[],
    loading: boolean
}

const VideoSection: React.FC<Props> = ({ data, loading }) => {
    const [show, setShow] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const carouselContainer = useRef<HTMLDivElement | null>(null);

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

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")} />

                {!loading ? (
                    <div className="videos" ref={carouselContainer}>
                        {
                            data?.map((video) => (
                                <div onClick={() => {
                                    setShow(true)
                                    setVideoId(video.key)
                                }} key={video.id} className="videoItem">
                                    <div className="videoThumbnail">
                                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                            classes="" />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle">
                                        {video.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideoSection;