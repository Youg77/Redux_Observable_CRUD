const initialState = {
  loading: false,
  users: [],
  error: null,
};

export const Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_USERS_REQ":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case "REQ_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "SET_USER":
      return {
        ...state,
        processUser: payload,
      };
    case "PUT_REQ":
      return {
        ...state,
        loading: true,
      };
    case "PUT_USER_SUCCESS":
      return {
        ...state,
        users: payload,
      };
    case "POST_REQ":
      return {
        ...state,
        loading: true,
      };
    case "POST_USER_SUCCESS":
      return {
        ...state,
        users: payload,
      };
    case "DEL_USER_REQ":
      return {
        ...state,
        loading: true,
      };
    case "DEL_USER_REQ_SUCCESS":
      return {
        ...state,
        users: payload,
      };

    default:
      return state;
  }
};
