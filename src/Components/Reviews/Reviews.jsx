import React from "react"
import { useParams } from "react-router-dom"

const Reviews = ({ moveId }) => {
  let { userId } = useParams()
  userId = moveId
  console.log("userId", userId)
  return <div>Reviews</div>
}

export default Reviews
