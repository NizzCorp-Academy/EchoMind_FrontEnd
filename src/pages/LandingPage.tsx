import { LandingPageNavBar } from "../components/LandingPageNavBar";
import "../index.css";
import { useNavigate } from "react-router";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-[Montserrat] text-white bg-[#0B0C0F]">
      {/* Header Section */}
      <div className="relative overflow-hidden ">
        <div className="absolute bg-[#460F9E4D] blur-[100px] w-[600px] h-[400px] rounded-full bottom-0 right-[150px]"></div>
        <div className="absolute bg-[#460F9E4D] blur-[100px] w-[2500px] h-[900px] rounded-full -bottom-[750px] -left-[200px] "></div>
        <div className="w-full flex items-center justify-center pt-6 pb-2">
          <LandingPageNavBar />
        </div>
        <div
          id="home"
          className=" flex items-center justify-between px-[100px]"
        >
          <div className="h-[320px] flex flex-col justify-between">
            <div className="overflow-y-clip max-w-[500px] space-y-[15px]">
              <div className="text-5xl font-bold">
                Get ready for the new era of AI
              </div>
              <div className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent et vulputate tortor, in posuere nibh. Praesent sit amet
                metus porttitor mi consectetur pellentesque in at leo. 
              </div>
            </div>
            <div className="space-y-[18px]">
              <div className="bg-gradient-to-r from-[#8A4CEF] to-[#2A0070] h-[50px] flex items-center w-[150px] justify-center rounded-[16px] p-[1.5px]">
                <div
                  className="bg-gradient-to-r from-[#6E27E0] to-[#460F9E] h-full flex items-center w-full justify-center rounded-[16px] cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </div>
              </div>
              <div className="text-[#999999] text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>
          </div>
          <div>
            <img src="../src/assets/robo.png" width={600} />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full h-full flex flex-col items-start px-12 py-8 bg-radial-top-left  bg-[#0B0C0F] gap-2 ">
        <div className="font-semibold" id="about">
          ABOUT US
        </div>
        <h1 className="text-4xl font-semibold">
          Powered by Nizzcorp, Built for You
        </h1>
        <div className="font-medium w-[75%]">
          At NizzCorp, we believe in building technology that feels like magic —
          fast, smart, and human. Founded with a passion for innovation and a
          deep curiosity for the future, NizzCorp is a modern tech company
          focused on building intelligent systems that empower users to do more.
          form Ai- Driven application so scalable web platforms, we specialize
          in create tools that are not only powerful but also intuitive Our
          latest project harnesses the capabilities of cutting large language
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-start pt-4 px-12 pb-8 bg-radial-top-left  bg-[#0B0C0F]">
        <img src="./logo.png" className="w-44" />
        <div className="flex gap-[107px] items-center py-8 px-2">
          <div className="space-y-3.5">
            <div className="font-semibold">Company</div>
            <ul className="text-sm space-y-1.5">
              <li>About</li>
              <li>Services</li>
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="space-y-3.5">
            <div className="font-semibold">Resources </div>
            <ul className="text-sm space-y-1.5">
              <li>Case Studies</li>
              <li>Webinars</li>
              <li>Developer</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div className="space-y-3.5">
            <div className="font-semibold">Help </div>
            <ul className="text-sm space-y-1.5">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="h-full space-y-5 pl-[37px] flex flex-col ">
            <div className="font-semibold">Subscribe To Newsletter</div>
            <div className=" flex gap-3 items-start justify-center  ">
              <input
                className="bg-gradient-to-r from-[#2B2929] to-[#3A3A3A] w-76 outline-none border-2 border-[#1F1C1C] py-4 px-5.5 rounded-full"
                placeholder="Enter Email Address"
              />
              <button className="bg-[#571ABC] font-semibold rounded-full py-4 px-6">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="px-20 py-10">
          <img src="./NizzCorp.png" className="" />
        </div>
      </div>
    </div>
  );
};
