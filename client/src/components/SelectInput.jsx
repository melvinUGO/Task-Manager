import React from "react";
import { filterOptions } from "../utils";

const SelectInput = ({ filterOption, setFilterOption }) => {
  return (
    <>
      <select
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
        name="filter"
      >
        {filterOptions.map((option, index) => {
          const { label, value } = option;
          return (
            <option key={index} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectInput;
