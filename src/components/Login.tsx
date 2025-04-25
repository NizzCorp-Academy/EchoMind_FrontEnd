import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../assets/styles/login.css";
import UserHook from "../hooks/userHook";
import { useNavigate } from "react-router";

/**
 * @author Muhammad Haseen
 * @file Login.tsx
 * @brief Component for user login functionality.
 *
 * This component provides a login form for users to authenticate
 * using their email and password. It uses `react-hook-form` for form handling
 * and `yup` for schema validation.
 * @returns Login Components
 */

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

/**
 * @typedef {Object} FormData
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */
type FormData = yup.InferType<typeof schema>;

/**
 * @function Login
 * @brief Renders the login form and handles user authentication.
 *
 * This component uses a custom hook `UserHook` to manage login functionality.
 * It validates user input using `yup` and displays error messages for invalid fields.
 *
 * @returns {JSX.Element} The rendered login form component.
 */
const Login = () => {
  const navigate = useNavigate();
  const { useLogin } = new UserHook();
  const { loginUser, isLoggingUser } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  /**
   * @function onSubmit
   * @brief Handles form submission.
   *
   * This function is triggered when the user submits the login form.
   * It calls the `loginUser` function from the custom hook to authenticate the user.
   *
   * @param {FormData} data - The form data containing email and password.
   */
  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    await loginUser(email, password);
  };

  return (
    <div className="section bg-radial-top-left">
      <h2 className="">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="info">
          <label className="" htmlFor="email">
            Email
          </label>
          <input id="email" className="" {...register("email")} />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div className="info">
          <label className="" htmlFor="password">
            Password
          </label>
          <input id="password" className="" {...register("password")} />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        {isLoggingUser === false ? (
          <button className="submit-button" type="submit">
            Login
          </button>
        ) : (
          <span>Logging...</span>
        )}
        <span>
          Don't have an account?{" "}
          <span className="span-signup" onClick={() => navigate("/register")}>
            Sign Up
          </span>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;
