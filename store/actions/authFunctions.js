// firebase/authFunctions.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { loginStart, loginSuccess, loginFailure, logout, setUser } from "../reducers/auth/authSlice";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
    dispatch(setUser(userCredential.user));
    localStorage.setItem('authUser',JSON.stringify(userCredential.user))
  } catch (error) {
    dispatch(setUser(null));
    dispatch(loginFailure(error.message));
  }
};

export const signUpUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const loadUser = () => (dispatch) => {
    const storedUser = JSON.parse(localStorage.getItem('authUser'));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        dispatch(setUser(userData));
        localStorage.setItem('authUser', JSON.stringify(userData));
      } else {
        dispatch(setUser(null));
        localStorage.removeItem('authUser');
      }
    });
  };

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
  dispatch(setUser(null));
};
