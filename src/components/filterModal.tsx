import React, { useEffect, useRef, useState } from "react";
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

function FilterModal({
  modalIsOpen,
  openModal,
  afterOpenModal,
  closeModal,
  subtitle,
  filters,
  setFilters,
  handleBuaFoodsFilter,
  handleBuaCementFilter,
  handleAssignedFilters,
  handleDepartmentFilter,
  handleStartDateFilter,
  handleEndDateFilter,
  handleFilterChange,
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
      height: "90%",
    },
  };

  // const handleFilterChange = (event) => {
  //   setFilters({ ...filters, subsidiary: event.target });
  // };

  const emptyFilter = {
    tag_number: "",
    subsidiary: "",
    user: "",
    location: "",
    assigned: null,
    department: null, // New state for department filter
    date_before: null,
    date_after: null, // New state for date filter
  };

  const submitButtonRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Scroll to the submit button when Enter is pressed
      submitButtonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-screen bg-gray-200 text-black ">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //style={customStyles}
        contentLabel="Example Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-[90%] h-[80vh] overflow-scroll mt-8 w-[50%] border border-gray-500 shadow-lg bg-gray-100 rounded-md py-12 sm:py-4 text-black"
      >
        {/* <div className="justify-start items-end">
          <button
            className="flex justify-end mb-4 bg-white"
            onClick={closeModal}
          >
            Close
          </button>
        </div> */}
        <div className="w-full mt-8 text-black">
          <div className="justify-center items-center flex text-lg font-semibold">
            Advanced Filter
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col border border-gray-100 px-4 rounded-md ">
              <div className="font-semibold ">Filter by Subsidiary</div>
              {subsidiary.map((item) => (
                <div key={item} className="">
                  <input
                    type="radio"
                    id={item}
                    name="subsidiary"
                    value={item}
                    checked={filters.subsidiary === item}
                    onChange={handleFilterChange}
                    className="mr-2 text-black bg-white "
                  />
                  <label className="" htmlFor={item}>
                    {item}
                  </label>
                </div>
              ))}
              <div className="flex flex-row ">
                <button
                  onClick={() => setFilters({ ...filters, subsidiary: null })}
                  className="bg-inherit  hover:text-red-500 text-red-700"
                >
                  clear
                </button>
              </div>
            </div>
            <div className="flex flex-col border border-gray-300 rounded-md px-4">
              <div className="font-semibold">has been checked in</div>
              <div className="flex flex-row items-center  ">
                <label className="mr-2" htmlFor="assigned">
                  Yes
                </label>
                <input
                  type="radio"
                  name="assigned"
                  id="assigned"
                  value={"true"}
                  onChange={handleAssignedFilters}
                  checked={filters.assigned == "true"}
                  className="bg-white "
                />
              </div>

              <div className="flex flex-row items-center ">
                <label className="mr-2 " htmlFor="assigned">
                  No
                </label>
                <input
                  type="radio"
                  name="assigned"
                  id="assigned"
                  value={"false"}
                  onChange={handleAssignedFilters}
                  checked={filters.assigned == "false"}
                />
              </div>

              {/* <div className="flex flex-row items-center">
                <label className="mr-2 " htmlFor="assigned">
                  
                </label>
                <input
                  type="radio"
                  name="assigned"
                  id="assigned"
                  value={""}
                  onClick={handleAssignedFilters}
                />
              </div> */}
              <div className="flex flex-row ">
                <button
                  onClick={() => setFilters({ ...filters, assigned: null })}
                  className="bg-inherit  hover:text-red-500 text-red-700"
                >
                  clear
                </button>
              </div>

              <div className="w-40 mt-8 ">
                <input
                  className="w-full outline-none border-b-[2px] bg-gray-100 border-[#b32e36] rounded-sm py-1 sm:px-0 text-black"
                  placeholder="Search user"
                  onKeyDown={handleKeyPress}
                  name="user"
                  value={filters.user}
                  onChange={(e) =>
                    setFilters({ ...filters, user: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col text-black ">
              {filters.subsidiary == "BUA Foods" && (
                <>
                  <div className="font-semibold">Bua Foods</div>
                  {bua_foods.map((item) => (
                    <>
                      <div key={item} className="flex flex-row ">
                        <input
                          type="radio"
                          id={item}
                          name="bua_foods"
                          value={item}
                          checked={filters.location === item}
                          onChange={handleBuaFoodsFilter}
                          className="mr-2 text-black"
                        />
                        <label htmlFor={item}>{item}</label>
                      </div>
                    </>
                  ))}
                </>
              )}
              {filters.subsidiary == "BUA Foods" && (
                <div className="flex flex-row ">
                  <button
                    onClick={() => setFilters({ ...filters, location: null })}
                    className="bg-inherit  hover:text-red-500 text-red-700"
                  >
                    clear
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              {filters.subsidiary == "BUA Cement" && (
                <>
                  <div className="font-semibold">Bua Cement</div>
                  {bua_cement.map((item) => (
                    <div key={item} className="flex flex-row">
                      <input
                        type="radio"
                        id={item}
                        name="bua_cement"
                        value={item}
                        checked={filters.location === item}
                        onChange={handleBuaCementFilter}
                        className="mr-2 text-black"
                      />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </>
              )}
              {filters.subsidiary == "BUA Cement" && (
                <div className="flex flex-row ">
                  <button
                    onClick={() => setFilters({ ...filters, location: null })}
                    className="bg-inherit  hover:text-red-500 text-red-700"
                  >
                    clear
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-around  mt-4 border border-gray-300 px-4 rounded-md  py-4">
            <div className="font-semibold">Filter by Department</div>
            <div className="flex flex-row">
              <select
                value={filters.department}
                onChange={handleDepartmentFilter}
                className="mt-2 p-2 border border-gray-300 bg-white rounded-md text-black"
              >
                <option value="">All Departments</option>
                {departmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-row ">
                <button
                  onClick={() => setFilters({ ...filters, department: null })}
                  className="bg-inherit  hover:text-red-500 text-red-700"
                >
                  clear
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col">
          <div className="font-semibold">Filter by Date</div>
          <input
            type="date"
            value={filters.date}
            onChange={handleDateFilter}
            //dateFormat="MMMM d, yyyy"
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div> */}
          <div className="flex flex-col  mt-4 border py-4 px-4 rounded-md border-gray-300">
            <div className="font-semibold">Filter by Date Range</div>
            <div className="flex flex-row">
              <input
                type="date"
                value={filters.date_after}
                onChange={handleStartDateFilter}
                className=" rounded-md py-1 border border-gray-300"
              />
              <span className="mx-8">to</span>
              <input
                type="date"
                value={filters.date_before}
                onChange={handleEndDateFilter}
                className="rounded-md py-1 border border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-[5%] justify-around">
          <button
            className="  hover:text-red-500 text-red-700 bg-inherit"
            onClick={() => setFilters(emptyFilter)}
          >
            clear all
          </button>

          <button
            className="flex justify-end bg-inherit"
            onClick={closeModal}
            ref={submitButtonRef}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FilterModal;
