import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "../hooks/userHook";
import { useNavigate } from "react-router";
import { LandingPageNavBar } from "./LandingPageNavBar";

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
        <div className="h-[100dvh] w-full flex flex-col  items-center gap-10 bg-radial-top-left text-white py-8">
            <LandingPageNavBar />

          <div className="flex flex-col w-full h-full gap-6 justify-center items-center">
          <h2 className="text-3xl font-bold ">Login to your account</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl p-6 sm:border sm:border-white w-full md:w-1/2 flex flex-col gap-6 rounded-md "
            >
                <div className="flex flex-col gap-2">
                    <label className="text-xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        className="bg-[#1F1C1C] p-2 rounded-md"
                        {...register("email")}
                    />
                    <p className="text-red-600">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        className="bg-[#1F1C1C] p-2 rounded-md"
                        {...register("password")}
                    />
                    <p className="text-red-600">{errors.password?.message}</p>
                </div>
                {isLoggingUser === false ? (
                    <button
                        className="mx-auto w-full rounded-md text-2xl font-medium py-2 bg-linear-to-r from-vibrant-violet to-rich-purple"
                        type="submit"
                    >
                        Login
                    </button>
                ) : (
                    <span className="text-lg font-normal mx-auto">
                        Logging...
                    </span>
                )}
                <span className="text-lg font-normal mx-auto">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-800 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign Up
                    </span>{" "}
                </span>
            </form>
          </div>
        </div>
    );
};

export default Login;
