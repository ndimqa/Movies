from django.contrib import admin
from api.models import *
from django.contrib.auth.admin import UserAdmin


admin.site.register(User)
# admin.site.register(UserAdmin)
admin.site.register(Genre)
admin.site.register(Movie)
# admin.site.register(User)
admin.site.register(Comment)
