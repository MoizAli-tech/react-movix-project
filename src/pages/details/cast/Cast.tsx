import React, { useRef } from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import Img from "../../../components/lazyLoading/Img";
import avatar from "../../../assets/avatar.png";
import { Root_Redux } from "../../../redux/datatypes/types";

type cast = {
    adult: boolean
    cast_id: number
    character: string
    credit_id: string
    gender: number
    id: number
    known_for_department: string
    name: string
    order: number
    original_name: string
    popularity: number
    profile_path: string
}

type Props = {
    data: cast[],
    loading: boolean
}

const Cast: React.FC<Props> = ({ data, loading }) => {
    const { url } = useSelector((state: Root_Redux) => state.home);
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

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")} />
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems" ref={carouselContainer}>
                        {
                            data?.map((item) => {
                                let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
                                return (
                                    <div key={item.id} className="listItem">
                                        <div className="profileImg">
                                            <Img src={imgUrl} classes="" />
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">{item.character}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;