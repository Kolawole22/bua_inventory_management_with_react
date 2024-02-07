import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Creatable from "react-select/creatable";
import {
  bua_cement,
  bua_foods,
  departmentOptions,
  subsidiary,
} from "./inputOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "./authService";

function ReassignModal({
  modalIsOpen,
  openModal,
  afterOpenModal,
  closeModal,
  subtitle,
  state,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "70%",
    },
  };

  const [formData, setFormData] = useState({
    user: "",
    assigned: true,
    department: "",
    date: "",
    subsidiary: "BUA International",
    location: "",
    email: "",
  });

  const inputStyle =
    "border-[2px] w-[30%] rounded-md border-gray-300 focus:border-2 focus:border-[#efae31] outline-none py-1 ";
  const labelStyle = "font-bold";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    console.log("form", { ...state, ...formData });
  }, [formData.subsidiary, formData.location]);

  const handleDepartmentChange = (selectedOption) => {
    setFormData({ ...formData, department: selectedOption.value });
  };

  const navigate = useNavigate();
  const checkIn = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const loadingToastId = toast.info("Submitting...", { autoClose: false });
      const tokenData = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
      };

      const response = await api.put(
        `api/inventories/${state.tag_number}/`,
        { ...state, ...formData },
        {
          headers: headers,
        }
      );
      console.log("form", { ...state, ...formData });
      if (!response || (response.status !== 200 && response.status !== 201)) {
        toast.dismiss(loadingToastId);
        toast.dismiss();
        toast.error("Network response failed", { autoClose: 1000 });
        return;
      }

      // Display success message
      toast.dismiss(loadingToastId);
      const data = await response.data;
      toast.success(data.message, { autoClose: 1000 });
      setFormData({
        user: "",
        assigned: true,
        department: "",
        date: "",
        subsidiary: "BUA International",
        location: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleSetAssignedToFalse = async () => {
  //     try {
  //       const response = await fetch("YOUR_SET_ASSIGNED_TO_FALSE_API_ENDPOINT", {
  //         method: "PUT", // or 'PATCH' depending on your API design
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ assigned: false }),
  //       });

  //       if (response.ok) {
  //         // Handle success, e.g., show a success message
  //         console.log("Assigned set to false successfully");
  //       } else {
  //         // Handle error, e.g., show an error message
  //         console.error("Error setting assigned to false");
  //       }
  //     } catch (error) {
  //       // Handle network error or other issues
  //       console.error("An error occurred while processing your request.", error);
  //     }
  //   };

  return (
    <div className="w-screen">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={checkIn}>
          <div className="form-group flex flex-col my-1">
            <button
              className="flex justify-end mb-4 bg-white"
              onClick={closeModal}
            >
              Close
            </button>
            <label className={labelStyle} htmlFor="user">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={(e) => {
                setFormData((prevState) => ({
                  ...prevState,
                  user: e.target.value,
                }));
              }}
              className={inputStyle}
            />
          </div>
          <div className="form-group flex flex-col w-full justify-center my-4 ">
            <label className={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div className="form-group flex flex-col my-4">
            <label className={labelStyle} htmlFor="department">
              Subsidiary
            </label>

            <select
              id="subsidiary"
              name="subsidiary"
              onChange={handleChange}
              className={inputStyle}
              required
            >
              {subsidiary.map((subsidiary) => (
                <option key={subsidiary} value={subsidiary}>
                  {subsidiary}
                </option>
              ))}
            </select>
          </div>
          {formData.subsidiary == "BUA Foods" && (
            <div className="">
              <label htmlFor="location" className={labelStyle}>
                Location
              </label>
              <select
                id="location"
                name="location"
                onChange={handleChange}
                className={inputStyle}
                required
              >
                {bua_foods.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}
          {formData.subsidiary == "BUA Cement" && (
            <div className="">
              <label htmlFor="location" className={labelStyle}>
                Location
              </label>
              <select
                id="location"
                name="location"
                onChange={handleChange}
                className={inputStyle}
                required
              >
                {bua_cement.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group flex flex-col my-4">
            <label className={labelStyle} htmlFor="department">
              Department
            </label>

            <Creatable
              id="department"
              name="department"
              options={departmentOptions}
              value={departmentOptions.find(
                (option) => option.value === formData.department
              )}
              //value={formData.equipment}
              //onChange={(e) => console.log(e)}
              onChange={handleDepartmentChange}
              className="border-[1px]  w-[30%] rounded-md border-gray-300 focus:border-2 focus:border-[#b32e36] outline-none "
              required
            />
          </div>
          <div className="form-group flex flex-col w-full justify-center my-4 ">
            <label className={labelStyle} htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <button
            className="w-[30%] bg-[#b32e36] hover:bg-[#b43e33] text-white "
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ReassignModal;
