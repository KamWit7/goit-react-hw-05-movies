import React, { useEffect, useState } from "react"
import { Link, Outlet, useParams, useNavigate } from "react-router-dom"

const MovieDetailsPage = () => {
  const [move, setMove] = useState([])

  let navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    const fetchMove = (id) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=62e18f2bbf2294ce6ea3f49ffd7e99af&language=en-US`
      )
        .then((resp) => resp.json())
        .then((move) => setMove(move))
    }
    fetchMove(id)
  }, [id])

  // useHistory -> useNavigate in v6
  // nextPage 1
  // prevPage -1
  const goBack = () => navigate(-1)

  const { original_title, overview, vote_average, genres } = move

  return (
    <>
      <button type="button" onClick={goBack}>
        Go home
      </button>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <img
          src="https://i.ytimg.com/vi/smsXXzC1IsA/hqdefault.jpg"
          style={{ objectFit: "contain", width: "200px" }}
          alt=""
        />
        <div>
          <h1>{original_title}</h1>
          <p>User score: {vote_average}</p>
          <h2>Overwiew</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genres?.map(({ name }) => name + ", ")}</p>
        </div>
      </div>
      <div>
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
