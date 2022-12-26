from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Category, Task

from task import serializers

class BasicViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
	# Basic view set
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		# RETORNAR PARA USUARIO AUTENTICADO
		return self.queryset.filter(user=self.request.user).order_by('name')

	def perform_create(self, serializer):
		# CREAR NUEVO OBJETO
		serializer.save(user=self.request.user)


class CategoryViewSet(BasicViewSet):
	# Manejar Categorias en la BD
	queryset = Category.objects.all()
	serializer_class = serializers.CategorySerializer

class TaskViewSet(BasicViewSet):
	# Manejar tareas en la BD
	queryset = Task.objects.all()
	serializer_class = serializers.TaskSerializer
	def get_queryset(self):
		# RETORNAR PARA USUARIO AUTENTICADO
		return self.queryset.filter(user=self.request.user).order_by('title')