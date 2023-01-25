import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


interface State {
  users: User[];
  regUser: string;
  regPass: string;
  regPass2: string;
}

interface User {
  id: number;
  username: string;
}

interface UserListResponse {
  users: User[];
}


class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      regUser: '',
      regPass: '',
      regPass2: '',
      users: [],
    }
  }

  async loadUsers() {
    let response = await fetch('http://localhost:3000/api/users');
    let data = await response.json() as UserListResponse;
    this.setState({
      users: data.users,
    })
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleRegister = async () => {
    const { regUser, regPass, regPass2 } = this.state;
    if (regUser.trim() === '' || regPass !== regPass2) {
      // this.setState() -tel hibaüzenet megjelenítése
      return;
    }

    const adat = {
      username: regUser,
      password: regPass,
    };

    let response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      regUser: '',
      regPass: '',
      regPass2: '',
    })

    await this.loadUsers();
  };

  render() {
    const { regUser, regPass, regPass2 } = this.state;

    return <div>
      <h2>Új user</h2>
      User: <input type='text' value={regUser} onChange={e => this.setState({ regUser: e.currentTarget.value })} /><br/>
      Jelszó: <input type='password' value={regPass} onChange={e => this.setState({ regPass: e.currentTarget.value })} /><br />
      Jelszó ismét: <input type='password' value={regPass2} onChange={e => this.setState({ regPass2: e.currentTarget.value })} /><br />
      <button onClick={this.handleRegister}>Regisztráció</button>
      <h2>Userek listája</h2>
      <ul>
        {
          this.state.users.map(user => <li>{user.username}</li>)
        }
      </ul>
    </div>;
  }
}


export default App;
