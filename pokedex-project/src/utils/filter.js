import { useState, useEffect } from 'react'

export function useTypesAndWeaknesses(list) {
    const [values, setValues] = useState({});

    useEffect(() => {
        let result = list.reduce((acc, pokemon) => {
            acc.types = acc.types.concat(pokemon.type)
            acc.weaknesses = acc.weaknesses.concat(pokemon.weaknesses)
            return acc;
        }, {types: [], weaknesses: []})
        setValues({
            types: ["", ...new Set(result.types)],
            weaknesses: ["", ...new Set(result.weaknesses)]
        })
    }, [list])
    return values;
}

function compareMatch(refName, searchName) {
    let score = 0;
    let tempRefName = refName.toLowerCase()
    for (let char of searchName) {
        if (tempRefName.toLowerCase().includes(char)) {
            score += tempRefName.indexOf(char) === searchName.indexOf(char) ? 1 : 0.5;
            tempRefName = tempRefName.replace(char, " ");
        }
    }
    return score;
}

export function filterPokemon(list, searchName, searchType, searchWeakness, limit) {
    let filteredList = list.filter((pokemon) => {
        let compareScore = compareMatch(pokemon.name, searchName)
        if ((compareScore > 0 || searchName === "" ) && 
        (pokemon.type.includes(searchType) || searchType === "") && 
        (pokemon.weaknesses.includes(searchWeakness) || searchWeakness === "")){
            pokemon.match = compareScore;
            return true;
        } else { 
            return false;
        }
    })
    filteredList.sort((a, b) => {
        if (a.match === b.match) {
            return a.name.length > b.name.length ? 1 : -1;
        } else {
            return b.match - a.match;
        }
    })
    return filteredList.slice(0, limit)
}