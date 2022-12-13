import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [endereco, setEndereco] = useState({});

  function handleEndereco(event) {
    const cep = event.target.value;

    setEndereco({
      cep
    });

    if (cep && cep.length === 8) {
      // obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json()) // converte o dados para o formato json
        .then((data) => {
          setEndereco((prevEndereco) => {
            return {...prevEndereco,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          }});
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder="Digite o CEP" onChange={handleEndereco} />
        <ul style={{"list-style": "none" }}>
          <li>CEP: {endereco.cep}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
