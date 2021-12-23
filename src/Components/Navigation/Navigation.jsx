import React from "react"
import { Link, NavLink } from "react-router-dom"
import styles from "./Navigation.module.css"

const Navigation = () => {

  let activeStyle = {
    color: "blue",
  }

  return (
    <nav className={styles.Navigation}>
      <NavLink
        className={styles.Link}
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        className={styles.Link}
        to="/movies"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Movies
      </NavLink>
    </nav>
  )
}

export default Navigation
