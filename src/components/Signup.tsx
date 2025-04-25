/**
 * @author Muhammad Haseen
 * @file Signup.tsx
 * @description This component renders a signup form allowing users to create an account.
 * It includes form validation using React Hook Form and Yup for schema validation.
 * The form will trigger a `registerUser` function on form submission.
 * @returns Signup Component
 */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../assets/styles/login.css";
import UserHook from "../hooks/userHook";
import { useNavigate } from "react-router";

/**
 * Validation schema for the signup form using Yup.
 * Ensures that the username, email, and password fields are provided, and the email is in the correct format.
 */
const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

/**
 * Type for the form data based on the Yup validation schema.
 *
 * @typedef {Object} FormData
 * @property {string} username - The username provided by the user.
 * @property {string} email - The email provided by the user.
 * @property {string} password - The password provided by the user.
 */
type FormData = yup.InferType<typeof schema>;

/**
 * The Signup component renders a signup form that:
 * - Handles form submission to register a user.
 * - Displays form validation errors.
 * - Manages the loading state for user registration.
 *
 * @returns {JSX.Element} The Signup form JSX.
 */
const Signup = () => {
  const navigate = useNavigate();
  const useHook = new UserHook();
  const { registerUser, isRegisteringUser } = useHook.useRegister();

  /**
   * React Hook Form hook for managing form state and validation.
   * - `register` is used to bind inputs to the form state.
   * - `handleSubmit` handles form submission.
   * - `errors` contains form validation errors.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  /**
   * Handles form submission.
   * Calls `registerUser` with the form data when the form is submitted.
   *
   * @param {FormData} data - The form data containing username, email, and password.
   */
  const onSubmit = async (data: FormData) => {
    const { username, email, password } = data;
    await registerUser(username, email, password);
  };

  return (
    <div className="section bg-radial-top-left">
      <h2 className="">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="info">
          <label className="" htmlFor="username">
            User Name
          </label>
          <input id="username" className="" {...register("username")} />
          <p className="text-red-600">{errors.username?.message}</p>
        </div>
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
        {isRegisteringUser === false ? (
          <button className="submit-button" type="submit">
            Signup
          </button>
        ) : (
          <span>registering...</span>
        )}
        <span>
          Already have an account ?{" "}
          <span className="span-signup" onClick={() => navigate("/login")}>
            Login
          </span>{" "}
        </span>
      </form>
    </div>
  );
};

export default Signup;
