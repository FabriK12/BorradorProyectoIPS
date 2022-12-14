from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Category

from task.serializers import CategorySerializer

CATEGORY_URL = reverse('task:category-list')

class PublicCategoryApiTest(TestCase):
	# PROBAR LOS API de CATEGORY disponibles publicamente
	def setUp(self):
		self.client = APIClient()

	def test_login_required(self):
		# Probar que se este logueado
		res = self.client.get(CATEGORY_URL)

		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateCategoryApiTest(TestCase):
	# API de categorias disponibles privados
	def setUp(self):
		self.user = get_user_model().objects.create_user(
			'test@email.com',
			'testpassword123'
		)
		self.client = APIClient()
		self.client.force_authenticate(self.user)

	def test_retrieve_categories(self):
		# Obtener categorias
		Category.objects.create(user=self.user, name='Sports')
		Category.objects.create(user=self.user, name='Home')

		res = self.client.get(CATEGORY_URL)

		categories = Category.objects.all().order_by('name')
		serializer = CategorySerializer(categories, many=True)
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

	def test_categories_limited_to_user(self):
		# Categorias que sean del usuario
		user2 = get_user_model().objects.create_user(
			'otro@example.com',
			'testpassword123'
		)
		Category.objects.create(user=user2, name='University')
		category = Category.objects.create(user=self.user, name='Sports')

		res = self.client.get(CATEGORY_URL)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data), 1)
		self.assertEqual(res.data[0]['name'], category.name)

	def test_create_category_successfully(self):
		# CREACION DE UNA NUEVA CATEGORIA
		payload ={
			'name': 'University'
		}

		self.client.post(CATEGORY_URL, payload)

		exists = Category.objects.filter(
			user=self.user,
			name=payload['name']
		).exists()

		self.assertTrue(exists)

	def test_create_category_invalid(self):
		# CREACION DE UNA CATEGORIA INVALIDA
		payload ={
			'name': ''
		}
		res = self.client.post(CATEGORY_URL)

		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)