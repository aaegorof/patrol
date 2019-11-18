import { createReducer } from "redux-act";
import { setup, getIssuesPending, getIssuesSuccess, getError, updateSortBy, sortTable } from "../actions";
import {sort, prop, sortBy, descend, ascend} from "ramda"

export const initialState = {
  pending: true,
  issues: [],
  errors: [],
  sortBy: {
    column: null,
    isDesc: true
  },

};

const toSortTable = (table, sortBy) => {
  const direction = sortBy.isDesc ? descend : ascend
  //const direction = isDesc ? descend : ascend
  const sortFunc = sort(direction(prop(sortBy.column)))

  return sortFunc(table)
}




const reducer = createReducer(
    {
      [setup]: state => ({
        ...state
      }),
      [getIssuesPending]: (state) => ({
        ...state,
        pending: true
      }),
      [getError]: (state, payload) => ({
        ...state,
        errors: payload
      }),
      [getIssuesSuccess]: (state, payload) => ({
        ...state,
        pending: false,
        issues: toSortTable(payload, state.sortBy)
      }),
      [sortTable]: (state, payload) => ({
        ...state,
        issues: toSortTable(state.issues, payload)
      }),
      [updateSortBy]: (state, payload) => ({
        ...state,
        sortBy: payload
      })
    },
    initialState
);

export const getIssues = state => state.issues;

export default reducer;