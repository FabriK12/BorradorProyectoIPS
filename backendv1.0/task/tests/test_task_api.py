from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Category, State, Task

from task.serializers import TaskSerializer

TASK_URL = reverse('task:task-list')

def sample_task(user, **params):
	# CREAR CON UN USUARIO
	state = State.objects.create(
		name='Complete',
	)

	defaults = {
		'title': 'Task example',
		'date_end': '2022-12-12',
		'state': state,
	}

	defaults.update(params)

	return Task.objects.create(user=user, **defaults)

class PublicTaskApiTest(TestCase):
	# PROBAR LOS API de TAREA disponibles publicamente
	def setUp(self):
		self.client = APIClient()

	def test_login_required(self):
		# Probar que se este logueado
		res = self.client.get(TASK_URL)

		self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateTaskApiTest(TestCase):
	# Acceso para autenticados
	def setUp(self):
		self.user = get_user_model().objects.create_user(
			'test@email.com',
			'testpassword123'
		)
		self.client = APIClient()
		self.client.force_authenticate(self.user)

	def test_retrieve_tasks(self):
		# Obtener TAREAS
		sample_task(user=self.user)
		sample_task(user=self.user)

		res = self.client.get(TASK_URL)

		tasks = Task.objects.all().order_by('title')
		serializer = TaskSerializer(tasks, many=True)
		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(res.data, serializer.data)

	def test_tasks_limited_to_user(self):
		# TAREAS que sean del usuario
		user2 = get_user_model().objects.create_user(
			'otro@example.com',
			'testpassword123'
		)
		sample_task(user=user2)
		sample_task(user=self.user)

		res = self.client.get(TASK_URL)

		tasks = Task.objects.filter(user=self.user)
		serializer = TaskSerializer(tasks, many=True)

		self.assertEqual(res.status_code, status.HTTP_200_OK)
		self.assertEqual(len(res.data), 1)
		self.assertEqual(res.data, serializer.data)