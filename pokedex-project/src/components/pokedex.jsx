import { useState, useEffect } from "react";
import { useTypesAndWeaknesses, filterPokemon } from "../utils/filter";
import './pokedex.css';

function Pokedex(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchWeakness, setSearchWeakness] = useState("");
  const { types, weaknesses } = useTypesAndWeaknesses(list);

  function getPokemon() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setList(result.pokemon);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPokemon();
  }, []);

  let displayList = filterPokemon(list, searchName, searchType, searchWeakness);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div id="searchBars">
        <label htmlFor="searchName">Search Pokemon By Name</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
        />

        <label htmlFor="searchType">Search Pokemon By Type</label>
        <select
          name="searchType"
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          {types.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>

        <label htmlFor="searchWeakness">Search Pokemon By Weakness</label>
        <select
          name="searchWeakness"
          id="searchWeakness"
          value={searchWeakness}
          onChange={(e) => setSearchWeakness(e.target.value)}
        >
          {weaknesses.map((weakness, index) => {
            return (
              <option key={index} value={weakness}>
                {weakness}
              </option>
            );
          })}
        </select>
      </div>

      {displayList.map((pokemon) => {
        return (
          <div key={pokemon.id} id="pokemonInd">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.img} alt="" />
            <p>Type:</p>
            <ul>
              {pokemon.type.map((type, index) => (
                <li key={index + pokemon.id + type}>{type}</li>
              ))}
            </ul>

            <p>Weakness(es):</p>
            <ul>
              {pokemon.weaknesses.map((weakness, index) => (
                <li key={index + pokemon.id + weakness}>{weakness}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Pokedex;
