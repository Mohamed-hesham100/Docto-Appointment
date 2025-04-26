import { Children, createContext, useEffect, useReducer } from "react";

export const authContext = createContext();


let parsedUser = null;
const userFromStorage = localStorage.getItem("user");

try {
  parsedUser = userFromStorage && userFromStorage !== "undefined"
    ? JSON.parse(userFromStorage)
    : null;
} catch (e) {
  localStorage.removeItem("user"); // 👈 كده تمسح القيمة التالفة
  parsedUser = null;
}


const initialState = {
  user: parsedUser,
  access_token: localStorage.getItem("access_token") || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        access_token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        access_token: action.payload.access_token,
      };
    case "LOGOUT":
      return {
        user: null,
        access_token: null,
      };
    default:
      return state;
  }
};

export const AuthContextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  useEffect(() => {
    if (state.user) {
      // const minimalUser = {
      //   id: state.user.id,
      //   name: state.user.name,
      //   role: state.user.role,
      // };
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }

    if (state.access_token) {
      localStorage.setItem("access_token", state.access_token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        role: state.role,
        access_token: state.access_token,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
