import React, {useState, useEffect} from "react"
import Input from "../Input";

const Search = ({issues, onSearch, activeId, activeMap}) => {
  const [list, setList] = useState(issues)
  useEffect(() => {
    setList(issues)
  }, [issues])
  return <div className="search-wrap">
    <Input className={"search-input"} />
    <div className="search-list">
      {list.map(item => <div onClick={() => onSearch(item.region_num)}>
        {item.region_num}{item.region}
      </div>)}
    </div>
  </div>
}

export default Search
