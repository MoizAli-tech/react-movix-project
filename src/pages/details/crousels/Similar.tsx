import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

type Props = {
    mediaType: string | undefined,
    id: string | undefined
}


const Similar: React.FC<Props> = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <div>
            {
                (data?.results?.[0]) ?
                    < Carousel
                        title={title}
                        data={data?.results}
                        loading={loading}
                        endpoint={mediaType}
                    />
                    :
                    <div>
                        no similar
                    </div>
            }
        </div>
    );
};

export default Similar;
