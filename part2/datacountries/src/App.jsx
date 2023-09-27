import { useEffect, useState } from "react";
import countriesService from "../services/countries";
import Display from "../components/Display";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [singleCountry, setSingleCountry] = useState(null);
  const [numberOfCountries, setNumberOfCountries] = useState(0);
  const [tooManyCountries, setTooManyCountries] = useState(false);

  useEffect(() => {
    countriesService.getAllCountries().then((countries) => {
      setAllCountries(
        countries.map((cn, idx) => ({
          key: idx,
          name: cn.name.common,
          capital: cn.capital,
          area: cn.area,
          flag: cn.flags.png,
          languages: cn.languages,
        }))
      );
    });
  }, []);

  const resetState = () => {
    setCountriesList([]);
    setTooManyCountries(false);
  };

  const setCountries = (countrySearch, lengthofCountrySearch) => {
    setCountriesList(countrySearch);
    setNumberOfCountries(lengthofCountrySearch);
  };

  const checkIfThereAreTooManyCountries = () => {
    if (tooManyCountries) {
      return true;
    } else {
      return false;
    }
  };

  const showButtonClicked = (key) => {
    const country = countriesList.find((o) => o.key == key);
    setSingleCountry(country);
  };

  const searchForCountries = (event) => {
    const eventTarget = event.target.value;
    // Any change to the input removes the current showing country
    setSingleCountry(null);
    const countrySearch = allCountries.filter((c) =>
      c.name.toLowerCase().startsWith(eventTarget.toLowerCase())
    );
    const lengthofCountrySearch = countrySearch.length;

    if (lengthofCountrySearch === 1) {
      const [countryObject] = countrySearch;
      setCountries(countrySearch, lengthofCountrySearch)
      setSingleCountry(countryObject);
    } else if (lengthofCountrySearch <= 10 && lengthofCountrySearch > 0) {
      setCountries(countrySearch, lengthofCountrySearch)
    } else if (lengthofCountrySearch > 10) {
      setTooManyCountries(true);
    }

    // Reset the state if a user empties the input form
    if (eventTarget === "") {
      resetState();
    }
  };

  return (
    <div>
      <form>
        find countries:{" "}
        <input onChange={searchForCountries} aria-label="enter country" />
      </form>
      {countriesList.length > 10 || countriesList < 1 ? (
        <div>
          {checkIfThereAreTooManyCountries()
            ? "Too many matches, specify another filter"
            : " "}
        </div>
      ) : (
        <Display
          howMany={numberOfCountries}
          foundCountries={countriesList}
          singleCountry={singleCountry}
          showButtonClicked={showButtonClicked}
        />
      )}
    </div>
  );
}

export default App;
