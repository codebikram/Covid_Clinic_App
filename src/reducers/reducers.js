import axios from 'axios';

const initialState = {
  userData: {},
};

export function getUser() {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/getuser`, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      dispatch({ type: 'USER_INFO', payload: res.data.userData });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOGOUT' });
    }
  };
}

export function handleApi(data) {
  return async (dispatch) => {
    let results = null;
    try {
      results = await axios.post('http://localhost:5000/api/auth/login', data);
      if (!results) {
        dispatch({ type: 'LOGIN_FAIL' });
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: results.data.userData });
      localStorage.setItem('token', results.data.authtoken);
      localStorage.setItem('role', results.data.userData.role);
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL' });
      console.log(err);
    }
    return results;
  };
}

const loginReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'LOGIN_SUCCESS':
      return { ...state, userData: payload };
    case 'LOGIN_FAIL':
      return { ...state, userData: {} };
    case 'LOGOUT':
      return { ...state, userData: {} };
    case 'USER_INFO':
      return { ...state, userData: payload };
    case 'UPDATE_USER_FAIL':
      return { ...state };
    default:
      return state;
  }
};
export default loginReducer;
