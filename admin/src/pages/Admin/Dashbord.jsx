import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashbord = () => {
  const { dashData, aToken, getDashBordData, cancleAppointment, } =
    useContext(AdminContext);
  const {convertDate}= useContext(AppContext)
  
  useEffect(() => {
    if (aToken) {
      getDashBordData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className=" m-5">
        <div className=" flex flex-wrap gap-3">
          <div className=" flex gap-2 items-center rounded bg-white  p-4 min-w-52  border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className=" text-gray-600 font-semibold text-xl">
                {dashData.doctors}
              </p>
              <p className=" text-gray-400">Doctors</p>
            </div>
          </div>
          <div className=" flex gap-2 items-center rounded bg-white  p-4 min-w-52  border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className=" text-gray-600 font-semibold text-xl">
                {dashData.users}
              </p>
              <p className=" text-gray-400">Patients</p>
            </div>
          </div>
          <div className=" flex gap-2 items-center rounded bg-white  p-4 min-w-52  border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className=" text-gray-600 font-semibold text-xl">
                {dashData.appointments}
              </p>
              <p className=" text-gray-400">Appointments</p>
            </div>
          </div>
        </div>
        <div className=" bg-white">
          <div className=" flex items-center  gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className=" font-semibold">List of Appointments</p>
          </div>
          <div className=" pt-4 border-t-0 border ">
            {dashData.latestAppointments.map((item, index) => {
              return (
                <div className=" flex items-center gap-3 px-6 py-3  hover:bg-gray-100" key={index}>
                  <img className=" rounded-full w-10" src={item.docData.image} alt="" />
                  <div className=" flex-1 text-sm">
                    <p className=" text-gray-700 font-medium">{item.docData.name}</p>
                    <p className=" text-gray-600">{convertDate(item.slotDate)}</p>
                  </div>
                  {item.canclled ? (
                    <p className=" text-red-400 test-xs font-medium">
                      Canclled
                    </p>
                  ) : (
                    <img
                      onClick={() => cancleAppointment(item._id)}
                      className=" cursor-pointer w-10"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashbord;
