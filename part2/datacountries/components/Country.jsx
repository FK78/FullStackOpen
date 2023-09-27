/* eslint-disable react/prop-types */
const Country = ({ singleCountry }) => {
  const languages = Object.values(singleCountry.languages);
  return (
    <div>
      <h1>{singleCountry.name}</h1>
      <p>
        Capital: {singleCountry.capital}
        <br />
        Area: {singleCountry.area}
      </p>
      <h2>Languages:</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={singleCountry.flag} alt="country flag"></img>
    </div>
  );
};

export default Country;
