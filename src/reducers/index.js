import { createReducer } from "redux-act";
import {
  setup,
  getIssuesPending,
  getIssuesSuccess,
  getCounterSuccess,
  getMapSuccess,
  getGeneralsSuccess,
  getError,
  updateSortBy,
  sortTable,
  changeCurrentStep
} from "../actions";
import { sort, prop, descend, ascend } from "ramda";

export const initialState = {
  pending: true,
  general: [],
  issues: [],
  counter: {},
  map: [],
  errors: {},
  steps: {
    currentStep: 0
  },
  sortBy: {
    column: "issue_total",
    isDesc: true
  }
};

const toSortTable = (table, sortBy) => {
  const direction = sortBy.isDesc ? descend : ascend;
  //const direction = isDesc ? descend : ascend
  const sortFunc = sort(direction(prop(sortBy.column)));

  return sortFunc(table);
};

const reducer = createReducer(
  {
    [setup]: state => ({
      ...state
    }),
    [getIssuesPending]: state => ({
      ...state,
      pending: true
    }),
    [getError]: (state, payload) => ({
      ...state,
      errors: {
        ...state.errors,
        ...payload
      }
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
    }),
    [getCounterSuccess]: (state, payload) => ({
      ...state,
      counter: payload
    }),
    [getMapSuccess]: (state, payload) => ({
      ...state,
      map: payload
    }),
    [getGeneralsSuccess]: (state,payload) => ({
      ...state,
      general: payload
    }),
    [changeCurrentStep]: (state, payload) => ({
      ...state,
      steps: {
        ...state.steps,
        currentStep: payload
      }
    })
  },
  initialState
);

export const getIssues = state => state.issues;

export default reducer;
