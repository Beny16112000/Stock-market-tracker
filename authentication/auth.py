from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


# User Check


class UserHandle:
    exist = True
    not_exist = False

    def user_exits(self, username, email):
        try:
            User.objects.get(username=username)
            return self.exist
        except ObjectDoesNotExist:
            return self.not_exist


    def register(self, username, fname, lname, email, password):
        if self.user_exits(username, email) is self.not_exist:
            user = User.objects.create_user(username, email, password)
            user.first_name = fname
            user.last_name = lname
            user.is_active = True
            user.save()
            return self.exist
        else:
            self.not_exist

    
    def login(self, username, password):
        user = authenticate(username=username, password=password)

        if user is not None:

            getUser = User.objects.get(username=username)
            try:
                token = Token.objects.get(user=getUser)
                return token.key
            except ObjectDoesNotExist:
                token = Token.objects.create(user=getUser)
                token.save()
                return token.key
        else:
            return self.not_exist


    def logout(self, token):
        Token.objects.filter(key=token).delete()
        return self.exist
    
