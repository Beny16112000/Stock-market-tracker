import requests
from .config import API_KEY


# Alpha Vantage API 


class TradingData:

    def __init__(self, symbol):
        self.symbol = symbol


    def daily(self):
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={self.symbol}&apikey={API_KEY}'
        r = requests.get(url)
        return r.json()


    def weekly(self):
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol={self.symbol}&apikey={API_KEY}'
        r = requests.get(url)
        return r.json()       


    def monthly(self):
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol={self.symbol}&apikey={API_KEY}'
        r = requests.get(url)
        return r.json()


    def company_overview(self):
        url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={self.symbol}&apikey={API_KEY}'
        r = requests.get(url)
        return r.json()


