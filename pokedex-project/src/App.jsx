import './App.css';
import pokemonLogo from './images/pokemon-logo.png';
import Pokedex from "./components/pokedex";

function App() {
  return (
    <div>
      <img src={pokemonLogo} id="pokemonLogo" alt="pokemon logo" />
    <h1 id='header'>Pokedex</h1>
    < Pokedex />
    </div>
  );
}

export default App;
