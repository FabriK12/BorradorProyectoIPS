from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid
import os

from django.conf import settings

def category_image_file_path(instance, filename):
	# Generar path para las imagenes
	ext = filename.split('.')[-1]
	filename = f'{uuid.uuid4()}.{ext}'

	return os.path.join('uploads/category/',filename)

# Create your models here.

class UserManager(BaseUserManager):

	def create_user(self, email, password, **extra_fields):
		# Crear y guardar un nuevo usuario
		if not email or not password:
			raise ValueError('Users mst have an email')

		user = self.model(email=self.normalize_email(email), **extra_fields)
		user.set_password(password)
		user.save(using=self._db)

		return user

	def create_superuser(self, email, password, **extra_fields):
		# Crear y guardar un nuevo superusuario
		user = self.create_user(email, password)
		user.is_staff = True
		user.is_superuser = True

		user.save(using=self._db)

		return user

class User(AbstractBaseUser, PermissionsMixin):
	# MOdelo personalizado de Usuario
	# Se hace Login con Email
	email = models.EmailField(max_length=255, unique=True)
	name = models.CharField(max_length=255)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'email'

class Category(models.Model):
	# ES COMO UN TAG PARA LA TAREA
	name = models.CharField(max_length=125)
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE
	)

	def __str__(self):
		return self.name

class State(models.Model):
	name = models.CharField(max_length=50)

	def __str__(self):
		return self.name

class Task(models.Model):
	# TAREA PARA USARSE EN CATEGORIAS
	title = models.CharField(max_length=125)
	desc = models.CharField(max_length=255, blank=True, null=True)
	date_init = models.DateField(blank=True, null=True)
	date_end = models.DateField()
	state = models.ForeignKey(State, on_delete=models.CASCADE)
	category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE
	)

	def __str__(self):
		return self.title
'''
class Categoriy(models.Model):
	# CATEGORIA OBJETO
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE
	)
	title = models.CharField(max_length=50)
	thumbnail = models.CharField(max_length=255, blank=True)
	image = models.ImageField(null = True, upload_to=category_image_file_path)

	tasks = models.ManyToManyField('Task')

	def __str__(self):
		return self.title
'''
