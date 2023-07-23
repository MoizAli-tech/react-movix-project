import axios from "axios";

const BASE_URL: string = "https://api.themoviedb.org/3"
const TMDB_TOKEN: string = import.meta.env.VITE_APP_TMDB_TOKEN

const headers = {
    Authorization: "bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDUzYjk2NTZjOTI4NWNmM2RhOTg1YmUyMmUwYzczZCIsInN1YiI6IjY0YjNjNzI3ZTBjYTdmMDEwNjk3YzQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D0Ie4bTj9NfSb1qiXMsBL1CR1Eq1mRxgQq55AUoDC7E"
}
export const fetchDataFromApi = async (url: string, params?: any) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}