import { useEffect, useMemo, useRef, useState } from "react";
import logoPath from "../assets/buagrouplogo.webp";
import Creatable from "react-select/creatable";
import Nav from "../components/nav";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  departmentOptions,
  osOptions,
  equipmentOptions,
  subsidiary,
  bua_cement,
  bua_foods,
  departmentMapping,
  equipmentMapping,
  subsidiaryMapping,
} from "../components/inputOptions";
import api, { setupInterceptors } from "../components/authService";

function AddItem() {
  // const location = ["a", "b"];
  //let tagNumber;

  const [tagNumber, setTagNumber] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    equipment: "",
    purpose: "Official",
    os: "",
    user: "",
    department: "",
    computer_name: "",
    model: "",
    color: "",
    serial_number: "",
    vendor: "",
    location: "",
    subsidiary: subsidiary[0],
    tag_number: tagNumber,
    email: "",
    cost_price: "",
    //dateReceived: "",
    //dateDeployed: "",
  });

  //tagNumber = generateTagNumber(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleEquipmentChange = (selectedOption) => {
    setFormData({ ...formData, equipment: selectedOption.value });
    setFormData((prevState) => ({
      ...prevState,
      equipment: selectedOption.value,
    }));
  };
  const handleOsChange = (selectedOption) => {
    setFormData((prevState) => ({ ...prevState, os: selectedOption.value }));
  };
  const handleDepartmentChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      department: selectedOption.value,
    }));
  };

  // const delay = 0;
  // const offset = 500;
  // document.addEventListener(
  //   "invalid",
  //   function (e) {
  //     $(e.target).addClass("invalid");
  //     $("html, body").animate(
  //       { scrollTop: $($(".invalid")[0]).offset().top - offset },
  //       delay
  //     );
  //   },
  //   true
  // );

  // document.addEventListener(
  //   "change",
  //   function (e) {
  //     $(e.target).removeClass("invalid");
  //   },
  //   true
  // );

  const dateRef = useRef(null);
  const equipmentRef = useRef(null);
  const userRef = useRef(null);
  const departmentRef = useRef(null);
  const computerNameRef = useRef(null);
  const osRef = useRef(null);
  const modelRef = useRef(null);
  const colorRef = useRef(null);
  const serialNumberRef = useRef(null);
  const vendorRef = useRef(null);
  const locationRef = useRef(null);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function generateRandomString(length) {
    const chars = "0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomString;
  }

  const randomString = useMemo(() => generateRandomString(5), []);

  function generateTagNumber(row) {
    const departmentName = String(row.department);
    const departmentId = departmentMapping[departmentName];

    const subsidiaryName = String(row.subsidiary);
    const subsidiaryId = subsidiaryMapping[subsidiaryName];

    const equipmentName = String(row.equipment);
    const equipmentId = equipmentMapping[equipmentName];

    // const modelPrefix = String(row.model)
    //   .split(" ")[0]
    //   .slice(0, 2)
    //   .trim()
    //   .toUpperCase();
    // const modelSuffix =
    //   String(row.model).split(" ").length > 1
    //     ? String(row.model).slice(-3).toUpperCase()
    //     : "00";

    // Use uuid for random numbers
    const randomNumbers = randomString;

    const tagNumber = `BUA-${subsidiaryId}-${departmentId}-${equipmentId}-${randomNumbers}`;
    return tagNumber.trim().replace(/\s+/g, "");
  }

  // Example usage

  useEffect(() => {
    setTagNumber(generateTagNumber(formData));

    console.log(tagNumber);
  }, [formData]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      tag_number: tagNumber,
    }));
  }, [tagNumber]);

  const baseUrl = "http://localhost:8000/api";
  const navigate = useNavigate();
  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);
  const handleSubmit = async (e) => {
    console.log("Form Data:", formData);
    e.preventDefault();
    toast.dismiss();

    const loadingToastId = toast.info("Submitting...", { autoClose: false });
    const tokenData = localStorage.getItem("accessToken");
    console.log("token data", tokenData);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData}`,
    };

    try {
      const response = await api.post("api/inventories/", formData, {
        headers: headers,
      });

      //const data = await response.data;

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
        date: "",
        equipment: "",
        purpose: "Official",
        os: "",
        user: "",
        department: "",
        computer_name: "",
        model: "",
        color: "",
        serial_number: "",
        vendor: "",
        location: "",
        subsidiary: "BUA International",
        tag_number: "",
        email: "",
        cost_price: "",
      });
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Network response failed", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    // Reset the state when the component mounts
  }, []);

  const inputStyle =
    "border-[2px] w-full rounded-md border-gray-300 focus:border-2 focus:border-[#efae31] outline-none py-1 shadow-lg";
  const labelStyle = "font-bold ";
  const inputDiv = "form-group flex  flex-col md:w-[30%] w-[70%]";
  // nt.scrollIntoView({ behavior: "smooth", block: "start" });
  //     window.scrollTo({ top: yCoordinate, behavior: "smooth" });
  //   };

  return (
    <div className="flex flex-1 w-screen min-h-screen flex-col  bg-gray-200 ">
      <div className="flex flex-1 justify-center mt-4 w-full rounded-lg items-center">
        {/* <form className="w-[80%] py-8 ">
        label
        <input
          title="Equipment"
          className="border-[1px] rounded-md border-black focus:border-2 focus:border-[#efae31]"
        />
      </form> */}
        {/* <div>{tagNumber}</div> */}

        <form
          className="md:w-[80%] py-4 my-8 flex flex-1  items-center flex-col gap-8 grid-cols-8 md:mx-24 mx-4 shadow-lg bg-white rounded-lg  "
          onSubmit={handleSubmit}
        >
          <div className={inputDiv}>
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

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="equipment">
              Equipment
            </label>
            {/* <input
            type="text"
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            className={inputStyle}
          /> */}
            <Creatable
              options={equipmentOptions}
              value={equipmentOptions.find(
                (option) => option.value === formData.equipment
              )}
              //value={formData.equipment}
              //onChange={(e) => console.log(e)}
              onChange={handleEquipmentChange}
              id="equipment"
              name="equipment"
              className="border-[1px]   rounded-md border-gray-300 focus:border-2 focus:border-[#b32e36] outline-none "
              required
            />
          </div>

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="purpose">
              Purpose
            </label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className={inputStyle}
              disabled={true}
            />
          </div>

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="user">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className={inputDiv}>
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

          <div className={inputDiv}>
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
              className="border-[1px]  rounded-md border-gray-300 focus:border-2 focus:border-[#b32e36] outline-none "
              required
            />
          </div>

          {formData.equipment.toLowerCase() == "laptop" && (
            <>
              <div className={inputDiv}>
                <label className={labelStyle} htmlFor="computerName">
                  Computer Name
                </label>
                <input
                  type="text"
                  id="computer_name"
                  name="computer_name"
                  value={formData.computer_name}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div className={inputDiv}>
                <label className={labelStyle} htmlFor="os">
                  Operating System
                </label>

                <Creatable
                  options={osOptions}
                  value={osOptions.find(
                    (option) => option.value === formData.os
                  )}
                  //value={formData.equipment}
                  //onChange={(e) => console.log(e)}
                  onChange={handleOsChange}
                  id="os"
                  name="os"
                  className="border-[1px]   rounded-md border-gray-300 focus:border-2 focus:border-[#b32e36] outline-none "
                  required
                />
              </div>
            </>
          )}

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="model">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="color">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="serialNumber">
              Serial Number
            </label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              value={formData.serial_number}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="serialNumber">
              Cost
            </label>
            <input
              type="text"
              id="cost_price"
              name="cost_price"
              value={formData.cost_price}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div className={inputDiv}>
            <label className={labelStyle} htmlFor="vendor">
              Vendor
            </label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className={inputDiv}>
            <label htmlFor="subsidiary" className={labelStyle}>
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
            <div className={inputDiv}>
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
            <div className={inputDiv}>
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

          {/* <div className="form-group flex  flex-col w-[30%] ">
          <label className={labelStyle} htmlFor="dateReceived">
            Date Received
          </label>
          <input
            type="date"
            id="dateReceived"
            name="dateReceived"
            value={formData.dateReceived}
            onChange={handleChange}
            className={inputStyle}
          />
        </div> */}

          {/* <div className="form-group flex  flex-col w-[30%] ">
          <label className={labelStyle} htmlFor="dateDeployed">
            Date Deployed
          </label>
          <input
            type="date"
            id="dateDeployed"
            name="dateDeployed"
            value={formData.dateDeployed}
            onChange={handleChange}
            className={inputStyle}
          />
        </div> */}

          <button
            className="md:w-[30%] w-[70%] bg-[#b32e36] hover:bg-[#94252c] text-white shadow-md "
            type="submit"
          >
            Submit
          </button>

          {/* <button
            onClick={() => {
              console.log(formData);
            }}
          >
            asd
          </button> */}
        </form>
        {/* <button
          className="w-[30%] bg-[#b32e36] hover:bg-[#94252c] text-white shadow-md "
          onClick={() => console.log(formData)}
        >
          Submit
        </button> */}
      </div>
    </div>
  );
}

export default AddItem;
