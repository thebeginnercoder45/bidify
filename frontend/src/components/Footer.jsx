import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#F1F0EE] pr-5 pt-4 h-[40vh] rounded-t-xl  ">
        {/* <div className=" h-2/6 flex justify-between max-lg:justify-center  items-center max-lg:flex-col bg-[#807c7c33] p-10 rounded-xl mx-auto w-[96%]">
     <div className="max-lg:flex max-lg:flex-col max-lg:items-center"> 
        <h1 className="text-3xl max-lg:text-2xl font-black">Join our Newsletter</h1>
     <p className="text-sm max-lg:text-xs font-bold mt-2">Stay updated with the latest features and offers. Subscribe to our newsletter and never miss out!</p>
     </div>
     <div className="flex justify-center max-lg:mt-2  items-center">
         <input type="email" name="email" id="email" placeholder="Enter your email" className="rounded-lg outline-none bg-gray-200 px-3 py-2   placeholder:text-sm placeholder:font-semibold placeholder:text-gray-400 text-sm text-gray-400 font-semibold " />
     <button type="button" className="text-xs bg-black text-white font-semibold px-4 py-2 ml-4 rounded-full">Subscribe</button>
     </div>
      </div> */}
        <div className="container mx-auto  px-4 h-3/5 flex justify-center max-md:mt-5 max-sm:mt-7 items-center ">
          <div className="w-full flex max-md:flex-col   justify-between ">
            <div className="w-full md:w-1/3 ">
              {/* <h1 className="max-md:text-lg text-5xl font-black">Bid</span>ify</h1> */}
              <h1 className="text-3xl text-slate-700 font-normal">
                <span className="font-bold text-black">Bid</span>ify
              </h1>
              <p className="text-sm font-bold text-gray-900 max-md:text-xs max-md:mt-2   mt-5">
                ~Connecting Buyers and Sellers in a Competitive Marketplace.
              </p>
              {/* <h1 className="text-2xl font-bold pt-2">For any query drop a mail on</h1>
              <Link href="mailto:pwrbuster-balajisamy369@gmailcom" className="text-sm font-extrabold">balajisamy369@gmail.com</Link> */}
            </div>
            <div className="w-2/5 max-md:w-full max-md:mt-2 max-md:gap-y-2 max-md:items-start  flex max-md:flex-col items-center justify-center">
              <div className="flex flex-col  text-sm max-md:font-extrabold max-md:text-xs font-extrabold gap-y-2 max-md:gap-y-0 text-gray-600">
                <h1 className="text-base max-md:text-sm font-black cursor-none text-gray-800">
                  PRODUCT
                </h1>
                <Link href={"#"}>HOME</Link>
                <Link href={"#features"}>FEATURES</Link>
                {/* <Link href={'#'}>ABOUT US</Link>
                    <Link href={'#'}>CONTACT US</Link> */}
                <Link href={"#pricing"}>PRICING</Link>
                <Link href={"/sign-in"}>SIGN IN</Link>
              </div>
              <div className="ml-24 max-md:ml-0 flex flex-col h-full justify-start text-sm max-md:font-extrabold max-md:text-xs font-extrabold gap-y-2 max-md:gap-y-0 text-gray-600">
                <h1 className="text-base max-md:text-sm font-black cursor-none text-gray-800">
                  BRANDS
                </h1>
                <Link href={"#"}>INSTAGRAM</Link>
                <Link href={"#"}>FACEBOOK</Link>
                <Link href={"#"}>LINKEDIN</Link>
                <Link href={"#"}>TWITTER</Link>
              </div>
              <div className="ml-24 max-md:ml-0 flex flex-col h-full justify-start text-sm max-md:font-extrabold max-md:text-xs font-extrabold gap-y-2 max-md:gap-y-0 text-gray-600">
                <h1 className="text-base max-md:text-sm font-black cursor-none text-gray-800">
                  CONTACT US
                </h1>
                <Link
                  to="mailto:pwrbuster-hammadraza9990@gmailcom"
                  className="flex justify-center items-center gap-x-1 text-sm font-extrabold"
                >
                  <span className="text-xl text-black">
                    <SiMinutemailer />
                  </span>
                  hammadraza9990@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 ">
          <div className="border-t border-gray-300 w-[96%] rounded-xl max-md:mt-5 mx-auto flex  max-lsm:flex-col   justify-between items-center px-2">
            <div className="w-full flex pt-6 gap-x-3 text-xl max-lsm:justify-center">
              <FaXTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
            <div>
              <h1 className="text-xs font-semibold max-lsm:pt-2 text-gray-500 pr-4 text-nowrap pt-6">
                <span className="text-sm">&#169; </span>2024 Copyright Bidify.
                All rights reserved
              </h1>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
