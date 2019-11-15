import { createAction } from "redux-act"

export const setup = createAction("setup")
export const getIssuesPending = createAction("getIssuesPending")
export const getIssuesSuccess = createAction("getIssuesSuccess")
export const getIssuesError = createAction("getIssuesError")
export const sortTable = createAction("sortTable")
export const updateSortBy = createAction("updateSortBy")