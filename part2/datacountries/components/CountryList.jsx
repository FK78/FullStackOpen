/* eslint-disable react/prop-types */
const CountryList = ({ foundCountries }) => {
  return (
    <div>
      {foundCountries.map((country) => (
        <div key={country}>{country}</div>
      ))}
    </div>
  );
};

export default CountryList;