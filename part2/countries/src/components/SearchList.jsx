import CountryDetail from "./CountryDetail";

export default function SearchList({ filteredArr, setShowDetail }) {
  if (filteredArr.length === 0) {
    return <h1>Nothing to show</h1>;
  } else if (filteredArr.length > 10) {
    return <h2>Too many matches, specify another filter</h2>;
  } else if (filteredArr.length < 10 && filteredArr.length !== 1) {
    return (
      <>
        {filteredArr.map((country) => (
          <div
            key={country.ccn3}
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <p>{country.name.common}</p>
            <span>
              <button onClick={() => setShowDetail(country.ccn3)}>Show</button>
            </span>
          </div>
        ))}
      </>
    );
  } else if (filteredArr.length === 1) {
    const countryData = filteredArr[0];
    return <CountryDetail countryData={countryData} />;
  }
}