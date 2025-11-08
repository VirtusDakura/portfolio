from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    # API Overview
    path('', views.api_overview, name='api_overview'),
    path('status/', views.api_status, name='api_status'),
    
    # Portfolio endpoints that match frontend API calls
    path('projects/', views.ProjectListView.as_view(), name='projects_list'),
    path('projects/<uuid:id>/', views.ProjectDetailView.as_view(), name='project_detail'),
    path('skills/', views.skills_list, name='skills_list'),
    path('experience/', views.ExperienceListView.as_view(), name='experience_list'),
    path('contact/', views.contact_submit, name='contact_submit'),
]
