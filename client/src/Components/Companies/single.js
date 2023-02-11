import React from "react";
import axios from "axios";
import Plot from 'react-plotly.js';
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class StockGraph extends React.Component {
    state = {
        data: {},
        selectedData: 'daily',
        overviewData: {}
    };

    componentDidMount() {
        this.getCompanyOverviewData();
        this.getTimeSeriesData();
    }

    componentDidUpdate(prevProps, preevState) {
        if (prevProps.location.search !== this.props.location.search) {
          this.getCompanyOverviewData();
        }

        if (preevState.selectedData !== this.state.selectedData) {
          this.getTimeSeriesData();
        }
    }

    getCompanyOverviewData = () => {
      const symbol = this.props.location.search.split('=')[1];
      axios.get(`http://localhost:8000/stockmarket/companies/companyOverview?symbol=${symbol}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => this.setState({ overviewData: res.data}))
        .catch(err => console.error(err));
    };

    getTimeSeriesData = () => {
      const symbol = this.props.location.search.split('=')[1];
      axios.get(`http://localhost:8000/stockmarket/companies/${this.state.selectedData}?symbol=${symbol}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => this.setState({ data: res.data}))
        .catch(err => console.error(err));
    };

    handleButtonClick = (selectedData) => {
      this.setState({ selectedData });
    };

    render () {
      const timeSeriasData = (() => {
        switch (this.state.selectedData) {
          case 'daily':
            return Object.entries(this.state.data["Time Series (Daily)"] || {})
              .map(([date, dailyData]) => ({ date, ...dailyData }))
              .reverse();
          case 'weekly':
            return Object.entries(this.state.data["Weekly Adjusted Time Series"] || {})
              .map(([date, weeklyData]) => ({ date, ...weeklyData }))
              .reverse();
          case 'monthly':
            return Object.entries(this.state.data["Monthly Adjusted Time Series"] || {})
              .map(([date, monthlyData]) => ({ date, ...monthlyData }))
              .reverse();
          default:
            return [];
        }
      })();

      const x = timeSeriasData.map(data => data.date);
      const y = timeSeriasData.map(data => Number(data['4. close']));


      return (
        <div >
        <h2>{this.state.overviewData.Name} ({this.state.overviewData.Symbol})</h2>
        <h4>Exchange: {this.state.overviewData.Exchange}</h4>
        <h4>Currency: {this.state.overviewData.Currency}</h4>
        <p>{this.state.overviewData.Description}</p>

        <h3>Time Series ({this.state.selectedData})</h3>
        <Plot
          data={[{
            x,
            y,
            type: 'line',
          }]}
          layout={{
            title: `${this.state.overviewData.Name} (${this.state.overviewData.Symbol})`,
            xaxis: {
              title: 'Date',
            },
            yaxis: {
              title: 'Closing Price',
            },
          }}
        />
        <div>
          <button onClick={() => this.handleButtonClick('daily')}>Daily</button>
          <button onClick={() => this.handleButtonClick('weekly')}>Weekly</button>
          <button onClick={() => this.handleButtonClick('monthly')}>Monthly</button>
        </div>
        </div>
      );
    }
}


export default withRouter(StockGraph);








/* 

{"Meta Data":{"1. Information":"Daily Time Series with Splits and Dividend Events","2. Symbol":"AAPL","3. Last Refreshed":"2023-02-10","4. Output Size":"Compact","5. Time Zone":"US/Eastern"},"Time Series (Daily)":{"2023-02-10":{"1. open":"149.46","2. high":"151.3401","3. low":"149.22","4. close":"151.01","5. adjusted close":"151.01","6. volume":"57450708","7. dividend amount":"0.2300","8. split coefficient":"1.0"}}}
{"Meta Data":{"1. Information":"Weekly Adjusted Prices and Volumes","2. Symbol":"AAPL","3. Last Refreshed":"2023-02-10","4. Time Zone":"US/Eastern"},"Weekly Adjusted Time Series":{"2023-02-10":{"1. open":"152.5750","2. high":"155.2300","3. low":"149.2200","4. close":"151.0100","5. adjusted close":"151.0100","6. volume":"330758787","7. dividend amount":"0.2300"},"2023-02-03":{"1. open":"144.9550","2. high":"157.3800","3. low":"141.3200","4. close":"154.5000","5. adjusted close":"154.2650","6. volume":"480249683","7. dividend amount":"0.0000"}}}
{"Meta Data":{"1. Information":"Monthly Adjusted Prices and Volumes","2. Symbol":"AAPL","3. Last Refreshed":"2023-02-10","4. Time Zone":"US/Eastern"},"Monthly Adjusted Time Series":{"2023-02-10":{"1. open":"143.9700","2. high":"157.3800","3. low":"141.3200","4. close":"151.0100","5. adjusted close":"151.0100","6. volume":"681118737","7. dividend amount":"0.2300"},"2023-01-31":{"1. open":"130.2800","2. high":"147.2300","3. low":"124.1700","4. close":"144.2900","5. adjusted close":"144.0706","6. volume":"1443652725","7. dividend amount":"0.0000"}}}
import React from "react";
import axios from "axios";
import Plot from 'react-plotly.js';
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class StockGraph extends React.Component {
    state = {
        data: {},
        selectedData: 'daily',
        overviewData: {}
    };

    componentDidMount() {
        this.getCompanyOverviewData();
        this.getTimeSeriesData();
    }

    componentDidUpdate(prevProps, preevState) {
        if (prevProps.location.search !== this.props.location.search) {
          this.getCompanyOverviewData();
        }

        if (preevState.selectedData !== this.state.selectedData) {
          this.getTimeSeriesData();
        }
    }

    getCompanyOverviewData = () => {
      const symbol = this.props.location.search.split('=')[1];
      axios.get(`http://localhost:8000/stockmarket/companies/companyOverview?symbol=${symbol}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => this.setState({ overviewData: res.data}))
        .catch(err => console.error(err));
    };

    getTimeSeriesData = () => {
      const symbol = this.props.location.search.split('=')[1];
      axios.get(`http://localhost:8000/stockmarket/companies/${this.state.selectedData}?symbol=${symbol}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => this.setState({ data: res.data}))
        .catch(err => console.error(err));
    };

    handleButtonClick = (selectedData) => {
      this.setState({ selectedData });
    };

    render () {
      const timeSeriasData = Object.entries(this.state.data["Time Series (Daily)"] || {})
      .map(([date, dailyData]) => ({ date, ...dailyData }))
      .reverse();

      const x = timeSeriasData.map(data => data.date);
      const y = timeSeriasData.map(data => Number(data['4. close']));


      return (
        <div >
        <h2>{this.state.overviewData.Name} ({this.state.overviewData.Symbol})</h2>
        <p>{this.state.overviewData.Description}</p>

        <h3>Time Series ({this.state.selectedData})</h3>
        <Plot 
          data={[{
            x,
            y,
            type: 'line',
          }]}
          layout={{
            title: `${this.state.overviewData.Name} (${this.state.overviewData.Symbol})`,
            xaxis: {
              title: 'Date',
            },
            yaxis: {
              title: 'Closing Price',
            },
          }}
        />
        <div>
          <button onClick={() => this.handleButtonClick('daily')}>Daily</button>
          <button onClick={() => this.handleButtonClick('weekly')}>Weekly</button>
          <button onClick={() => this.handleButtonClick('monthly')}>Monthly</button>
        </div>
        </div>
      );
    }
}


export default withRouter(StockGraph);
*/