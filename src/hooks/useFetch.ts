import { fetchDataFromApi } from "../utils/api";
import { useState, useEffect } from "react"


const useFetch = (url: string) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<any>({ results: [] });

    useEffect(() => {
        setData({});
        setError("");
        setLoading(true)


        fetchDataFromApi(url).then((response) => {
            if (response) {
                setData(response);
                setLoading(false);
                // console.log(data);
            }
        }).catch((error) => {
            console.log(error)
            setError("Something went wrong");
        })

    }, [url])

    return {
        data, loading, error
    }
}

export default useFetch