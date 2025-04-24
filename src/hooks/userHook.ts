/**
 * @file userHook.ts
 * @brief Contains the UserHook class with custom hooks for user authentication and retrieval.
 * @author Jaseem
 */

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { gettingUserAsync, loginUserAsync } from "../features/user/userSlice";

/**
 * @class UserHook
 * @brief Provides custom hooks for user login and fetching user data.
 */
class UserHook {
  /**
   * @brief Custom hook for logging in a user.
   * @returns {object} An object containing the user, loginUser function, and isLoggingin status.
   *
   * @details
   * - user: The current user object from the Redux store.
   * - loginUser: Function to dispatch login action with email and password.
   * - isLogin: Boolean indicating if login is in progress.
   */
  useLogin() {
    const { user, isLoggingUser } = useSelector(
      (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();
    const loginUser = (email: string, password: string) => {
      dispatch(loginUserAsync({ email, password }));
    };
    return { user, loginUser, isLoggingUser };
  }

  /**
   * @brief Custom hook for retrieving the logged-in user.
   * @returns {object} An object containing the user, getUSer function, and isGettingUser status.
   *
   * @details
   * - user: The current user object from the Redux store.
   * - getUSer: Function to dispatch action to get the logged-in user.
   * - isGettingUser: Boolean indicating if user retrieval is in progress.
   */
  useGetUser() {
    const { user, isGettingUser } = useSelector(
      (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();
    const getUser = () => {
      dispatch(gettingUserAsync());
    };
    return { user, getUser, isGettingUser };
  }
}

export default UserHook;
