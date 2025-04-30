import { useNavigate } from "react-router";
import logo from "../assets/logo.png"

export const LandingPageNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[70%] h-[80px] rounded-[20px] p-[2px] bg-gradient-to-t from-[#000000] to-[#666666]">
      <div className="w-full h-full rounded-[20px] bg-[#0B0C0F] flex justify-between px-6 ">
        <div className="flex items-center">
          <img src={logo} width={200} />
        </div>

        <div className="flex gap-8 items-center">
        
         <a href="/home/#home">
            Home
         </a>
         <a href="/home/#features">
            Features
         </a>
          <a href="/home/#about">About</a>
        </div>

        <div className="flex gap-5 items-center">
          <div
            className="
        bg-[#1F1C1C] px-7 pt-[3px] pb-[5px]  rounded-[18px] border-2 border-[#3A3A3A]
        cursor-pointer
        "
            onClick={() => navigate("/register")}
          >
            SignUp
          </div>
          <div
            className="
        bg-gradient-to-r from-[#6E27E0] to-[#460F9E]
        rounded-[18px] px-7 pt-[3px] pb-[5px] border-2 border-[#8A4CEF]
        cursor-pointer
        "
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
