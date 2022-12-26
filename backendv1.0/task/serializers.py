from rest_framework import serializers

from core.models import Category, Task

class CategorySerializer(serializers.ModelSerializer):
	# Serializer para categoria
	class Meta:
		model = Category
		fields = ('id', 'name')
		read_only_Fields = ('id',)

class TaskSerializer(serializers.ModelSerializer):
	# Serializer para tarea

	category = serializers.StringRelatedField()
	state = serializers.StringRelatedField()

	class Meta:
		model = Task
		fields = (
			'id', 
			'title', 
			'desc', 
			'date_init', 
			'date_end',
			'state',
			'category',
		)
		read_only_Fields = ('id',)
