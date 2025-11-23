import React, { useState } from "react";
import axios from "axios";

// Reusable Input Field Component
const InputField = ({ label, name, type = "text", value, onChange, placeholder = "", isRequired = false }) => (
  <div className="relative z-0 w-full mb-6 group">
    <input
      type={type}
      name={name}
      id={name}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
      placeholder=" "
      value={value}
      onChange={onChange}
      required={isRequired}
    />
    <label
      htmlFor={name}
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
  </div>
);

// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options, placeholder = "Select an option", isRequired = false }) => (
  <div className="relative z-0 w-full mb-6 group">
    <select
      name={name}
      id={name}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
      value={value}
      onChange={onChange}
      required={isRequired}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label
      htmlFor={name}
      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
  </div>
);


const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  
  // State updated to hold an array of files
  const [images, setImages] = useState([]);
  
  const [loading, setLoading] = useState(false); // For loading state
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, productAvailable: e.target.checked });
  };

  // Function updated to handle multiple files
  const handleImageChange = (e) => {
    // Convert FileList object to an Array
    setImages(Array.from(e.target.files));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    
    // Logic updated to append multiple files
    if (images.length > 0) {
      images.forEach((file) => {
        // Using 'imageFiles' key to match backend expectation for multiple files
        formData.append("imageFiles", file); 
      });
    }

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      const response = await axios.post("http://localhost:8080/api/product", formData, {
        headers: {
          // No need to explicitly set Content-Type, FormData sets it correctly as multipart/form-data
        },
      });
      console.log("Product added successfully:", response.data);
      setSuccessMessage("Product added successfully!");
      // Reset form
      setProduct({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
      });
      setImages([]); // Reset images state
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("Error adding product. Please try again.");
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        setErrorMessage(`Error: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage("Error: No response from server. Check network connection.");
      } else {
        console.error("Error message:", error.message);
        setErrorMessage(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "Laptop", label: "Laptop" },
    { value: "Headphone", label: "Headphone" },
    { value: "Mobile", label: "Mobile" },
    { value: "Electronics", label: "Electronics" },
    { value: "Toys", label: "Toys" },
    { value: "Fashion", label: "Fashion" },
    { value: "Books", label: "Books" },
    { value: "Home Appliances", label: "Home Appliances" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          🚀 Add New Product
        </h2>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="e.g. Wireless Noise-Cancelling Headphones"
              isRequired
            />
            <InputField
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              placeholder="e.g. Sony, Apple, Samsung"
              isRequired
            />
          </div>

          {/* Description input is handled here */}
          <div className="relative z-0 w-full mb-6 group">
            <textarea
                name="description"
                id="description"
                rows="4"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer resize-none"
                placeholder=" "
                value={product.description}
                onChange={handleInputChange}
                required={true}
            />
            <label
                htmlFor="description"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Description <span className="text-red-500">*</span>
            </label>
          </div>
          {product.description.length > 0 && product.description.length < 50 && (
            <p className="text-sm text-red-500 -mt-4">Description should be at least 50 characters.</p>
          )}


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleInputChange}
              placeholder="e.g. 199.99"
              isRequired
            />

            <SelectField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              options={categoryOptions}
              isRequired
            />

            <InputField
              label="Stock Quantity"
              name="stockQuantity"
              type="number"
              value={product.stockQuantity}
              onChange={handleInputChange}
              placeholder="e.g. 150"
              isRequired
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField
              label="Release Date"
              name="releaseDate"
              type="date"
              value={product.releaseDate}
              onChange={handleInputChange}
              isRequired
            />
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                Product Images
              </label>
              <input
                type="file"
                name="images"
                id="images"
                multiple // This allows multiple file selection
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {images.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">Selected: {images.length} file(s)</p>
              )}
            </div>
          </div>
          

          <div className="flex items-center space-x-3 mt-6">
            <input
              type="checkbox"
              name="productAvailable"
              id="productAvailable"
              checked={product.productAvailable}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="productAvailable" className="text-lg font-medium text-gray-700">
              Product Available for Sale
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition duration-300 ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Product...
              </span>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;