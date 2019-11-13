import {getIssuesPending,getIssuesSuccess, getIssuesError} from './actions';
const urls = {
  issues: "http://tobacco-landing.test2.happydesk.ru/index.php?fnc=issues",
  products: "http://test-app.viktor.ws/api/products"
};

// export const getProducts = async callBack => {
//   if (!url) {
//     throw new Error("Url should be specified");
//   }
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     callBack(data.data);
//   } catch (er) {
//     console.error(er);
//   }
// };
//
// export const fetchProduct = async (
//     id,
//     callBack,
//     { method = "GET", body = null } = { method: "GET" }
// ) => {
//   const productUrl = id ? url + "/" + id : url;
//   if (!productUrl) {
//     throw new Error("Url should be specified");
//   }
//
//   const headers = {
//     Accept: "*/*",
//     "Content-Type": "application/json; charset=utf-8"
//   };
//
//   const options = {
//     method: method,
//     headers: headers
//   };
//   if (body) {
//     options.body = JSON.stringify(body);
//   }
//
//   try {
//     const response = await fetch(productUrl, options);
//     const data = await response.json();
//
//     callBack(data.data);
//   } catch (er) {
//     console.error(er);
//   }
// };
//
// export const deleteProduct = (id, callBack) =>
//     fetchProduct(id, callBack, { method: "DELETE" });



export const fetchIssues = () => dispatch => {
    dispatch(getIssuesPending())
    fetch(urls.issues)
        .then(res => {
          return res.json()
        })
        .then(res => {
          if(res.error) {
            throw(res.error);
          }
          console.log("e",res);
          dispatch(getIssuesSuccess(res));
          return res;
        })
        .catch(error => {
          dispatch(getIssuesError(error));
        })
}