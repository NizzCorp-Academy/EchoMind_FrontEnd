import { useRef } from "react";
import {
  Archive,
  ClockFading,
  LucidePanelLeftOpen,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { FaRegShareSquare } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import AxiosClass from "../utils/axios";

const ChatScreeNavBar = ({
  isDark,
  toggleMode,
  isOpen,
  toggleSideBar,
}: {
  isDark: boolean;
  toggleMode: () => void;
  isOpen: boolean;
  toggleSideBar: () => void;
}) => {
  const toggleRef = useRef<HTMLInputElement>(null);
  const bg = isDark ? "bg-[#29193C] " : "bg-[#FEFEFE]";
  const addToken = async () => {
    await AxiosClass.post("http://localhost:5000/api/user/set", {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAzM2I4ZjY4YjVjNmU4YmFkZjc5NTUiLCJpYXQiOjE3NDUwNDM0MjQsImV4cCI6MTc0NjMzOTQyNH0.61MyV5D_B_XP_NrsPs8fzKyu5KsVjT8_1NEcUBPNYAg",
    });
  };
  return (
    <div
      className={`${
        isDark ? "text-white border-[1px] border-[#E8ECEF] " : ""
      } w-[1000px] h-[70px] rounded-[25px] px-6 ${bg} flex items-center justify-between `}
    >
      <div className="flex space-x-[22px]">
        <div
          hidden={isOpen}
          className={`${
            isDark
              ? "bg-gradient-to-r from-[#3A3A3A] to-[#3A3A3A]"
              : "bg-[#E6E6E6]"
          } w-[30px] h-[30px] rounded-[6px] flex items-center justify-center  p-[1px] pl-[1.5px] pr-[1px]
          `}
        >
          <div
            className={`w-full h-full flex gap-1 rounded-[5px] cursor-pointer items-center justify-center
            ${bg}
            `}
            onClick={toggleSideBar}
          >
            <LucidePanelLeftOpen size={20} />
          </div>
        </div>
        <div
          hidden={isOpen}
          className={`${
            isDark
              ? "bg-gradient-to-r from-[#3A3A3A] to-[#3A3A3A]"
              : "bg-[#E6E6E6]"
          } w-[130px] h-[30px] rounded-[16px]  p-[1px] pl-[1.5px] pr-[1px]
          `}
        >
          <div
            className={`w-full h-full flex gap-1 rounded-[15px] cursor-pointer items-center justify-center
            ${bg}
            `}
          >
            <Plus className={isDark ? "" : "text-green-500"} size={20} />
            <div>New Chat</div>
          </div>
        </div>

        <div
          className={`${
            isDark
              ? "bg-gradient-to-r from-[#2B2929] to-[#3A3A3A]"
              : "bg-[#E6E6E6]"
          } rounded-[30px] w-[30px] h-[30px] py-[1px] pr-[0.5px] flex items-center justify-center`}
        >
          <div
            className={`${bg} w-full h-full rounded-[30px] flex items-center cursor-pointer justify-center m-[1px]`}
          >
            <ClockFading size={20} />
          </div>
        </div>
      </div>
      {/* seciton  group */}
      <div className="flex space-x-[50px] pr-[170px] w-full justify-end">
        {/* Dark Mode Switching Start  */}
        <div className=" flex items-center space-x-[8px]">
          {isDark ? <Moon /> : <Sun />}
          <div
            data-testid="chat-nav-bar-toggle-dark-mode"
            className={`w-[60px] h-[30px] rounded-[92px] cursor-pointer border-2 border-[#E8ECEF] flex items-center px-[2px]
                ${isDark ? "" : "justify-end bg-[#D9D9D9]"}
                `}
            // onClick={() => toggleRef.current?.click()}
            onClick={() => toggleMode()}
          >
            <div
              className={`w-[28px] h-[22px] transition-all  duration-100 bg-[#888888] rounded-[50px]
                ${isDark ? "" : " bg-[#FEFEFE]"}
              `}
            ></div>
          </div>
          <input
            type="checkbox"
            className="hidden"
            ref={toggleRef}
            onChange={toggleMode}
          />
        </div>
        {/* Dark Mode Switching Ending  */}
        {/* nav bar buttons seciton  */}
        <div className=" flex space-x-[24px]">
          <div
            className={` rounded-[5px] w-[30px] h-[30px] p-[1px] pr-[1.5px] ${
              isDark
                ? "bg-gradient-to-r from-[#2B2929] to-[#3A3A3A]"
                : "bg-[#E6E6E6]"
            } `}
          >
            <div
              className={`${bg} w-full h-full rounded-[4px] flex items-center justify-center cursor-pointer `}
              onClick={() => addToken()}
            >
              <MdBookmarkAdd size={20} />
            </div>
          </div>
          <div
            className={` rounded-[5px] w-[30px] h-[30px] p-[1px] pr-[1.5px] ${
              isDark
                ? "bg-gradient-to-r from-[#2B2929] to-[#3A3A3A]"
                : "bg-[#E6E6E6]"
            } `}
          >
            <div
              className={`${bg} w-full h-full rounded-[4px] flex items-center justify-center cursor-pointer `}
            >
              <Archive size={20} />
            </div>
          </div>
          <div
            className={` rounded-[5px] w-[30px] h-[30px] p-[1px] ${
              isDark
                ? "bg-gradient-to-r from-[#2B2929] to-[#3A3A3A]"
                : "bg-[#E6E6E6]"
            } `}
          >
            <div
              className={`${bg} w-full h-full rounded-[4px] flex items-center justify-center cursor-pointer `}
            >
              <FaRegShareSquare size={19} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreeNavBar;
