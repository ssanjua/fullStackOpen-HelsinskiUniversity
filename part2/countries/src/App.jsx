
import { useState, useEffect } from "react";
import axios from "axios";
import SearchList from "./components/SearchList";

function App() {
  const [searchField, setSearchField] = useState("");
  const [countryArray, setCountryArray] = useState([]);
  const [showDetail, setShowDetail] = useState("");
  const filteredArr = countryArray.filter((country) => {
    if (showDetail) {
      return country.ccn3 === showDetail;
    } else {
      return country.name.common
        .toLowerCase()
        .includes(searchField.toLowerCase());
    }
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountryArray(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <span>Find Countries: </span>
      <input
        type="text"
        onChange={(e) => {
          setShowDetail("");
          setSearchField(e.target.value);
        }}
        value={searchField}
      />
      {!!searchField.trim() && (
        <SearchList filteredArr={filteredArr} setShowDetail={setShowDetail} />
      )}
    </>
  );
}

export default App;
