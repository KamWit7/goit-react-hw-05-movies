import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DisplayReviews from "../DisplayReviews/DisplayReviews"

//

const Reviews = ({ apiKey }) => {
  const [reviews, setReviews] = useState([])
  let { id } = useParams()

  useEffect(() => {
    const fetchReviews = (id) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
      )
        .then((resp) => resp.json())
        .then((reviews) => setReviews(reviews.results))
        .catch((er) => console.log("Reviews error fetch ->" + er))
    }

    fetchReviews(id)
  }, [id, apiKey])

  return (
    <section>
      <DisplayReviews reviews={reviews} />
    </section>
  )
}

export default Reviews
