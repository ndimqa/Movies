from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models
from django.contrib.auth.models import User, PermissionsMixin
import jwt


class Genre(models.Model):
    name = models.CharField(max_length=300)

    class Meta:
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'

    def __str__(self):
        return f'{self.id}, {self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Movie(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField(default='')
    rate = models.CharField(max_length=300)
    length = models.CharField(max_length=300)
    img = models.CharField(max_length=300)
    cover = models.CharField(max_length=300)
    like = models.IntegerField(default=0)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    # comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Movie'
        verbose_name_plural = 'Movies'

    def __str__(self):
        return f'{self.id}, {self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'rate': self.rate,
            'length': self.length,
            'img': self.img,
            'cover': self.cover,
            'like': self.like,
            'genre': {
                'id': self.genre.id,
                'name': self.genre.name
            },
            # 'comment': {
            #     'id': self.comment.id,
            #     'name': self.comment.user.username,
            #     'description': self.comment.description
            # }
        }


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError("Enter username")
        if email is None:
            raise TypeError('Enter email')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError("Enter password")
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=1)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token



class Comment(models.Model):
    username = models.CharField(max_length=300)
    description = models.TextField(default='')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'

    def __str__(self):
        return f'{self.id}, {self.username}'

    def to_json(self):
        return {
            'id': self.id,
            # 'username': self.username,
            'description': self.description,
            'username': {
                'id': self.user.id,
                'name': self.user.name
            },
            'movie': {
                'id': self.movie.id,
                'name': self.movie.name
            }
        }
