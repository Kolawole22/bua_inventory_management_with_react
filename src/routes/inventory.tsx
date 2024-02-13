//import buagrouplogo-web-min from '../assets/buagroup-web-min.webp'
import { useCallback, useEffect, useMemo, useState } from "react";
import logoPath from "../assets/buagrouplogo.webp";
import Creatable from "react-select/creatable";
import { render } from "react-dom";

import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

import Nav from "../components/nav";
import {
  Await,
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";
import axios from "axios";
//import { client } from "../authContext";
import api, { setupInterceptors } from "../components/authService";
import React from "react";
import FilterModal from "../components/filterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "../components/pagination";

function Inventory() {
  //const [assignedInventory, setAssignedInventory] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  //let data = useLoaderData();
  const [inventory, setInventory] = useState([]);

  const navigate = useNavigate();
  const { state } = useNavigation();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  const [filters, setFilters] = useState({
    tag_number: "",
    subsidiary: "",
    location: "",
    assigned: null,
    department: null, // New state for department filter
    date_before: null,
    date_after: null, // New state for date filter
  });

  const [page, setPage] = useState({ page: 1, page_size: 10 });
  const [pageCount, setPageCount] = useState(0);

  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const fetchInventory = useCallback(async () => {
    setIsloading(true);
    try {
      const tokenData = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
      };

      const response = await api.get("api/inventories/", {
        headers: headers,
        params: { ...filters, ...page },
      });

      if (response && response.status == 200) {
        setIsloading(false);
        const data = await response.data.results;
        setInventory(data);
        const count = response.data.count;
        const total_pages = Math.ceil(count / 10);
        setPageCount(total_pages);
        console.log("length", response.data.total_count);
        console.log("inventory", inventory);
      }
    } catch (error) {
      //navigate("/error-page");
      console.error(error);
    }
  }, [filters, page, setInventory]);

  // Debounced fetch function
  const debouncedfetchInventory = useMemo(
    () => debounce(fetchInventory, 500),
    [fetchInventory]
  );

  useEffect(() => {
    // Call the memoized debounced function when filters change
    debouncedfetchInventory();
  }, [filters, debouncedfetchInventory]);
  useEffect(() => {
    //console.log("items", assignedInventory);
  });

  const downloadData = async () => {
    try {
      const tokenData = localStorage.getItem("accessToken");
      const headers = {
        //"Content-Type": "application/json",
        //Authorization: `Bearer ${tokenData}`,
        responseType: "blob",
      };

      const response = await api.get("api/download-csv/", {
        headers: headers,
      });
      if (response) {
        const blob = new Blob([response.data], { type: "text/csv" });

        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "inventory_data.csv"); // Set the filename for the download
        document.body.appendChild(link);

        // Trigger the download by simulating a click on the link
        link.click();

        // Remove the link element
        document.body.removeChild(link);
      }
    } catch (error) {
      //navigate("/error-page");
      console.error(error);
    }
  };

  //console.log("loaded data", loaded);

  useEffect(() => {
    console.log("items", inventory);
  }, []);

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  // const handleClick = (product) => {
  //   navigate("/product-details", { state: { product } });
  // };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleFilterChange = (selected) => {
    setFilters({
      ...filters,
      location: "",
      subsidiary: selected.target.value,
      assigned: null,
    });
  };

  // ... (other code)

  // New handler for department filter
  const handleDepartmentFilter = (selected) => {
    setFilters({
      ...filters,
      department: selected.target.value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  // New handler for date filter
  const handleStartDateFilter = (selected) => {
    setFilters({ ...filters, date_after: selected.target.value });
  };
  const handleEndDateFilter = (selected) => {
    setFilters({ ...filters, date_before: selected.target.value });
  };
  const handleBuaFoodsFilter = (selected) => {
    setFilters({ ...filters, location: selected.target.value });
    console.log("form: ", FormData);
  };
  const handleBuaCementFilter = (selected) => {
    setFilters({ ...filters, location: selected.target.value });
    console.log("form: ", FormData);
  };

  const handleAssignedFilter = (selected) => {
    setFilters({ ...filters, assigned: selected.target.value });
  };
  useEffect(() => {
    console.log("subsidiary filter", filters.subsidiary);
    console.log(filters);
  }, [filters]);
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <div className="bg-slate-300 w-full">
        <div className=" mt-8 flex-row sm:flex-col flex justify-between ">
          {/* <h2>Assigned Inventory</h2> */}

          <div className="flex flex-row gap-4 ml-4">
            <input
              type="text"
              placeholder="Search Tag Number..."
              value={filters.tag_number}
              onChange={(e) =>
                setFilters({ ...filters, tag_number: e.target.value })
              }
              className=" outline-none border-b-[2px] bg-gray-100 border-[#b32e36] rounded-sm py-1 sm:px-0 text-black"
            />
            <div className="flex sm:flex-col flex-row items-center ">
              {Object.entries(filters).map(([filterName, filterValue]) => (
                <div key={filterName} className="mr-2">
                  {filterValue && (
                    <button className="bg-slate-400 p-1 rounded-md flex flex-row items-center">
                      <div className="text-black" onClick={openModal}>
                        {filterValue}
                      </div>
                      <div
                        onClick={() =>
                          setFilters({ ...filters, [filterName]: "" })
                        }
                        className="ml-1 items-center flex justify-center"
                      >
                        <FontAwesomeIcon
                          icon={faFilterCircleXmark}
                          size="1x"
                          className="text-red-700 hover:text-red-500"
                        />
                      </div>
                    </button>
                  )}
                </div>
              ))}
              {!Object.values(filters).some((value) => !!value) && (
                <div className="bg-inherit sm:text-sm text-[#b32e36]  hover:text-[#d45058] ">
                  <button onClick={openModal} className="bg-inherit">
                    Advanced filter
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={downloadData}
            className="bg-[#b32e36] text-[#efae31] mt-0 sm:w-[50%] sm:mt-4 mx-4"
          >
            download data
          </button>
        </div>
        {isLoading && (
          <div className="flex flex-1 justify-center items-center w-full min-h-screen">
            <Dots size={36} />
          </div>
        )}

        <FilterModal
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          afterOpenModal={afterOpenModal}
          closeModal={closeModal}
          subtitle={subtitle}
          filters={filters}
          handleBuaCementFilter={handleBuaCementFilter}
          handleBuaFoodsFilter={handleBuaFoodsFilter}
          handleAssignedFilters={handleAssignedFilter}
          handleDepartmentFilter={handleDepartmentFilter}
          handleStartDateFilter={handleStartDateFilter}
          handleEndDateFilter={handleEndDateFilter}
          handleFilterChange={handleFilterChange}
          setFilters={setFilters}
        />
        {!isLoading && (
          <ul className="bg-slate-300 my-2  ">
            {inventory.map((item) => (
              <li key={item.id}>
                <Link to={`/inventory/${item.id}`} state={item} key={item.id}>
                  <div className="mx-auto mt-4">
                    {/* Item Information Card */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      {/* Item Title */}
                      <h2 className="text-3xl font-semibold mb-4">
                        {item.equipment}
                      </h2>

                      {/* Item Details */}
                      <div className="grid grid-cols-2 sm:flex sm:flex-col gap-4">
                        <div className="sm:flex-row sm:flex sm:gap-4 items-center">
                          <p className="text-gray-500">Model</p>
                          <p className="text-lg font-semibold">{item.model}</p>
                        </div>
                        <div className="sm:flex-row sm:flex sm:gap-4 items-center">
                          <p className="text-gray-500">Tag Number</p>
                          <p className="text-lg font-semibold">
                            {item.tag_number}
                          </p>
                        </div>
                        {/* Add more details as needed */}
                      </div>

                      {/* Additional Information */}
                      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col">
                        <div className="sm:flex-row sm:flex sm:gap-4 items-center mt-4 sm:mt-0">
                          <p className="text-gray-500 sm:w-[30%]">User:</p>
                          <p className="text-lg">{item.user}</p>
                        </div>
                        <div className="sm:flex-row sm:flex sm:gap-4 items-center mt-4 sm:mt-0">
                          <p className="text-gray-500">Subsidiary</p>
                          <p className="text-lg font-semibold">
                            {item.subsidiary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <PaginatedItems
          itemsPerPage={10}
          pageCount={pageCount}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default Inventory;
