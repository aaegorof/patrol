import {
  getIssuesSuccess,
  getError,
  getCounterSuccess,
  getMapSuccess,
  getGeneralsSuccess
} from "./actions";
const url = "http://tobacco-landing.test2.happydesk.ru/index.php?fnc=";

const typeActions = {
  general: res => getGeneralsSuccess(res),
  rating: res => getIssuesSuccess(res),
  counter: res => getCounterSuccess(res),
  map: res => getMapSuccess(res)
};

export const fetchApi = (type = "general") => dispatch => {
  fetch(url + type)
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      dispatch(typeActions[type](res));
      return res;
    })
    .catch(error => {
      dispatch(getError({[type]: ""+error }));
    });
};
