import React, { useEffect, useState } from "react"
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom"
import styles from "./MovieDetailsPage.module.css"

const MovieDetailsPage = ({ apiKey, imgSrc }) => {
  const [moves, setMoves] = useState([])
  let navigate = useNavigate()
  let { id } = useParams()
  let location = useLocation()

  useEffect(() => {
    /* isMounted solve problem with memory leak
       Warning: Can't perform a React state update on an unmounted component.
    */
    let isMounted = true

    const fetchMove = (id) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      )
        .then((resp) => resp.json())
        .then((move) => (isMounted ? setMoves(move) : null))
        .catch((er) => console.log("MoveDetailsPage fetch fail! -> " + er))
    }
    fetchMove(id)

    return () => {
      isMounted = false
    }
  }, [id, apiKey])

  // useHistory -> useNavigate in v6
  // nextPage 1
  // prevPage -1
  const goBack = () => {
    const { pathname } = location
    if (pathname.endsWith("cast") || pathname.endsWith("reviews"))
      return navigate(-3)

    return navigate(-1)
  }

  const getImgSrc = (poster = "noImg") => {
    if (poster === "noImg") return ""

    const { secure_base_url, poster_sizes } = imgSrc
    return `${secure_base_url}${poster_sizes[1]}${poster}`
  }

  const { original_title, overview, vote_average, genres, poster_path } = moves
  return (
    <>
      <button className={styles.Button} type="button" onClick={goBack}>
        ◀
      </button>
      <div className={styles.Wrapper}>
        <img className={styles.Image} src={getImgSrc(poster_path)} alt="💩" />
        <div>
          <h1 className={styles.Title}>{original_title}</h1>
          <p>User score: {vote_average}</p>
          <h2 className={styles.Overwiew}>Overwiew</h2>
          <p>{overview}</p>
          <h2 className={styles.Genres}>Genres</h2>
          <p>{genres?.map(({ name }) => name + ", ")}</p>
        </div>
      </div>
      <div className={styles.Info}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  )
}

export default MovieDetailsPage
