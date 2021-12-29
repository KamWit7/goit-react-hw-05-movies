import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useDebugValue,
} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import Navigation from "./Components/Navigation/Navigation"
import Reviews from "./Components/Reviews/Reviews"
import Loading from "./Components/Loading/Loading"
import NotFound from "./Components/NotFound/NotFound"
import { ImgSrcContext } from "./Context/ImgSrcContext/ImgSrcContext"

const API_KEY = "62e18f2bbf2294ce6ea3f49ffd7e99af"

function App() {
  const MovieDetailsPage = React.lazy(() =>
    import("./Pages/MovieDetailsPage/MovieDetailsPage")
  )
  const MoviesPage = lazy(() => import("./Pages/MoviesPage/MoviesPage"))
  const Cast = lazy(() => import("./Components/Cast/Cast"))

  const useImgSrc = () => {
    const [imgSrc, setImgSrc] = useState({
      secure_base_url: "",
      poster_sizes: [],
      profile_sizes: [],
    })

    // cosnt

    useEffect(() => {
      const fetchImgConfiguration = (apiKey) => {
        fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
          .then((resp) => resp.json())
          .then((resp) => resp.images)
          .then(({ secure_base_url, poster_sizes, profile_sizes }) => {
            setImgSrc({ secure_base_url, poster_sizes, profile_sizes })
          })
          .catch((er) => console.log("MoveDetailsPage fetch fail! -> " + er))
      }
      fetchImgConfiguration(API_KEY)
    }, [])

    useDebugValue(imgSrc, "loading...")

    return imgSrc
  }

  const imgSrc = useImgSrc()

  return (
    <BrowserRouter>
      <ImgSrcContext.Provider value={imgSrc}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <HomePage />
                </Suspense>
              </>
            }
          />

          <Route
            path="/movies"
            element={
              <>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <MoviesPage apiKey={API_KEY} />
                </Suspense>
              </>
            }
          />

          <Route
            path="/movies/:id"
            element={
              <>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <MovieDetailsPage apiKey={API_KEY} imgSrc={imgSrc} />
                </Suspense>
              </>
            }
          >
            <Route
              path="cast"
              element={
                <Suspense fallback={<Loading />}>
                  {/* Context for srcImg  */}
                  <Cast apiKey={API_KEY} />
                </Suspense>
              }
            />
            <Route path="reviews" element={<Reviews apiKey={API_KEY} />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </ImgSrcContext.Provider>
    </BrowserRouter>
  )
}

export default App
