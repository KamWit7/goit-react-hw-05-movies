import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import DisplayCast from "../DisplayCast/DisplayCast"
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

const Cast = ({ apiKey }) => {
  const [cast, setCast] = useState([])
  let { id } = useParams()

  useEffect(() => {
    const fetchCast = (id) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      )
        .then((resp) => resp.json())
        .then((cast) => setCast(cast.cast))
        .catch((er) => console.log("Cast fetch fail! -> " + er))
    }

    fetchCast(id)
  }, [id, apiKey])

  return (
    <section>
      <DisplayCast cast={cast} />
    </section>
  )
}

export default Cast
