import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class CompaniesFollow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/stockmarket/companies/follow', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            this.setState({data: response.data});
        });
    }


    handleDeleteButtonClick = (item) => {
        axios.delete(`http://localhost:8000/stockmarket/companies/follow/${item.id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({data: this.state.data.filter(dataItem => dataItem.id !== item.id), message: response.message});
            }
        })
    }


    render() {
        return (
            <div>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Company</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><a href={`/company/single?symbol=${item.symbol}`}>{item.company}</a></td>
                                <td>{item.symbol}</td>
                                <td><button className="btn btn-danger" onClick={() => this.handleDeleteButtonClick(item)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default withRouter(CompaniesFollow);