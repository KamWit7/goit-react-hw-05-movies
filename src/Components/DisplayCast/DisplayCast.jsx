import React from "react"

const DisplayCast = ({ cast, imgSrc }) => {
  const getImgSrc = (profile = "noImg") => {
    if (profile === "noImg" || profile === null) return ""
    const { secure_base_url, profile_sizes } = imgSrc

    return `${secure_base_url}${profile_sizes[1]}${profile}`
  }
  return (
    <ul>
      {cast.map(({ profile_path, original_name, character, cast_id }) => (
        <li key={cast_id}>
          <img src={getImgSrc(profile_path)} alt="💩" />
          <p>
            {original_name} as {character}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default DisplayCast
