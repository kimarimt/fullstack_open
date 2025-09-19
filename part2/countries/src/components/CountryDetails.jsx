const CountryDetails = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area} km²</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} />
  </div>
)

export default CountryDetails