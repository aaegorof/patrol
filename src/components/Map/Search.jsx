import React, {useState, useEffect} from "react"
import Input from "../Input";

const Search = ({issues, onSearch, activeId, activeMap}) => {
  const [list, setList] = useState(issues)
  const [searchVal, setSearchVal] = useState("")
  const [isListOpen, setIsListOpen] = useState(false)
  const [localId, setLocalId] = useState(null)

  useEffect(() => {
    setList(issues)
  }, [issues])
  useEffect(() => {
    if(localId !== activeId) {
      setSearchVal("")
    }
  },[activeId])

  const onRegionClick = region => {
    onSearch(region.region_num)
    setLocalId(region.region_num)
    setIsListOpen(false)
    setSearchVal(region.region)
  }

  const _onSearch = val => {
    setSearchVal(val);
    setIsListOpen(val.length > 0)
    setList(issues.filter(item => item.region.toLowerCase().includes(val.toLowerCase())))
    if(val.length === 0){
      onSearch(null)
    }
  }

  return <div className="search-wrap">

    <Input className={"search-input"} value={searchVal} onChange={_onSearch} placeholder={"Искать по регионам"}/>

    <div className={`search-list-wrap ${isListOpen ? "opened" : ""}`}>
      <div className="search-list">
        {list.map(item => <div onClick={() => onRegionClick(item)}>
          {item.region}
        </div>)}
      </div>
    </div>
  </div>
}

export default Search
