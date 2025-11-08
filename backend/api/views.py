from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Prefetch
import logging

from .models import Project, Technology, Experience, ContactSubmission, ProjectTechnology
from .serializers import (
    ProjectSerializer, TechnologySerializer, ExperienceSerializer,
    ContactSubmissionSerializer, SkillCategorySerializer
)

logger = logging.getLogger(__name__)


class ProjectListView(generics.ListAPIView):
    """
    API endpoint for listing projects
    Supports filtering by category and featured status
    """
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        queryset = Project.objects.prefetch_related(
            Prefetch(
                'technologies',
                queryset=ProjectTechnology.objects.select_related('technology')
            )
        )
        
        # Filter by category if provided
        category = self.request.query_params.get('category')
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)
        
        # Filter by featured if provided
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """
    API endpoint for retrieving a single project
    """
    queryset = Project.objects.prefetch_related('technologies__technology')
    serializer_class = ProjectSerializer
    lookup_field = 'id'


@api_view(['GET'])
def skills_list(request):
    """
    API endpoint for listing skills/technologies grouped by category
    """
    try:
        # Get all technologies grouped by category
        technologies = Technology.objects.all()
        
        # Group by category
        categories = {}
        for tech in technologies:
            category = tech.category
            if category not in categories:
                categories[category] = []
            categories[category].append(tech)
        
        # Serialize the grouped data
        result = []
        for category, tech_list in categories.items():
            serializer = SkillCategorySerializer({
                'category': category,
                'technologies': tech_list
            })
            result.append(serializer.data)
        
        return Response({
            'success': True,
            'data': result
        })
        
    except Exception as e:
        logger.error(f"Error fetching skills: {str(e)}")
        return Response({
            'success': False,
            'error': 'Failed to fetch skills data'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ExperienceListView(generics.ListAPIView):
    """
    API endpoint for listing work experience
    """
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


@api_view(['POST'])
def contact_submit(request):
    """
    API endpoint for contact form submission
    """
    try:
        serializer = ContactSubmissionSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the contact submission
            contact = serializer.save()
            
            # Get client IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                contact.ip_address = x_forwarded_for.split(',')[0]
            else:
                contact.ip_address = request.META.get('REMOTE_ADDR')
            contact.save()
            
            # Send email notification
            try:
                send_contact_email(contact)
            except Exception as e:
                logger.error(f"Failed to send contact email: {str(e)}")
                # Continue even if email fails
            
            return Response({
                'success': True,
                'message': 'Thank you for your message! I will get back to you soon.',
                'data': {'id': str(contact.id)}
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'error': 'Please check your input and try again.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        logger.error(f"Contact form submission error: {str(e)}")
        return Response({
            'success': False,
            'error': 'Server error. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def send_contact_email(contact):
    """
    Send email notification for contact form submission
    """
    subject = f"Portfolio Contact: {contact.subject}"
    
    # HTML email template
    html_message = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> {contact.name}</p>
    <p><strong>Email:</strong> {contact.email}</p>
    <p><strong>Subject:</strong> {contact.subject}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        {contact.message.replace('\n', '<br>')}
    </div>
    <p><small>Sent at: {contact.created_at}</small></p>
    """
    
    # Plain text version
    plain_message = f"""
    New Contact Form Submission
    
    From: {contact.name}
    Email: {contact.email}
    Subject: {contact.subject}
    
    Message:
    {contact.message}
    
    Sent at: {contact.created_at}
    """
    
    # Send email
    send_mail(
        subject=subject,
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=settings.CONTACT_EMAIL_RECIPIENTS,
        html_message=html_message,
        fail_silently=False,
    )


@api_view(['GET'])
def api_status(request):
    """
    API health check endpoint
    """
    return Response({
        'status': 'OK',
        'message': 'Portfolio API is running',
        'version': '1.0.0'
    })


@api_view(['GET'])
def api_overview(request):
    """
    API overview with available endpoints
    """
    base_url = request.build_absolute_uri('/api/')
    
    endpoints = {
        'status': f"{base_url}status/",
        'projects': f"{base_url}projects/",
        'skills': f"{base_url}skills/",
        'experience': f"{base_url}experience/",
        'contact': f"{base_url}contact/",
    }
    
    return Response({
        'message': 'Welcome to Virtus Dakura Portfolio API',
        'version': '1.0.0',
        'endpoints': endpoints,
        'documentation': 'Visit /admin/ for model management'
    })
