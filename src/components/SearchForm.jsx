import { Search } from "lucide-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/SearchForm.css";
import { useProperty } from "../context/PropertyContext"; // Import context

const SearchForm = () => {
  const { searchCriteria, setSearchCriteria, performSearch } = useProperty();

  const handleSelectChange = (selectedOption, { name }) => {
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: selectedOption.value,
    }));
  };

  // Handler for Date Picker
  const handleDateChange = (date) => {
    // Store as ISO string YYYY-MM-DD or empty
    const dateStr = date ? date.toISOString().split("T")[0] : "";
    setSearchCriteria((prev) => ({
      ...prev,
      dateAddedAfter: dateStr,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Searching with:", searchCriteria);
    performSearch();
  };

  // Options configuration
  const typeOptions = [
    { value: "any", label: "Any" },
    { value: "house", label: "House" },
    { value: "flat", label: "Flat" },
    { value: "semi-detached", label: "Semi-Detached" },
    { value: "detached bungalow", label: "Detached Bungalow" },
    { value: "block of apartments", label: "Block of Apartments" },
  ];

  const minPriceOptions = [
    { value: 0, label: "No min" },
    { value: 100000, label: "£100,000" },
    { value: 200000, label: "£200,000" },
    { value: 300000, label: "£300,000" },
    { value: 400000, label: "£400,000" },
    { value: 500000, label: "£500,000" },
  ];

  const maxPriceOptions = [
    { value: 2000000, label: "No max" },
    { value: 200000, label: "£200,000" },
    { value: 300000, label: "£300,000" },
    { value: 400000, label: "£400,000" },
    { value: 500000, label: "£500,000" },
    { value: 1000000, label: "£1,000,000" },
  ];

  const minBedOptions = [
    { value: 0, label: "No min" },
    { value: 1, label: "1 Bed" },
    { value: 2, label: "2 Beds" },
    { value: 3, label: "3 Beds" },
    { value: 4, label: "4 Beds" },
    { value: 5, label: "5 Beds" },
  ];

  const maxBedOptions = [
    { value: 10, label: "No max" },
    { value: 1, label: "1 Bed" },
    { value: 2, label: "2 Beds" },
    { value: 3, label: "3 Beds" },
    { value: 4, label: "4 Beds" },
    { value: 5, label: "5 Beds" },
  ];

  // Helper to find current value object for React Select
  const getValueObj = (options, val) =>
    options.find((opt) => opt.value === val);

  // Custom styles for React Select to match theme
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: "#d1d5db",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#22c55e",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#22c55e"
        : state.isFocused
        ? "#bbf7d0"
        : null,
      color: state.isSelected ? "white" : "#374151",
    }),
  };

  return (
    <div className="search-form-container">
      <h2 className="search-form-title">Find your happy</h2>
      <form onSubmit={handleSubmit} className="form-group-spacing">
        {/* Row 1: Search Radius & Type */}
        <div className="search-form-grid search-form-grid-3-cols">
          <div>
            <label htmlFor="postcodeArea" className="search-form-label">
              Search area
            </label>
            <input
              type="text"
              id="postcodeArea"
              name="postcodeArea"
              placeholder="e.g. EX31, NW1"
              value={searchCriteria.postcodeArea}
              onChange={handleChange}
              className="search-form-input"
            />
          </div>

          <div>
            <label htmlFor="type" className="search-form-label">
              Property type
            </label>
            <Select
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={true}
              name="type"
              options={typeOptions}
              value={getValueObj(typeOptions, searchCriteria.type)}
              onChange={handleSelectChange}
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label htmlFor="dateAddedAfter" className="search-form-label">
              Added after
            </label>
            <div className="custom-datepicker-wrapper">
              <DatePicker
                selected={
                  searchCriteria.dateAddedAfter
                    ? new Date(searchCriteria.dateAddedAfter)
                    : null
                }
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="search-form-input w-full"
                wrapperClassName="w-full"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Price Range & Bedrooms */}
        <div className="search-form-grid search-form-grid-4-cols">
          <div>
            <label htmlFor="minPrice" className="search-form-label">
              Min Price (£)
            </label>
            <Select
              name="minPrice"
              options={minPriceOptions}
              value={getValueObj(minPriceOptions, searchCriteria.minPrice)}
              onChange={handleSelectChange}
              styles={customStyles}
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="search-form-label">
              Max Price (£)
            </label>
            <Select
              name="maxPrice"
              options={maxPriceOptions}
              value={getValueObj(maxPriceOptions, searchCriteria.maxPrice)}
              onChange={handleSelectChange}
              styles={customStyles}
            />
          </div>

          <div>
            <label htmlFor="minBedrooms" className="search-form-label">
              Min Beds
            </label>
            <Select
              name="minBedrooms"
              options={minBedOptions}
              value={getValueObj(minBedOptions, searchCriteria.minBedrooms)}
              onChange={handleSelectChange}
              styles={customStyles}
            />
          </div>

          <div>
            <label htmlFor="maxBedrooms" className="search-form-label">
              Max Beds
            </label>
            <Select
              name="maxBedrooms"
              options={maxBedOptions}
              value={getValueObj(maxBedOptions, searchCriteria.maxBedrooms)}
              onChange={handleSelectChange}
              styles={customStyles}
            />
          </div>
        </div>

        <div className="search-form-actions">
          <button type="submit" className="search-form-btn">
            <Search className="search-form-btn-icon" />
            Start Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
