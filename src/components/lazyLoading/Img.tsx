import React from 'react'
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component"

interface Props {
    src: string | undefined,
    classes: string
}

const Img: React.FC<Props> = ({ src, classes }) => {
    return (
        <LazyLoadImage
            className={classes || ""}
            alt=''
            effect='blur'
            src={src}
        />
    )
}

export default Img