from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Symbols(models.Model):
    company = models.CharField(max_length=70)
    symbol = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Symbols'



class CompaniesFollow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symbol = models.ForeignKey(Symbols, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Companies Follow'


