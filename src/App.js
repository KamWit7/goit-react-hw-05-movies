import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import MoviesPage from "./Pages/MoviesPage/MoviesPage"
import MovieDetailsPage from "./Pages/MovieDetailsPage/MovieDetailsPage"
import Navigation from "./Components/Navigation/Navigation"
import Reviews from "./Components/Reviews/Reviews"
import Cast from "./Components/Cast/Cast"

const API_KEY = "62e18f2bbf2294ce6ea3f49ffd7e99af"

function App() {
  const [imgSrc, setImgSrc] = useState({
    secure_base_url: "",
    poster_sizes: [],
    profile_sizes: [],
  })

  useEffect(() => {
    const fetchImgConfiguration = (apiKey) => {
      fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
        .then((resp) => resp.json())
        .then((resp) => resp.images)
        .then(({ secure_base_url, poster_sizes, profile_sizes }) => {
          setImgSrc((prevConfig) => {
            return {
              ...prevConfig,
              secure_base_url,
              poster_sizes,
              profile_sizes,
            }
          })
        })
        .catch((er) => console.log("MoveDetailsPage fetch fail! -> " + er))
    }
    fetchImgConfiguration(API_KEY)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <HomePage />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Navigation />
              <MoviesPage apiKey={API_KEY} />
            </>
          }
        ></Route>

        <Route
          path="/movies/:id"
          element={
            <>
              <Navigation />
              <MovieDetailsPage apiKey={API_KEY} imgSrc={imgSrc} />
            </>
          }
        >
          <Route
            path="cast"
            element={<Cast apiKey={API_KEY} imgSrc={imgSrc} />}
          />
          <Route path="reviews" element={<Reviews apiKey={API_KEY} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
