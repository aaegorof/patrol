import {getIssuesPending,getIssuesSuccess, getIssuesError} from './actions';
const url = "http://tobacco-landing.test2.happydesk.ru/index.php?fnc=";

export const fetchApi = (type = 'general') => dispatch => {
    dispatch(getIssuesPending())
    fetch(url + type)
        .then(res => {
          return res.json()
        })
        .then(res => {
          if(res.error) {
            throw(res.error);
          }
          dispatch(getIssuesSuccess(res));
          return res;
        })
        .catch(error => {
          dispatch(getIssuesError(error));
        })
}