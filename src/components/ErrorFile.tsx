import { useNavigate } from "react-router-dom";

const ErrorFile = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4 bg-radial-top-left">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-white mb-6">
        Oops! You are on Wrong way. The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/home")}
        className="cursor-pointer bg-linear-to-r from-vibrant-violet to-rich-purple  text-white font-bold py-2 px-4 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorFile;
