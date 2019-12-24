import {
  getIssuesSuccess,
  getError,
  getCounterSuccess,
  getMapSuccess,
  getGeneralsSuccess
} from "./actions";

const url = "http://84.201.181.175/api/";
export const graphQlclient = "http://84.201.181.175/graphql";

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
      dispatch(getError({ [type]: "" + error }));
    });
};
