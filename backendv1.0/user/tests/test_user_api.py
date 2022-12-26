from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
UPDATE_URL = reverse('user:update')

def create_user(**params):
	return get_user_model().objects.create_user(**params)

class PublicUserApiTests(TestCase):
	# Test de una API publica para crear Usuario

	def setUp(self):
		self.client = APIClient()

	def test_create_valid_user_success(self):
		#Probando un usuario ingresado de manera correcta
		payload = {
			'email': 'test@email.com',
			'password': 'testpassword123',
			'name': 'Testname'
		}

		res = self.client.post(CREATE_USER_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_201_CREATED)
		user = get_user_model().objects.get(**res.data)
		self.assertTrue(user.check_password(payload['password']))
		self.assertNotIn('password', res.data)

	def test_user_exists(self):
		# Usuario que existe (test)
		payload = {
			'email': 'test@email.com',
			'password': 'testpassword123',
		}
		# CREAR UN USUARIO ANTES
		create_user(**payload)

		# MISMO USUARIO QUE EL ANTERIOR
		res = self.client.post(CREATE_USER_URL, payload)

		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
	
	def test_password_isShort(self):
		#Contrasenia es muy corta
		payload = {
			'email': 'test@email.com',
			'password': 'tes',	
			'name': 'Testname'
		}

		res = self.client.post(CREATE_USER_URL, payload)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

		user_exists = get_user_model().objects.filter(
			email=payload['email']
		).exists()
		self.assertFalse(user_exists)
	
	#TOKENS
	def test_create_token_for_user(self):
		# PROBANDO LA CREACION DE UN TOKEN
		payload = {
			'email': 'test@email.com',
			'password': 'tes',	
			'name': 'Testname'
		}
		# CREAR UN USUARIO ANTES
		create_user(**payload)
		res = self.client.post(TOKEN_URL, payload)

		self.assertIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_200_OK)

	def test_create_token_invalid_credentials(self):
		# TOKEN NO SE CREA CON CREDENCIALES INVALIDAS

		# CREAR UN USUARIO ANTES
		create_user(email='test@email.com', password='testpassword123')
		payload = {
			'email': 'test@email.com',
			'password': 'error',	
			'name': 'Testname'
		}
		res = self.client.post(TOKEN_URL, payload)

		self.assertNotIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

	def test_create_token_no_user_exists(self):
		# TOKEN NO SE CREA CON UN USUARIO NO EXISTENTE
		payload = {
			'email': 'test@email.com',
			'password': 'error',	
			'name': 'Testname'
		}

		res = self.client.post(TOKEN_URL, payload)

		self.assertNotIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

	def test_create_token_missing_field(self):
		# Verificar contrasenia para obtener un TOKEN

		res = self.client.post(TOKEN_URL, {'email': 'test', 'password': ''})

		self.assertNotIn('token', res.data)
		self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

	# ACTUALIZAR USUARIO
	def test_retrieve_user_unauthorized(self):
		# AUTENTICACION REQUERIDA

		res = self.client.get(UPDATE_URL)
		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateUserApiTests(TestCase):

	def setUp(self):
		self.user = create_user(
			email='user@example.com',
			password='testpassword123',
			name = 'testuser'
		)
		self.client = APIClient()
		self.client.force_authenticate(user=self.user)

	def test_retrieve_profile_success(self):
		# Obtener datos perfil estando autorizado
		res = self.client.get(UPDATE_URL)
		self.assertEqual(res.status_code, status.HTTP_200_OK)

		self.assertEqual(res.data, {
			'name': self.user.name,
			'email': self.user.email
		})

	def test_post_me_not_permissions(self):
		# NO PERMITIR METODO POST
		res = self.client.post(UPDATE_URL, {})
		self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

	def test_update_user_profile(self):
		# SE ESTA ACTULIZANDO UN USUARIO
		payload = {
			'name': 'new testname',
			'password': 'newpassword123',
		}

		res = self.client.patch(UPDATE_URL, payload)

		self.user.refresh_from_db()
		self.assertEqual(self.user.name, payload['name'])
		self.assertTrue(self.user.check_password(payload['password']))
		self.assertEqual(res.status_code, status.HTTP_200_OK)






