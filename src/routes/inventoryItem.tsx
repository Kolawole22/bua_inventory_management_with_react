import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import ReassignModal from "../components/reassignModal";
import api from "../components/authService";
import { toast } from "react-toastify";

function InventoryItem() {
  const state = useLocation().state;
  const formattedDate = (initialDate) => {
    const date = new Date(initialDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day}, ${month}, ${year}`;
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const navigate = useNavigate();

  const checkOut = async () => {
    toast.dismiss();
    try {
      const patchData = {
        ...state,
        assigned: false,
        user: null,
        email: null,
      };
      const loadingToastId = toast.info("Checking out...", {
        autoClose: false,
      });
      const tokenData = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
      };

      const response = await api.put(
        `api/inventories/${state.tag_number}/`,
        JSON.stringify(patchData),
        {
          headers: headers,
        }
      );
      // if (!response || (response.status !== 200 && response.status != 201)) {
      //   toast.dismiss(loadingToastId);
      //   const errorData = response.data;
      //   toast.error('Network request failed', { autoClose: 2000 });
      // }

      // Display success message
      if (response && response.status == 200) {
        toast.dismiss(loadingToastId);
        const data = await response.data;
        toast.success(data.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Network request failed", { autoClose: 1000 });
    }
  };

  const handleCheckoutConfirmation = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to check out this item for the user ${state.user}?`
    );

    if (isConfirmed) {
      // User clicked "OK"
      // Implement your logic here
      checkOut();
      console.log("confirmed");
    } else {
      // User clicked "Cancel" or closed the dialog
      // Handle accordingly
      console.log("not confirmed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 flex-1">
      {/* Navbar */}

      {/* Main Content */}

      <div className="container mx-auto mt-8 p-4 min-h-full py-[4vw]">
        {/* Item Information Card */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          {/* Item Title */}
          <h2 className="text-3xl font-semibold mb-4">{state.equipment}</h2>

          {/* Item Details */}
          <div className="grid grid-cols-2 gap-4 my-8  w-full  justify-items-center">
            <button
              className="px-8 w-[30%] sm:w-[100%] py-2 text-[#efae31] text-sm md:text-lg bg-white  border-gray-300 hover:bg-gray-200 shadow-lg"
              onClick={openModal}
              disabled={state.assigned == true}
            >
              Check in
            </button>
            <button
              className="px-8 w-[30%] sm:w-[100%] py-2 text-[#efae31] text-sm md:text-lg bg-white  border-gray-300 hover:bg-gray-200 shadow-lg"
              onClick={handleCheckoutConfirmation}
            >
              Check out
            </button>
          </div>
          <ReassignModal
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            afterOpenModal={afterOpenModal}
            closeModal={closeModal}
            subtitle={subtitle}
            state={state}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Model</p>
              <p className="text-lg font-semibold">{state.model}</p>
            </div>
            <div>
              <p className="text-gray-500">Tag Number</p>
              <p className="text-lg font-semibold">{state.tag_number}</p>
            </div>
            {/* Add more details as needed */}
          </div>

          {/* Additional Information */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">User</p>
              <p>{state.user}</p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p>{state.department}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Equipment</p>
              <p>{state.equipment}</p>
            </div>
            <div>
              <p className="text-gray-500">Computer Name</p>
              <p>{state.computer_name}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Cost:</p>
              <p>{state.cost_price}</p>
            </div>
            <div>
              <p className="text-gray-500">OS</p>
              <p>{state.os}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Date Assigned</p>
              <p>{formattedDate(state.date)}</p>
            </div>
            <div>
              <p className="text-gray-500">Vendor</p>
              <p>{state.vendor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryItem;
