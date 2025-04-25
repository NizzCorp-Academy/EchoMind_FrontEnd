import "../index.css"

export const LandingPage = () => {

    return(
        <div className="text-white bg-[#0B0C0F]" >

            {/* Footer Section */}
            <div className="w-full h-full flex flex-col items-start px-12 py-8 bg-radial-top-left  bg-[#0B0C0F] gap-2 " >
                <div className="font-semibold">ABOUT US</div>
                <h1 className="text-4xl font-semibold">Powered by Nizzcorp, Built for You</h1>
                <div className="font-medium w-[75%]">
                At NizzCorp, we believe in building technology that feels like magic — fast, smart, and human. Founded with a passion
                for innovation and a deep curiosity for the future, NizzCorp is a modern tech company  focused on building intelligent
                systems that empower users to do more. form Ai- Driven application so scalable web platforms, we specialize in create
                tools that are not only powerful but also intuitive Our latest project harnesses the capabilities of cutting large language
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-start pt-4 px-12 pb-8 bg-radial-top-left  bg-[#0B0C0F]" >
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
                        <div className="font-semibold">Resources    </div>
                        <ul className="text-sm space-y-1.5">
                            <li>Case Studies</li>
                            <li>Webinars</li>
                            <li>Developer</li>
                            <li>Documentation</li>
                        </ul>
                    </div>
                    <div className="space-y-3.5">
                        <div className="font-semibold">Help    </div>
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
                        <input className="bg-gradient-to-r from-[#2B2929] to-[#3A3A3A] w-76 outline-none border-2 border-[#1F1C1C] py-4 px-5.5 rounded-full"  placeholder="Enter Email Address"/>
                        <button className="bg-[#571ABC] font-semibold rounded-full py-4 px-6">SUBSCRIBE</button>
                    </div></div>
                </div>
                <div className="px-20 py-10">
                    <img src="./NizzCorp.png" className="" />
                </div>
            </div>
        </div>
    )
}


