import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';


class RegisterForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        email: '',
        password: ''
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/auth/register', {
            username: this.state.username,
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            if (res.status === 201) {
                this.props.history.push('/login');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.handleInputChange} />
          </div>
          <div>
          <label>First Name:</label>
          <input type="text" name="fname" onChange={this.handleInputChange} />
        </div>
        <div>
        <label>Last Name:</label>
        <input type="text" name="lname" onChange={this.handleInputChange} />
      </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={this.handleInputChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.handleInputChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    }
  }
  
  export default withRouter(RegisterForm);

