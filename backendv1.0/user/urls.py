from django.urls import reverse, path

from user import views

app_name = 'user'

urlpatterns = [
	path('create/', views.CreateUserView.as_view(), name='create'),
	path('update/', views.ManageUserView.as_view(), name='update'),
	path('token/', views.CreateTokenView.as_view(), name='token'),
]