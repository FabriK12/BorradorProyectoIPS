from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse

class AdminSiteTests(TestCase):
	def setUp(self):
		self.client = Client()
		self.admin_user = get_user_model().objects.create_superuser(
			email = 'testadmin@email.com',
			password = 'testpassword123'
		)

		self.client.force_login(self.admin_user)
		self.user = get_user_model().objects.create_user(
			email = 'test@email.com',
			password = 'testpassword123'
		)

	def test_users_listed(self):
		# Verificar que los usuarios estan listados en el admin site
		url = reverse('admin:core_user_changelist')
		res = self.client.get(url)

		self.assertContains(res, self.user.name)
		self.assertContains(res, self.user.email)


	def test_user_change_page(self):
		# Prueba la pagina editada por el usuario
		url = reverse('admin:core_user_change', args=[self.user.id])
		# /admin/core/user/<pk>
		res = self.client.get(url)

		self.assertEquals(res.status_code, 200)

	def test_create_user_page(self):
		# Test que checa si funciona la pagina
		url = reverse('admin:core_user_add')
		res = self.client.get(url)

		self.assertEqual(res.status_code, 200)