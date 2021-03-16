import React, { useState } from "react";
import { Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ onSearch }) => {
  const [searchFocused, setSearchFocus] = useState(false);

  return (
    <div>
      <Input
        size="large"
        type="text"
        placeholder="search lists, tags, and more.."
        prefix={
          <SearchOutlined
            style={{
              fontSize: 48,
              color: searchFocused ? "black" : "white",
              paddingRight: 10,
            }}
          />
        }
        bordered={false}
        onFocus={() => {
          setSearchFocus(true);
        }}
        onBlur={() => {
          setSearchFocus(false);
        }}
        onChange={(e) => {
          onSearch?.(e.target.value);
        }}
        style={{ backgroundColor: searchFocused ? "white" : "transparent" }}
      />
    </div>
  );
};

export default SearchBar;
