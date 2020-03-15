import React, { useState } from "react"
import classNames from "classnames"

const Collapser = ({ children, disabled, onCollapse, opened = false }) => {
  const [header, ...rest] = children
  const [isCollapsed, setIsCollapsed] = useState(!opened)
  const onToggle = () => {
    if (onCollapse) {
      onCollapse()
    }
    setIsCollapsed(!isCollapsed)
  }
  const classObj = {
    disabled,
    collapsed: isCollapsed
  }

  return (
      <div className={`collapser ${classNames(classObj)}`}>
        <div className="collapser-header" onClick={!disabled && onToggle}>
          {header}
        </div>
        {rest && <div className="collapser-body">{rest}</div>}
      </div>
  )
}

export default Collapser
