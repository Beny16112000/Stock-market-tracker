from django.contrib import admin
from .models import Symbols, CompaniesFollow


# Register your models here.


class SymbolsAdmin(admin.ModelAdmin):
    list_display = ('company','symbol')
admin.site.register(Symbols, SymbolsAdmin)


class CompaniesFollowAdmin(admin.ModelAdmin):
    list_display = ('user','symbol')
admin.site.register(CompaniesFollow, CompaniesFollowAdmin)


