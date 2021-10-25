import './App.css';
import React from 'react';

class Repositorios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaRepositorios: [],
      id: 0,
      username: "",
      name: '',
      about: '',
      dataCriacao: 0,
      size: 0
    }
  }
  buscarRepositorios = (event) => {

    event.preventDefault();

    fetch('https://api.github.com/users/' + this.state.username + '/repos')

      .then(resposta => resposta.json())

      .then(dadosRepo => this.setState({ listaRepositorios: dadosRepo }))

      .catch(erro => console.log(erro))
  }

  updateUsername = async (event) => {

    await this.setState({

      username: event.target.value
    });
    console.log(this.state.username);
  }

  componentDidMount() {

  }


  render() {

    return (
      <div>
        <h1>Repositórios</h1>
        <form onSubmit={this.buscarRepositorios}>
          <div>
          <input
            type="text"
            placeholder="Nome de Usuário"
            onChange={this.updateUsername}
          />
          {
            <button type="submit" disabled={this.state.username === '' ? 'none' : ''}>
              Pesquisar
            </button>
          }
          </div>
        </form>
        <section>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome Repositório</th>
                <th>About</th>
                <th>Data Criação</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.listaRepositorios.filter((item, index) => index < 10).map(repos => {

                  return (
                    <tr key={repos.id}>
                      <td>{repos.id}</td>
                      <td>{repos.name}</td>
                      <td>{repos.description}</td>
                      <td>{repos.created_at}</td>
                      <td>{repos.size}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </section>
      </div>
    )
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Repositorios />
      </header>
    </div>
  );
}

export default App;
