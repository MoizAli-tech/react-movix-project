import React from 'react'
import { useSelector } from "react-redux";
import { Root_Redux, Genres_Redux } from '../../redux/datatypes/types';
import "./style.scss"
interface Props {
    data: number[]
}
const Genres: React.FC<Props> = ({ data }) => {
    const genres: Genres_Redux = useSelector((state: Root_Redux) => state.home.genres)


    return (
        <div className='genres'>
            {
                data?.map((genre) => {

                    if (!genres[genre]?.name) {
                        return
                    }

                    return (
                        <div key={genre} className="genre">
                            {
                                genres[genre]?.name
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres