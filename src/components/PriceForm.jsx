import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// Custom Tooltip Icon for Information
const InfoIcon = ({ text }) => (
  <span
    style={{
      cursor: "pointer",
      fontSize: "0.8em",
      color: "black",
      marginLeft: "5px",
    }} // Smaller and black
    title={text}
  >
    ❓
  </span>
);

const RoofIcon = ({ type }) => {
  switch (type) {
    case "All 1 Story":
      return (
        <img
          src="/src/images/precise_cropped_house_1.jpeg"
          alt="All 1 Story"
          style={{ width: "100%", height: "auto" }}
        />
      );
    case "Mostly 1 Story":
      return (
        <img
          src="/src/images/precise_cropped_house_2.jpeg"
          alt="Mostly 1 Story"
          style={{ width: "100%", height: "auto" }}
        />
      );
    case "Mixed 1S + 2S":
      return (
        <img
          src="/src/images/precise_cropped_house_3.jpeg"
          alt="Mixed 1S + 2S"
          style={{ width: "100%", height: "auto" }}
        />
      );
    case "Mostly 2 Story":
      return (
        <img
          src="/src/images/precise_cropped_house_4.jpeg"
          alt="Mostly 2 Story"
          style={{ width: "100%", height: "auto" }}
        />
      );
    case "All 2 Story":
      return (
        <img
          src="/src/images/precise_cropped_house_5.jpeg"
          alt="All 2 Story"
          style={{ width: "100%", height: "auto" }}
        />
      );
    default:
      return (
        <img
          src="/src/images/precise_cropped_house_6.jpeg"
          alt="Default House"
          style={{ width: "100%", height: "auto" }}
        />
      );
  }
};

const PriceForm = ({ setQuote, setLoading, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    color: "",
    sides: [],
    length: "",
    height: "",
    roofType: "",
    roofPitch: "",
  });
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const steps = [
    {
      label: (
        <>
          Choose Color
          <InfoIcon text="White - Warm white Christmas light bulbs. Blue - Blue Christmas light bulbs. R/W - Alternating red and warm white Christmas light bulbs. R/G - Alternating red and green Christmas light bulbs. RWG - Alternating warm white, red, and green Christmas light bulbs. Multi - Multi color Christmas light bulbs including five colors, red, green, blue, yellow, and orange." />
        </>
      ),
      field: "color",
      options: [
        { value: "White", colors: ["#FFFFFF"] },
        { value: "Blue", colors: ["#0000FF"] },
        { value: "R/W", colors: ["#FF0000", "#FFFFFF"] },
        { value: "R/G", colors: ["#FF0000", "#008000"] },
        { value: "RWG", colors: ["#FF0000", "#FFFFFF", "#008000"] },
        {
          value: "Multi",
          colors: ["#FF0000", "#0000FF", "#008000", "#FFFF00", "#FFA500"],
        }, // added orange instead of purple
      ],
    },
    {
      label: (
        <>
          Choose Sides
          <InfoIcon text="Choose as many sides as you'd like. You can add or remove sides later." />
        </>
      ),
      field: "sides",
      options: ["Front", "Back", "Left", "Right"],
    },
    {
      label: (
        <>
          Choose Length
          <InfoIcon text="The average home needs 80ft. Use the garage door as reference (16ft wide)." />
        </>
      ),
      field: "length",
      options: [
        "50ft",
        "75ft",
        "100ft",
        "125ft",
        "150ft",
        "175ft",
        "200ft",
        "Custom",
      ],
    },
    {
      label: (
        <>
          Choose Height
          <InfoIcon text="All 1 Story - Entire roof is one story. Mixed means a blend of one and two stories." />
        </>
      ),
      field: "height",
      options: [
        { value: "All 1 Story", icon: <RoofIcon type="All 1 Story" /> },
        { value: "Mostly 1 Story", icon: <RoofIcon type="Mostly 1 Story" /> },
        { value: "Mixed 1S + 2S", icon: <RoofIcon type="Mixed 1S + 2S" /> },
        { value: "Mostly 2 Story", icon: <RoofIcon type="Mostly 2 Story" /> },
        { value: "All 2 Story", icon: <RoofIcon type="All 2 Story" /> },
      ],
    },
    {
      label: (
        <>
          Choose Roof Type
          <InfoIcon text="Most roofs are shingles, but select wood or metal if applicable." />
        </>
      ),
      field: "roofType",
      options: ["Metal", "Shingles", "Wood"],
    },
    {
      label: (
        <>
          Choose Roof Pitch
          <InfoIcon text="Roof pitch is how steep the roof is. Most roofs have a standard pitch." />
        </>
      ),
      field: "roofPitch",
      options: ["Steep", "Standard", "Low", "Flat"],
    },
  ];

  const handleNext = () => {
    if (!formData[steps[step].field]) {
      setError("This field is required");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError("");
    const isFormValid = Object.values(formData).every((val) =>
      Array.isArray(val) ? val.length > 0 : val
    );
    if (!isFormValid) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://adhd-backend.onrender.com/api/calculate",
        formData
      );
      setQuote(response.data.quote);
      onFormSubmit(formData);
    } catch (err) {
      setError("Failed to calculate price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const currentStep = steps[step];

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Price Calculator
      </h2>

      <div className="mb-4">
        <label className="block text-lg font-medium">{currentStep.label}</label>

        {currentStep.field === "color" ? (
          <div className="grid grid-cols-3 gap-4 mt-4 ">
            {currentStep.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData[currentStep.field] === option.value
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  handleFieldChange(currentStep.field, option.value)
                }
              >
                <div className="flex justify-center items-center space-x-2">
                  {option.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-3xl"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-center mt-2">{option.value}</p>
              </motion.div>
            ))}
          </div>
        ) : currentStep.field === "sides" ? (
          <div className="flex flex-wrap gap-4 mt-4">
            {currentStep.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData[currentStep.field].includes(option)
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  handleFieldChange(
                    currentStep.field,
                    formData[currentStep.field].includes(option)
                      ? formData[currentStep.field].filter((s) => s !== option)
                      : [...formData[currentStep.field], option]
                  )
                }
              >
                <p className="text-center">{option}</p>
              </motion.div>
            ))}
          </div>
        ) : currentStep.field === "height" ? (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {currentStep.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData[currentStep.field] === option.value
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  handleFieldChange(currentStep.field, option.value)
                }
              >
                {option.icon}
                <p className="text-center mt-2">{option.value}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mt-4">
            {currentStep.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData[currentStep.field] === option
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleFieldChange(currentStep.field, option)}
              >
                <p className="text-center">{option}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="mt-6 flex justify-between">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceForm;
