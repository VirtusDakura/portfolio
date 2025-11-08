from django.contrib import admin
from django.utils.html import format_html
from .models import Project, Technology, Experience, ContactSubmission, ProjectTechnology


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'color_preview', 'order']
    list_filter = ['category']
    search_fields = ['name']
    list_editable = ['order', 'proficiency']
    ordering = ['order', 'name']
    
    def color_preview(self, obj):
        return format_html(
            '<span style="color: {}; font-weight: bold;">●</span>',
            obj.color if not obj.color.startswith('text-') else '#3B82F6'
        )
    color_preview.short_description = 'Color'


class ProjectTechnologyInline(admin.TabularInline):
    model = ProjectTechnology
    extra = 1
    autocomplete_fields = ['technology']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_featured', 'created_at', 'order']
    list_filter = ['category', 'is_featured', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['is_featured', 'order']
    ordering = ['order', '-created_at']
    inlines = [ProjectTechnologyInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'is_featured', 'order')
        }),
        ('Content', {
            'fields': ('description', 'long_description', 'image')
        }),
        ('Links', {
            'fields': ('github_url', 'demo_url')
        }),
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'start_date', 'end_date', 'is_current', 'order']
    list_filter = ['is_current', 'start_date']
    search_fields = ['company', 'position']
    list_editable = ['is_current', 'order']
    ordering = ['-start_date', 'order']
    
    fieldsets = (
        ('Position Information', {
            'fields': ('company', 'position', 'description', 'company_url')
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'is_current', 'location')
        }),
        ('Display', {
            'fields': ('order',)
        }),
    )


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at', 'ip_address']
    list_editable = ['is_read']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Meta', {
            'fields': ('is_read', 'created_at', 'ip_address'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        return False  # Disable adding through admin
