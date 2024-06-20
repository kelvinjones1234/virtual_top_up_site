from django.contrib import admin
from .models import Transaction

class TransactionAdmin(admin.ModelAdmin):
    model = Transaction
    list_display = ('wallet', 'transaction_type', 'product', 'price', 'id', 'status', 'date_create')

admin.site.register(Transaction, TransactionAdmin)