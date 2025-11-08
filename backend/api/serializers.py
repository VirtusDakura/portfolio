from rest_framework import serializers
from .models import Project, Technology, Experience, ContactSubmission, ProjectTechnology


class TechnologySerializer(serializers.ModelSerializer):
    """Serializer for Technology model"""
    
    class Meta:
        model = Technology
        fields = ['id', 'name', 'icon_class', 'color', 'category', 'proficiency']


class ProjectTechnologySerializer(serializers.ModelSerializer):
    """Serializer for project technologies with technology details"""
    technology = TechnologySerializer(read_only=True)
    
    class Meta:
        model = ProjectTechnology
        fields = ['technology']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    technologies = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'long_description', 'image_url',
            'github_url', 'demo_url', 'category', 'is_featured', 
            'technologies', 'created_at'
        ]
    
    def get_technologies(self, obj):
        """Get technologies with their details"""
        project_techs = ProjectTechnology.objects.filter(project=obj).select_related('technology')
        return [
            {
                'name': pt.technology.name,
                'icon': pt.technology.icon_class,
                'color': pt.technology.color
            }
            for pt in project_techs
        ]
    
    def get_image_url(self, obj):
        """Get full URL for project image"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class ExperienceSerializer(serializers.ModelSerializer):
    """Serializer for Experience model"""
    duration = serializers.ReadOnlyField()
    
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'description', 'start_date',
            'end_date', 'location', 'company_url', 'is_current', 'duration'
        ]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for ContactSubmission model"""
    
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'subject', 'message']
        
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Please enter a valid email address.")
        return value.lower()
        
    def validate_message(self, value):
        """Validate message length"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value.strip()
        
    def validate_name(self, value):
        """Validate name"""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value.strip()


class SkillCategorySerializer(serializers.Serializer):
    """Serializer for skills grouped by category"""
    category = serializers.CharField()
    technologies = TechnologySerializer(many=True)
