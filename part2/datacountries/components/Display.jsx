/* eslint-disable react/prop-types */
import CountryList from "./CountryList";
import Country from "./Country";

const Display = ({ foundCountries, singleCountry, showButtonClicked }) => {

  const shouldDisplayCountryinfo = !!singleCountry; 

  return (
    <div>
      {!shouldDisplayCountryinfo ? (
        <CountryList foundCountries={foundCountries} showButtonClicked={showButtonClicked} />
      ) : (
        <Country singleCountry={singleCountry} />
      )}
    </div>
  );
};

export default Display;
