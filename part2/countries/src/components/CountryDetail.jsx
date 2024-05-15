
import WeatherInfo from "./WeatherInfo";
export default function CountryDetail({ countryData }) {
  return (
    <>
      <h1>{countryData.name.official}</h1>
      <p>Capital {countryData.capital[0]}</p>
      <p>Area {countryData.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(countryData.languages).map((langKey) => (
          <li key={langKey}>{countryData.languages[langKey]}</li>
        ))}
      </ul>
      <img src={countryData.flags.png} />
      <WeatherInfo countryData={countryData} />
    </>
  );
}
