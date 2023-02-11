import React from "react";
import { withRouter } from "react-router-dom";


class Navbar extends React.Component {
    state = {
        isAuthenticated: false
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ isAuthenticated: true });
        }
    }


    handleNavigation = (path) => {
        this.props.history.push(path);
    };

    render() {
        return (
            <nav>
            <ul>
                {this.state.isAuthenticated ? (
                <li>
                    <li><a href="/company/follow" >Companies Follow</a></li>
                    <li><a href="/company/all" >Companies All</a></li>
                    <li><a href="/auth/logout" >Logout</a></li>
                </li>
                ) : (
                <li>
                    <li><a href="/auth/register" >Register</a></li>
                    <li><a href="/auth/login">Login</a></li>
                </li>
                )}
            </ul>
            </nav>
        );
        }
}


export default withRouter(Navbar);