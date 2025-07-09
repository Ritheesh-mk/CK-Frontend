import React, { useState, useEffect } from "react";

export const BulkOrderModal = ({ isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  console.log("Selected Products:", selectedProducts);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    businessType: "",
    estimatedMonthlyVolume: "",
    specificRequirements: "",
  });
  const [quantities, setQuantities] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const businessTypes = [
    "Restaurant/Hotel",
    "Catering Service",
    "Food Manufacturer",
    "Retail Store",
    "Distributor/Wholesaler",
    "Export Business",
    "Other",
  ];

  const volumeRanges = [
    "100-500 kg/month",
    "500-1000 kg/month",
    "1000-5000 kg/month",
    "5000-10000 kg/month",
    "10000+ kg/month",
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setSelectedProducts([]);
      setFormData({
        companyName: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        businessType: "",
        estimatedMonthlyVolume: "",
        specificRequirements: "",
      });
      setQuantities({});
      setActiveStep(1);
      setErrors({});
    }
  }, [isOpen]);

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      // Initialize with empty packages array
      setQuantities({
        ...quantities,
        [productId]: {
          packages: [],
        },
      });
    }
  };

  const addPackageSize = (productId) => {
    const currentPackages = quantities[productId]?.packages || [];
    setQuantities({
      ...quantities,
      [productId]: {
        ...quantities[productId],
        packages: [...currentPackages, { packaging: "", quantity: "" }],
      },
    });
  };

  const removePackageSize = (productId, packageIndex) => {
    const currentPackages = quantities[productId]?.packages || [];
    const updatedPackages = currentPackages.filter(
      (_, index) => index !== packageIndex
    );
    setQuantities({
      ...quantities,
      [productId]: {
        ...quantities[productId],
        packages: updatedPackages,
      },
    });
  };

  const handlePackageChange = (productId, packageIndex, field, value) => {
    const currentPackages = quantities[productId]?.packages || [];
    const updatedPackages = [...currentPackages];
    updatedPackages[packageIndex] = {
      ...updatedPackages[packageIndex],
      [field]: value,
    };

    setQuantities({
      ...quantities,
      [productId]: {
        ...quantities[productId],
        packages: updatedPackages,
      },
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};

    switch (activeStep) {
      case 1:
        if (selectedProducts.length === 0) {
          newErrors.products = "Please select at least one product";
        }
        break;
      case 2:
        if (!formData.companyName.trim())
          newErrors.companyName = "Company name is required";
        if (!formData.contactPerson.trim())
          newErrors.contactPerson = "Contact person is required";
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        if (!formData.businessType)
          newErrors.businessType = "Business type is required";

        // Validate phone format if present
        if (
          formData.phone.trim() &&
          !/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(formData.phone)
        ) {
          newErrors.phone = "Enter a valid Indian phone number";
        }
        break;
      case 3:
        if (!formData.address.trim())
          newErrors.address = "Delivery address is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep() && activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    let message = `🏢 *CK MASALA - BULK ORDER INQUIRY*\n\n`;
    message += `*COMPANY DETAILS:*\n`;
    message += `• Company: ${formData.companyName}\n`;
    message += `• Contact Person: ${formData.contactPerson}\n`;
    message += `• Phone: ${formData.phone}\n`;
    message += `• Email: ${formData.email || "N/A"}\n`;
    message += `• Business Type: ${formData.businessType}\n`;
    message += `• Monthly Volume: ${
      formData.estimatedMonthlyVolume || "N/A"
    }\n\n`;

    message += `*PRODUCT REQUIREMENTS:*\n`;
    selectedProducts.forEach((productId) => {
      const product = products.find((p) => p._id === productId);
      const productQuantities = quantities[productId];
      message += `📦 *${product.name}*\n`;
      message += `   - Category: ${product.category}\n`;

      if (
        productQuantities?.packages &&
        productQuantities.packages.length > 0
      ) {
        productQuantities.packages.forEach((pkg, index) => {
          if (pkg.packaging && pkg.quantity) {
            message += `   - ${pkg.packaging} × ${pkg.quantity}\n`;
          }
        });
      }
      message += `\n`;
    });

    message += `*DELIVERY ADDRESS:*\n${formData.address}\n\n`;

    if (formData.specificRequirements) {
      message += `*SPECIAL REQUIREMENTS:*\n${formData.specificRequirements}\n\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919787001188?text=${encodedMessage}`, "_blank");

    // Close the modal after submission
    setTimeout(() => onClose(), 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-800 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Wholesale Partnership
              </h2>
              <p className="text-emerald-100">
                Premium bulk orders for business excellence
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-emerald-200 transition-colors p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Select Products", icon: "📦" },
              { step: 2, title: "Business Details", icon: "🏢" },
              { step: 3, title: "Requirements", icon: "📋" },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    activeStep >= item.step
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep > item.step ? "✓" : item.step}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    activeStep >= item.step
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.icon} {item.title}
                </span>
                {item.step < 3 && (
                  <div
                    className={`w-12 h-1 mx-4 rounded-full ${
                      activeStep > item.step ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
          {/* Step 1: Product Selection */}
          {activeStep === 1 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Select Products for Bulk Order
              </h3>
              {errors.products && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {errors.products}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border border-emerald-100 rounded-xl p-4 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => toggleProductSelection(product._id)}
                          className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                        />
                        <div className="ml-3">
                          <h4 className="font-bold text-gray-800">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {product.description}
                          </p>
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full mt-1">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Show available packaging options */}
                    <div className="text-xs text-gray-500 mb-2">
                      <strong>Available sizes:</strong>{" "}
                      {product.packaging.join(", ")}
                    </div>

                    {selectedProducts.includes(product._id) && (
                      <div className="bg-emerald-50 rounded-lg p-3 mt-3">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-emerald-800">
                            Package Requirements
                          </h5>
                          <button
                            onClick={() => addPackageSize(product._id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Add Package
                          </button>
                        </div>

                        {quantities[product._id]?.packages?.map(
                          (pkg, index) => (
                            <div
                              key={index}
                              className="flex gap-2 mb-3 p-3 bg-white rounded-lg border border-emerald-200"
                            >
                              <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Package Size
                                </label>
                                <select
                                  value={pkg.packaging || ""}
                                  onChange={(e) =>
                                    handlePackageChange(
                                      product._id,
                                      index,
                                      "packaging",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-2 border border-emerald-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500"
                                >
                                  <option value="">Select size</option>
                                  {product.packaging.map((size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Quantity
                                </label>
                                <input
                                  type="text"
                                  value={pkg.quantity || ""}
                                  onChange={(e) =>
                                    handlePackageChange(
                                      product._id,
                                      index,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-2 border border-emerald-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-500"
                                  placeholder="e.g., 10, 50"
                                />
                              </div>
                              <div className="flex items-end">
                                <button
                                  onClick={() =>
                                    removePackageSize(product._id, index)
                                  }
                                  className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                                  title="Remove package"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )
                        )}

                        {(!quantities[product._id]?.packages ||
                          quantities[product._id].packages.length === 0) && (
                          <div className="text-center py-4 border-2 border-dashed border-emerald-300 rounded-lg">
                            <p className="text-sm text-gray-500 mb-2">
                              No packages added yet
                            </p>
                            <button
                              onClick={() => addPackageSize(product._id)}
                              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                            >
                              + Add first package
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {activeStep === 2 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className={`w-full px-4 py-3 border ${
                      errors.companyName
                        ? "border-red-500"
                        : "border-emerald-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Your business name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    className={`w-full px-4 py-3 border ${
                      errors.contactPerson
                        ? "border-red-500"
                        : "border-emerald-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Your full name"
                  />
                  {errors.contactPerson && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactPerson}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.phone ? "border-red-500" : "border-emerald-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="+91 00000 00000"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Business Type *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) =>
                      handleInputChange("businessType", e.target.value)
                    }
                    className={`w-full px-4 py-3 border ${
                      errors.businessType
                        ? "border-red-500"
                        : "border-emerald-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.businessType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Estimated Monthly Volume
                  </label>
                  <select
                    value={formData.estimatedMonthlyVolume}
                    onChange={(e) =>
                      handleInputChange(
                        "estimatedMonthlyVolume",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select volume range</option>
                    {volumeRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {activeStep === 3 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Delivery & Special Requirements
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className={`w-full px-4 py-3 border ${
                      errors.address ? "border-red-500" : "border-emerald-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    rows="4"
                    placeholder="Complete address with pincode"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Special Requirements or Notes
                  </label>
                  <textarea
                    value={formData.specificRequirements}
                    onChange={(e) =>
                      handleInputChange("specificRequirements", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows="3"
                    placeholder="Custom packaging, labeling, delivery preferences, etc."
                  ></textarea>
                </div>

                {/* Enhanced Summary */}
                <div className="bg-emerald-50 rounded-xl p-4">
                  <h4 className="font-bold text-emerald-800 mb-3">
                    Order Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Company:</strong> {formData.companyName}
                    </div>
                    <div>
                      <strong>Contact:</strong> {formData.contactPerson}
                    </div>
                    <div>
                      <strong>Business Type:</strong> {formData.businessType}
                    </div>
                    <div>
                      <strong>Selected Products:</strong>
                      <div className="mt-2 space-y-2">
                        {selectedProducts.map((id) => {
                          const product = products.find((p) => p._id === id);
                          const productQuantities = quantities[id];
                          return (
                            <div
                              key={id}
                              className="bg-white p-2 rounded-lg border border-emerald-200"
                            >
                              <div className="font-medium text-emerald-700">
                                {product?.name}
                              </div>
                              {productQuantities?.packages &&
                              productQuantities.packages.length > 0 ? (
                                <div className="text-xs text-gray-600 mt-1">
                                  {productQuantities.packages.map(
                                    (pkg, index) =>
                                      pkg.packaging && pkg.quantity ? (
                                        <span
                                          key={index}
                                          className="inline-block mr-2 bg-emerald-100 px-2 py-1 rounded"
                                        >
                                          {pkg.packaging} × {pkg.quantity}
                                        </span>
                                      ) : null
                                  )}
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 mt-1">
                                  No packages specified
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center p-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>aaruagencies@gmail.com</span>
            <span className="mx-3">•</span>
            <svg
              className="w-4 h-4 mr-2 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>+91 97870 01188</span>
          </div>
          <div className="flex gap-3 ">
            {activeStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Previous
              </button>
            )}

            {activeStep < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-medium rounded-xl shadow-md hover:from-emerald-700 hover:to-green-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold rounded-xl shadow-md hover:from-emerald-700 hover:to-green-600 transition-all transform hover:scale-105 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M.05 3.555A2 2 0 012 2h12a2 2 0 011.95 1.555L8 8.414.05 3.555zM0 4.697v10.666a2 2 0 002 2h12a2 2 0 002-2V4.697l-6 5.434L0 4.697z" />
                </svg>
                Send WhatsApp Inquiry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BulkOrderModal;