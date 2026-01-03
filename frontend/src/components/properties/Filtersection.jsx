import { Home, Banknote, Filter, BedDouble, Bath, Tag } from "lucide-react";
import { motion } from "framer-motion";

// Property types matching admin panel (Indonesian)
const propertyTypes = [
  { value: "rumah", label: "Rumah" },
  { value: "apartemen", label: "Apartemen" },
  { value: "kantor", label: "Kantor" },
  { value: "vila", label: "Vila" }
];

// Availability types matching admin panel
const availabilityTypes = [
  { value: "mesh", label: "Mesh" },
  { value: "meeting room", label: "Meeting Room" },
  { value: "homestay", label: "Homestay" }
];

// Price ranges in Rupiah (adjusted for realistic property prices)
const priceRanges = [
  { min: 0, max: 500000, label: "< Rp 500rb" },
  { min: 500000, max: 1000000, label: "Rp 500rb - 1jt" },
  { min: 1000000, max: 5000000, label: "Rp 1jt - 5jt" },
  { min: 5000000, max: Number.MAX_SAFE_INTEGER, label: "> Rp 5jt" }
];

// Bedroom options
const bedroomOptions = ["0", "1", "2", "3", "4", "5+"];

// Bathroom options
const bathroomOptions = ["0", "1", "2", "3", "4+"];

const FilterSection = ({ filters, setFilters, onApplyFilters }) => {
  const handlePropertyTypeChange = (value) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType === value ? "" : value
    }));
  };

  const handleAvailabilityChange = (value) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability === value ? "" : value
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    const isCurrentlySelected = filters.priceRange[0] === min && filters.priceRange[1] === max;
    setFilters(prev => ({
      ...prev,
      priceRange: isCurrentlySelected ? [0, Number.MAX_SAFE_INTEGER] : [min, max]
    }));
  };

  const handleBedroomsChange = (value) => {
    setFilters(prev => ({
      ...prev,
      bedrooms: prev.bedrooms === value ? "0" : value
    }));
  };

  const handleBathroomsChange = (value) => {
    setFilters(prev => ({
      ...prev,
      bathrooms: prev.bathrooms === value ? "0" : value
    }));
  };

  const handleReset = () => {
    setFilters({
      propertyType: "",
      priceRange: [0, Number.MAX_SAFE_INTEGER],
      bedrooms: "0",
      bathrooms: "0",
      availability: "",
      searchQuery: "",
      sortBy: ""
    });
  };

  const isPriceRangeDefault = filters.priceRange[0] === 0 && filters.priceRange[1] === Number.MAX_SAFE_INTEGER;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Filter</h2>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Home className="w-4 h-4 mr-2 text-blue-600" />
            Tipe Properti
          </label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handlePropertyTypeChange(value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${filters.propertyType === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Tag className="w-4 h-4 mr-2 text-blue-600" />
            Ketersediaan
          </label>
          <div className="grid grid-cols-1 gap-2">
            {availabilityTypes.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleAvailabilityChange(value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${filters.availability === value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Banknote className="w-4 h-4 mr-2 text-blue-600" />
            Rentang Harga
          </label>
          <div className="grid grid-cols-2 gap-2">
            {priceRanges.map(({ min, max, label }) => (
              <button
                key={label}
                onClick={() => handlePriceRangeChange(min, max)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${filters.priceRange[0] === min && filters.priceRange[1] === max
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <BedDouble className="w-4 h-4 mr-2 text-blue-600" />
            Kamar Tidur
          </label>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((value) => (
              <button
                key={value}
                onClick={() => handleBedroomsChange(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all min-w-[48px]
                  ${filters.bedrooms === value && value !== "0"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {value === "0" ? "Semua" : value}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Bath className="w-4 h-4 mr-2 text-blue-600" />
            Kamar Mandi
          </label>
          <div className="flex flex-wrap gap-2">
            {bathroomOptions.map((value) => (
              <button
                key={value}
                onClick={() => handleBathroomsChange(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all min-w-[48px]
                  ${filters.bathrooms === value && value !== "0"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {value === "0" ? "Semua" : value}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4">
          <button
            onClick={() => onApplyFilters(filters)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
              transition-colors font-medium"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSection;