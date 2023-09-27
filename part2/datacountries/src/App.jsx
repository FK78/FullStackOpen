import { useEffect, useState } from "react";
import countriesService from "../services/countries";
import Display from "../components/Display";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [numberOfCountries, setNumberOfCountries] = useState(0);
  const [tooManyCountries, setTooManyCountries] = useState(false);
  let i = 0;

  const idCounter = () => {
    return i++;
  };

  useEffect(() => {
    countriesService.getAllCountries().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  const countries = allCountries.map((cn) => ({
    key: idCounter(),
    name: cn.name.common,
    capital: cn.capital,
    area: cn.area,
    flag: cn.flags.png,
    languages: cn.languages,
  }));

  const searchForCountries = (event) => {
    const eventTarget = event.target.value;
    const countryNames = countries.map((c) => c.name);
    const countrySearch = countryNames.filter((c) =>
      c.toLowerCase().startsWith(eventTarget.toLowerCase())
    );
    const lengthofCountrySearch = countrySearch.length;
    if (lengthofCountrySearch === 1) {
      const countryObject = countries.find((o) => o.name == countrySearch);
      setSingleCountry(countryObject);
      setCountriesList(countrySearch);
      setNumberOfCountries(lengthofCountrySearch);
    } else if (eventTarget === "") {
      setCountriesList([]);
      setTooManyCountries(false);
    } else if (lengthofCountrySearch <= 10 && lengthofCountrySearch > 0) {
      setCountriesList(countrySearch);
      setNumberOfCountries(lengthofCountrySearch);
    } else if (lengthofCountrySearch > 10) {
      setTooManyCountries(true);
    }
  };

  const checkIfThereAreTooManyCountries = () => {
    if (tooManyCountries) {
      return true;
    } else {
      return false;
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
        />
      )}
    </div>
  );
}

export default App;
