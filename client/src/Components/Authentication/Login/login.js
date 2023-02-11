import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';



class LoginForm extends React.Component {
    state = {
      username: '',
      password: ''
    };

    componentDidMount () {
      
    }
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/auth/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.props.history.push('/');
      })
      .catch(error => {
        console.error(error);
      });
    };
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
        </form>
      );
    }
  }
  
  export default withRouter(LoginForm);