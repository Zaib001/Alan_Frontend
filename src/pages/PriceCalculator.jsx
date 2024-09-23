import React, { useState } from "react";
import PriceForm from "../components/PriceForm";
import axios from "axios"; // Axios instance for API calls
import Swal from "sweetalert2"; // Import SweetAlert2

const PriceCalculator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [formData, setFormData] = useState({}); // Store the form data here
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Handle input changes for customer details (name, email, phone)
  const handleInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  // Function to capture form data when submitted
  const handleFormSubmit = (data) => {
    setFormData(data); // Store form data received from PriceForm
  };

  // Submit the order to the backend and save the order
  const submitOrder = async () => {
    try {
      setLoading(true); // Start loading while submitting the order

      // Make a request to the backend to submit the order
      const response = await axios.post("https://adhd-backend.onrender.com/api/checkout", {
        formData,
        customerDetails, // Send customer name, email, and phone
        amount: quote,   // Send the calculated quote
      });

      if (response.data.success) {
        setPaid(true); // Mark the order as successful

        // Display SweetAlert success notification
        Swal.fire({
          title: "Order Submitted!",
          text: "Your order has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Order submission failed: ", response.data.message);
      }
    } catch (error) {
      console.error("Order request failed: ", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-8">
        <PriceForm
          setQuote={setQuote}
          setLoading={setLoading}
          onFormSubmit={handleFormSubmit}
        />

        {/* Show a loading message while the quote is being calculated */}
        {loading && <p className="text-center">Calculating...</p>}

        {/* If quote is calculated, show the quote and order submission form */}
        {quote && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center">
              Your Quote: ${quote}
            </h3>

            {/* Input fields for customer details */}
            <div className="my-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={customerDetails.name}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={customerDetails.email}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2 rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone (+1234567890)"
                value={customerDetails.phone}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full mb-2 rounded-lg"
              />
            </div>

            {/* Submit the order button */}
            <button
              onClick={submitOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              Submit Order
            </button>

            {paid && (
              <p className="text-center text-green-500 mt-4">
                Order Submitted Successfully!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculator;
