from django.test import TestCase
from django.contrib.auth import get_user_model
from unittest.mock import patch

from core import models

from datetime import date

def sample_user(email='test@example.com', password='testpassword123'):
	# CREACION DE USUARIO RAPIDA
	return get_user_model().objects.create_user(email, password)

class ModelTest(TestCase):

	def test_create_user_with_email_successful(self):
		# Probar crear un usuario con un email correctamente
		email = 'test@email.com'
		password = 'Testpass123'
		user = get_user_model().objects.create_user(
			email=email, 
			password=password
		)

		self.assertEqual(user.email, email)
		self.assertTrue(user.check_password(password))

	def test_new_user_email_normalized(self):
		# Testear un email de un nuevo usuario
		email = 'test@EMAIL.com'
		user = get_user_model().objects.create_user(
			email, 
			'Testpass123'
		)

		self.assertEqual(user.email, email.lower())

	def test_new_user_invalid_email(self):
		# Testear un email invalido de un nuevo usuario
		with self.assertRaises(ValueError):
			get_user_model().objects.create_user(None, 'Testpass123')

	def test_new_user_invalid_password(self):
		# Testear un email invalido de un nuevo usuario
		with self.assertRaises(ValueError):
			get_user_model().objects.create_user('test@email.com', None)

	def test_create_new_superuser(self):
		# Probar un nuevo superusuario
		email = 'test@email.com'
		password = 'Testpass123'
		user = get_user_model().objects.create_superuser(
			email=email, 
			password=password
		)

		self.assertTrue(user.is_superuser)
		self.assertTrue(user.is_staff)

 
	def test_category_str(self):
		# REPRESENTACION DE UNA CATEGORIA
		category = models.Category.objects.create(
			user=sample_user(),
			name='Sport'
		)

		self.assertEqual(str(category), category.name)

	def test_task_str(self):
		# REPRESENTACION DE UNA TAREA
		state = models.State.objects.create(
			name='Complete',
		)

		task = models.Task.objects.create(
			user=sample_user(),
			title='Task example',
			date_end = '2022-12-12',
			state = state
		)
		self.assertEqual(str(task), task.title)

	'''
	@patch('uuid.uuid4')
	def test_category_file_name_uuid(self, mock_uuid):
		uuid = 'test-uuid'
		mock_uuid.return_value = uuid
		file_path = models.category_image_file_path(None, 'testImage.jpg')

		exp_path = f'uploads/category/{uuid}.jpg'
		self.assertEqual(file_path, exp_path)
	'''