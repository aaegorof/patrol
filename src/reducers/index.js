import { createReducer } from "redux-act";
import { setup, getIssuesPending, getIssuesSuccess, getIssuesError } from "../actions";

export const initialState = {
  pending: true,
  issues: [{
    region: "Moscow"
  }],
  errors: []
};


const reducer = createReducer(
    {
      [setup]: state => ({
        ...state
      }),
      [getIssuesPending]: (state) => ({
        ...state,
        pending: true
      }),
      [getIssuesError]: (state, payload) => ({
        ...state,
        errors: payload
      }),
      [getIssuesSuccess]: (state, payload) => ({
        ...state,
        pending: false,
        issues: payload
      })
    },
    initialState
);

export const getIssues = state => state.issues;

export default reducer;