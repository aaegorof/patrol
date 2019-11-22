import React from "react"

const Icon = ({name}) => {
  const url = `../../img/icon/${name}.svg`
  return <img className="icon" src={url}/>
}

export default Icon