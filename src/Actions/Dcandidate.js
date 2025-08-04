import Api from "../Actions/Api";
import axios from "axios";
export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};
const formatData = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
});

export const fetchall = () => (dispatch) => {
  Api.Dcandidate()
    .fetchall()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const create = (data, onsuccess) => (dispatch) => {
  Api.Dcandidate()
    .create(data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: response.data,
      });
      onsuccess();
    })
    .catch((err) => console.log(err.response));
};

export const update = (id, data, onsuccess) => (dispatch) => {
  Api.Dcandidate()
    .update(id, data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
      onsuccess();
    })
    .catch((err) => console.log(err));
};

export const Delete = (id, onsuccess) => (dispatch) => {
  Api.Dcandidate()
    .delete(id)
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onsuccess();
    })
    .catch((err) => console.log(err.response.data));
};
