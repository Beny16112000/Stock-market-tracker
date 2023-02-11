from django.urls import path
from . import views


# Server Url's


urlpatterns = [
    path('auth/register',views.UserClass.as_view({'post': 'create'})),
    path('auth/login',views.UserClass.as_view({'post': 'sign_in'})),
    path('auth/logout',views.UserClass.as_view({'post': 'logout'})),
    path('stockmarket/symbols',views.SymbolAll.as_view({'get': 'list', 'post': 'create'})),
    path('stockmarket/companies/follow',views.FollowCompanies.as_view({'get': 'list'})),
    path('stockmarket/companies/follow/<int:id>', views.FollowCompanies.as_view({'delete': 'destroy'})),
    path('stockmarket/companies/companyOverview',views.CompanyDetail.as_view({'get': 'list'})),
    path('stockmarket/companies/daily',views.TrandingDataAll.as_view({'get': 'list'})),
    path('stockmarket/companies/weekly',views.TrandingDataAll.as_view({'get': 'weekly'})),
    path('stockmarket/companies/monthly',views.TrandingDataAll.as_view({'get': 'monthly'})),
]