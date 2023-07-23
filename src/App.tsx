import './App.css'
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { fetchDataFromApi } from "./utils/api"
import { getApiConfiguration, getGenres } from './redux/reducers/homeSlice'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home";
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchResult/SearchResult'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import { Genres_Redux } from './redux/datatypes/types'

type GenresArray = Genres[]

interface Genres {
  genres: Genre[]
}

interface Genre {
  id: number
  name: string
}




function App() {
  const dispatch = useDispatch();



  useEffect(() => {
    fetchDataFromApi('/configuration').then((response) => {

      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url))
    }).catch((error) => {
      console.log("An error occurred in configuration api")
    })
  }, [])

  const genresCall = async () => {
    let promises: Promise<Genres>[] = [];
    let endPoints: string[] = ["tv", "movie"];
    let addGenres: Genres_Redux = {};
    try {
      endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
      })

      const data: GenresArray = await Promise.all(promises);
      data.map(({ genres }, i) => {
        return genres.map((item, i) => {
          addGenres[item.id] = item;
        })
      })
      dispatch(getGenres(addGenres))


    } catch (error) {
      console.log(error)
    }



  }
  // genresCall();
  return (

    <div className={"App"}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>


  )
}

export default App
