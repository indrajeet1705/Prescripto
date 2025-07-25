import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="">
      <div className=" text-center  text-gray-600 pt-10 text-2xl">
        {" "}
        <p>
          {" "}
          ABOUT <span className="font-mediun text-black">US</span>
        </p>
      </div>

      <div className=" flex flex-col md:flex-row  gap-12 my-10">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex-col flex text-sm gap-6 md:w-2/4 text-gray-600 justify-center ">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-600"> Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div>
     
        <p className=" text-gray-600  text-2xl">
          WHY <span className=" font-medium text-black">CHOOSE US</span>
        </p>
      </div>

      
        <div className="mb-20 my-5 flex flex-col md:flex-row" >
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  transition-all duration-500 hover:text-white  cursor-pointer">
            <b>EFFICIENCY:</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  transition-all duration-500 hover:text-white  cursor-pointer">
            <b>CONVENIENCE:</b>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  transition-all duration-500 hover:text-white  cursor-pointer">
            <b>PERSONALIZATION:</b>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
  );
};

export default About;
