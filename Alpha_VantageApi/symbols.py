from server.models import Symbols, CompaniesFollow


class SymbolsClass:

    def all(self, user):
        symbols = CompaniesFollow.objects.filter(user=user)
        return Symbols.objects.exclude(id__in=symbols.values_list('symbol', flat=True))


    def add(slef, user, id):
        try:
            symbol = Symbols.objects.get(id=id)

            exist = CompaniesFollow.objects.filter(user=user, symbol=symbol)
            if not exist:
                follow = CompaniesFollow.objects.create(user=user,symbol=symbol)
                follow.save()
                return True
            else:
                return 'Already Exist in Your follow list'

        except (TypeError, ValueError, OverflowError, Symbols.DoesNotExist):
            return 'Error to add'

    
    def followCompanies(self, user):
        symbols = CompaniesFollow.objects.filter(user=user)
        return Symbols.objects.filter(id__in=symbols.values_list('symbol', flat=True))


    def delete(self, user, id):
        error = 'Error To delete'
        try:
            symbol = Symbols.objects.get(id=id)
            companies = CompaniesFollow.objects.filter(user=user, symbol=symbol)

            if not companies:
                return error
            else:
                companies.delete()
                return True
        except (TypeError, ValueError, OverflowError, Symbols.DoesNotExist):
            return error


    def check(self, symbol):
        try:
            Symbols.objects.get(symbol=symbol)
            return True
        except (TypeError, ValueError, Symbols.DoesNotExist):
            return None
