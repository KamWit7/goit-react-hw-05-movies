import { Link } from "react-router-dom"

const MovesLink = ({ moves }) => {
  return (
    <ul>
      {moves.map((move) => (
        <li key={move.id}>
          <Link to={`/movies/${move.id}`}>
            {move.original_title ?? move.original_name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MovesLink
