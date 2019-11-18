import { createAction } from "redux-act"

export const setup = createAction("setup")

export const getIssuesPending = createAction("getIssuesPending")
export const getIssuesSuccess = createAction("getIssuesSuccess")
export const sortTable = createAction("sortTable")
export const updateSortBy = createAction("updateSortBy")

export const getGenerals = createAction("getGenerals")
export const getGeneralsSuccess = createAction("getGeneralsSuccess")
export const getCounter = createAction("getCounter")
export const getCounterSuccess = createAction("getCounterSuccess")
export const getMap = createAction("getMap")
export const getMapSuccess = createAction("getMapSuccess")

export const getError = createAction("getError")
