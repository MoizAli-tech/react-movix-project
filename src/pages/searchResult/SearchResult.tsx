import InfiniteScroll from 'react-infinite-scroll-component'
import noResult from "../../assets/no-results.png";
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/contentWrapper';
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { Results, Data } from '../GeneralTypes/generalTypes';
import Spinner from "../../components/spinner/Spinner"
import MovieCard from '../../components/movieCard/MovieCard';

import "./style.scss"

const SearchResult = () => {
    const [data, setData] = useState<null | Data>(null);
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const { query } = useParams();

    function fetchInitialData() {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((response: Data) => {
                setData(response);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            })
    }

    function fetchNextPageData() {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((response: Data) => {
                if (data?.results) {
                    setData(
                        {
                            ...data,
                            results: [...data.results, ...response.results]
                        }
                    );
                } else {
                    setData(response)
                }
                setPageNum((prev) => prev + 1);

            })
    }

    useEffect(() => {
        setPageNum(1)
        fetchInitialData();
    }, [query])

    return (
        <div className="searchResultsPage">
            {
                loading && <Spinner initial={true} />}

            {
                !loading && (
                    <ContentWrapper>
                        {(data && data?.results?.length > 0) ?
                            (
                                <div>
                                    <div className='pageTitle'>
                                        {`Searching for '${query}'`}
                                    </div>
                                    <InfiniteScroll
                                        className='content'
                                        dataLength={data?.results?.length}
                                        next={fetchNextPageData}
                                        hasMore={pageNum <= data?.total_pages}
                                        loader={<Spinner />}

                                    >
                                        {data?.results?.map((item, index) => {
                                            if (item.media_type == "person") { return; }
                                            return (
                                                <MovieCard key={index} data={item} mediaType={item.media_type} />
                                            )
                                        })}
                                    </InfiniteScroll>
                                </div>

                            ) :
                            (<span className={`resultNotFound`}>NO Results Avaliable</span>)
                        }
                    </ContentWrapper>
                )
            }
        </div>
    )
}

export default SearchResult