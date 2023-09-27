/* eslint-disable react/prop-types */
const CountryList = ({ foundCountries, showButtonClicked }) => {
  return (
    <div>
      {foundCountries.map((country) => (
        <div key={country.key}>
          {country.name}{" "}
          <button onClick={() => showButtonClicked(country.key)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
