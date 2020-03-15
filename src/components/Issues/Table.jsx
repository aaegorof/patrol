import React, { useReducer, useEffect } from "react"
import { ascend, descend, filter as Rfilter, prop, sort, fromPairs, isNil } from "ramda"
import Input from "../Input"

function sortedTableReducer(oldState, newState) {
  // Implements the logic of sorting and filtering the table or list data
  const { listArray, sortBy, isDesc, filter, filteredKey } = {
    ...oldState,
    ...newState
  }

  const direction = isDesc ? descend : ascend
  const sortFunc = sort(direction(prop(sortBy)))
  const filterFunc = item => {
    return filteredKey ? item[filteredKey].toLowerCase().includes(filter.toLowerCase()) : item
  }

  const sortedAndFilteredTable = Rfilter(filterFunc, sortFunc(listArray))

  return {
    listArray: sortedAndFilteredTable,
    sortBy,
    isDesc,
    filter,
    filteredKey
  }
}

const defaultLabels = (labelsArray, listArray)  => {
  // If no labels is presented as props it will automatically create the labels from object keys
  const obj = listArray[0]
  const arrayKeys =  fromPairs(
      Object.keys(obj).map(itemKey => {
        return [itemKey, labelsArray[itemKey] ? labelsArray[itemKey] : itemKey]
      })
  )
  return {...labelsArray, ...arrayKeys}
}

const reorderPropinObj = (fromObj, toObj) => {
  // Returns the object with the prop order like in the other object
  const toKeysOrder = Object.keys(toObj)
  const newObjOrder = Object.keys(fromObj).map((item, i) => {
    const key = toKeysOrder[i]
    return [[key], fromObj[key]]
  })
  return fromPairs(newObjOrder)
}

const Table = ({
                 listArray = [{id: 0}],
                 id = "id",
                 labels = defaultLabels([],listArray),
                 sortBy = Object.keys(listArray[0])[0],
                 isDesc = true,
                 count = true,
                 filter = "",
                 filteredKey = null,
                 callback,
                 columns = false,
                 ...rest
               }) => {
  const mixLabels = defaultLabels(labels, listArray)
  const [sortedListArray, sortedListArrayDispatch] = useReducer(sortedTableReducer, {
    // Reorders the columns of the table to fit the labels props if it is provided
    listArray: listArray.map(row => reorderPropinObj(row, mixLabels)),
    sortBy,
    isDesc,
    filter,
    filteredKey
  })

  useEffect(() => {
    sortedListArrayDispatch(listArray)
  }, [listArray])

  useEffect(() => {
    callback && callback(sortedListArray)
  }, [sortedListArray])

  const doSort = column => () => {
    const direction = column === sortedListArray.sortBy ? !sortedListArray.isDesc : false
    sortedListArrayDispatch({
      sortBy: column,
      isDesc: direction
    })
  }

  return (
      <div className="table-wrap" {...rest}>
        <div className="table-header">
          {filteredKey && (
              <Input
                  value={sortedListArray.filter}
                  text={`You can filter by ${filteredKey}`}
                  onChange={val =>
                      sortedListArrayDispatch({
                        listArray: listArray.map(row => reorderPropinObj(row, mixLabels)),
                        filter: val
                      })
                  }
              />
          )}
          {count && <div className="table-count">
            {sortedListArray.listArray.length}/{listArray.length}
          </div>}
        </div>
        {sortedListArray.listArray && sortedListArray.listArray.length && (
            <table className="table">
              <thead>
              <tr>
                {Object.entries(mixLabels).map(([columnKey, columnLabel]) => (
                    <th
                        key={columnKey}
                        className={columnKey === sortedListArray.sortBy && (sortedListArray.isDesc ? "desc" : "asc")}
                    >
                      <div onClick={doSort(columnKey)}>{columnLabel}</div>
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {sortedListArray.listArray.map(row => (
                  <tr key={row[id]}>
                    {Object.entries(row).map(([k, v]) => (
                          <td key={k} className={columns && columns[k] && columns[k].className ? columns[k].className(v) : k}>{columns && columns[k] && columns[k].html ? columns[k].html(v) : v}</td>
                      )
                    )}
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  )
}

export default Table
