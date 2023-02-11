from rest_framework import serializers
from .models import Symbols


# Serializer Classe's


class SymbolAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symbols
        fields = [
            'id',
            'company',
            'symbol'
        ]



