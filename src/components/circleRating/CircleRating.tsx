import React from 'react'
import "./style.scss"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
    rating: number
}

const CircleRating: React.FC<Props> = ({ rating }) => {
    return (
        <div className='circleRating'>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating.toString()}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    )
}

export default CircleRating