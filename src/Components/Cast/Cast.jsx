import React from "react"
import { useLocation, useParams } from "react-router-dom"

const Cast = () => {
  let { id } = useParams()
  console.log("id Cast", id)
  return <div>castt!!!</div>
}

export default Cast
