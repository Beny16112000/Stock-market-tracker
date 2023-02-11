from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets, authentication, permissions
from rest_framework.parsers import JSONParser
from authentication.auth import UserHandle
from rest_framework.decorators import action
from django.http import JsonResponse
from Alpha_VantageApi.symbols import SymbolsClass
from .serializer import SymbolAllSerializer
from Alpha_VantageApi.api import TradingData


# Create your views here.


"""
Super User - beny, 1234
"""


class UserClass(viewsets.ModelViewSet):

    def create(self, request):
        data = JSONParser().parse(request)
        user = UserHandle().register(data['username'],data['fname']
                                    ,data['lname'],data['email'],data['password'])
        if user is True:    
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['post'])
    def sign_in(self, request):
        data = JSONParser().parse(request)
        user = UserHandle().login(data['username'], data['password'])
        if user is not False:
            return JsonResponse({
                'token': user
                } ,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['post'])
    def logout(self, request): 
        token = request.headers['Authorization'][6:]
        user = UserHandle().logout(token)
        if user is True:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SymbolAll(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        symbols = SymbolsClass().all(request.user)
        serializer = SymbolAllSerializer(symbols, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def create(self, request):
        data = JSONParser().parse(request)
        add = SymbolsClass().add(request.user, data['id'])
        if add is True:
            return JsonResponse({
                'message': 'Company Added'
                }, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({
                'message': add
                }, status=status.HTTP_404_NOT_FOUND)



class FollowCompanies(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        companies = SymbolsClass().followCompanies(request.user)
        serializer = SymbolAllSerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def destroy(self, request, id):
        companies = SymbolsClass().delete(request.user, id)
        if companies is True:
            return Response(status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                'massage': companies
            }, status=status.HTTP_404_NOT_FOUND)



class CompanyDetail(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        symbol = request.GET['symbol']
        check = SymbolsClass().check(symbol)
        if check is not None:
            company_overview = TradingData(symbol).company_overview()
            return Response(company_overview, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



class TrandingDataAll(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        symbol = request.GET['symbol']
        check = SymbolsClass().check(symbol)
        if check is not None:
            daily_tranding = TradingData(symbol).daily()
            return Response(daily_tranding, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def weekly(self, request):
        symbol = request.GET['symbol']
        check = SymbolsClass().check(symbol)
        if check is not None:
            weekly_tranding = TradingData(symbol).weekly()
            return Response(weekly_tranding, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def monthly(self, request):
        symbol = request.GET['symbol']
        check = SymbolsClass().check(symbol)
        if check is not None:
            monthly_tranding = TradingData(symbol).monthly()
            return Response(monthly_tranding, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


        
        