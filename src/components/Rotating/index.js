import React from "react"



const Rotating = ({double, children, size=200, style , inside}) => {

  return <div className={`rotating ${double && "double"} ${inside && "inside"}`} style={{...style, width: size, height: size}}>
    {children}
  </div>
}

export default Rotating