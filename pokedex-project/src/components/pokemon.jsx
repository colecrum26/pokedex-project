import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pokedex(props) {
    const [list, setList] = useState([]);
    const [searchPokemon, setSearchPokemon] = useState("");

    function getPokemon() {
        fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            setList(result);
        })
        .catch((err) => {
            console.error(err);
        });
    }
}