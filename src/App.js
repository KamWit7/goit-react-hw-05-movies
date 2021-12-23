import HomePage from "./Pages/HomePage/HomePage"
import MoviesPage from "./Pages/MoviesPage/MoviesPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import MovieDetailsPage from "./Pages/MovieDetailsPage/MovieDetailsPage"
import Navigation from "./Components/Navigation/Navigation"
import Cast from "./Components/Cast/Cast"
import Reviews from "./Components/Reviews/Reviews"

function App() {
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
              <MoviesPage />
            </>
          }
        >
          
        </Route>

        <Route
          path="/movies/:id"
          element={
            <>
              <Navigation />
              <MovieDetailsPage />
            </>
          }
        >
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
