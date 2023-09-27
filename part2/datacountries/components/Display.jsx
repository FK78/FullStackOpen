/* eslint-disable react/prop-types */
import CountryList from "./CountryList";
import Country from "./Country";

const Display = ({ howMany, foundCountries, singleCountry }) => {
  return (
    <div>
      {howMany > 1 && howMany !== 0 ? (
        <CountryList foundCountries={foundCountries} />
      ) : (
        <Country singleCountry={singleCountry} />
      )}
    </div>
  );
};

export default Display;
