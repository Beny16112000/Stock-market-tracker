import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class LogoutPage extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:8000/auth/logout', {}, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem('token');
          this.props.history.push('/auth/login');
        }
      });
    } else {
      this.props.history.push('/auth/login');
    }
  }

  render() {
    return null;
  }
}

export default withRouter(LogoutPage);