import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



class CompaniesAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchTerm: ''
        };
    }


    componentDidMount() {
        axios.get('http://localhost:8000/stockmarket/symbols', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            this.setState({data: response.data});
        });
    }


    handleAddButtonClick = (item) => {
        axios.post('http://localhost:8000/stockmarket/symbols', {
            id: item.id
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.status === 201) {
                this.setState({data: this.state.data.filter(dataItem => dataItem.id !== item.id), message: response.message});
            }
        }).catch(error => {
            this.setState({message: error.message})
        });
    }


    handleSearchTermChange = (event) => {
        this.setState({searchTerm: event.target.value});
    }


    render() {
        const filteredData = this.state.data.filter(item => {
            return item.company.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || item.symbol.toLowerCase().includes(this.state.searchTerm.toLowerCase());
        })
        return (
            <div>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <input type="text" placeholder="Search by company or symbol" value={this.state.searchTerm} onChange={this.handleSearchTermChange} />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Comoany</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.company}</td>
                                <td>{item.symbol}</td>
                                <td><button className="btn btn-primary" onClick={() => this.handleAddButtonClick(item)}>Add</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default withRouter(CompaniesAll);