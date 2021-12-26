import React from "react"

const DisplayReviews = ({ reviews }) => {
  if (reviews.length === 0)
    return <p>We don't have any reviews for this move</p>

  return (
    <ul>
      {reviews.map(({ author, content, id }) => (
        <li key={id}>
          <h2>{author}</h2>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  )
}

export default DisplayReviews
