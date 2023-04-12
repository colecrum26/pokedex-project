import { useState, useEffect } from "react";
import { useTypesAndWeaknesses, filterPokemon } from "../utils/filter";
import { Link } from "react-router-dom";

function Pokedex(props) {
    const [list, setList] = useState([]);
    const [limit, setLimit] = useState();
    const [searchName, setSearchName] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchWeakness, setSearchWeakness] = useState("");

    function getPokemon() {
        fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            console.log(result)
            setList(result.pokemon);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        getPokemon();
    }, []);

    let displayList = filterPokemon(list, searchName, searchType, searchWeakness, limit);

    return (
        <div>
            <label htmlFor="searchName">Search Pokemon By Name</label>
            <input type="text" value={searchName} onChange={(e) => {setSearchName(e.target.value)}} />
            <label htmlFor="searchType">Search Pokemon By Type</label>
            <input type="text" value={searchType} onChange={(e) => {setSearchName(e.target.value)}} />
            <label htmlFor="searchWeakness">Search Pokemon By Weakness</label>
            <input type="text" value={searchWeakness} onChange={(e) => {setSearchName(e.target.value)}} />
            {displayList.map((pokemon) => {
                return (
                    <li>
                        {pokemon.name}
                    </li>
                )
            })}
            {displayList.map((pokemon) => {
                return (
                    <li>
                        {pokemon.type}
                    </li>
                )
            })}
            {displayList.map((pokemon) => {
                return (
                    <li>
                        {pokemon.weaknesses}
                    </li>
                )
            })}
        </div>
    )
}

export default Pokedex;