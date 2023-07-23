import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import { Results, Data } from "../../GeneralTypes/generalTypes"

type Props = {
    mediaType: string | undefined,
    id: string | undefined
}



const Recommendation: React.FC<Props> = ({ mediaType, id }) => {
    const { data, loading, error }: { data: Data; loading: boolean, error: string } = useFetch(`/${mediaType}/${id}/recommendations`);

    return (
        <div>
            {
                (data?.results?.[0]) ?
                    < Carousel
                        title="Recommendations"
                        data={data?.results}
                        loading={loading}
                        endpoint={mediaType}
                    />
                    :
                    <div>

                    </div>
            }

        </div>

    );
};

export default Recommendation;