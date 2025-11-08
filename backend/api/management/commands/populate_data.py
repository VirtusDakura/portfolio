from django.core.management.base import BaseCommand
from api.models import Project, Technology, Experience, ProjectTechnology
from datetime import date


class Command(BaseCommand):
    help = 'Populate database with sample portfolio data'

    def handle(self, *args, **options):
        self.stdout.write('Populating database with sample data...')
        
        # Create technologies
        technologies_data = [
            {'name': 'React', 'icon_class': 'FaReact', 'color': 'text-blue-500', 'category': 'frontend', 'proficiency': 90},
            {'name': 'Node.js', 'icon_class': 'FaNodeJs', 'color': 'text-green-500', 'category': 'backend', 'proficiency': 85},
            {'name': 'Python', 'icon_class': 'FaPython', 'color': 'text-blue-400', 'category': 'language', 'proficiency': 88},
            {'name': 'MongoDB', 'icon_class': 'SiMongodb', 'color': 'text-green-600', 'category': 'database', 'proficiency': 82},
            {'name': 'Express', 'icon_class': 'SiExpress', 'color': 'text-gray-400', 'category': 'backend', 'proficiency': 85},
            {'name': 'Next.js', 'icon_class': 'SiNextdotjs', 'color': 'text-white', 'category': 'frontend', 'proficiency': 87},
            {'name': 'TypeScript', 'icon_class': 'SiTypescript', 'color': 'text-blue-600', 'category': 'language', 'proficiency': 84},
            {'name': 'Tailwind CSS', 'icon_class': 'SiTailwindcss', 'color': 'text-cyan-500', 'category': 'frontend', 'proficiency': 92},
            {'name': 'Firebase', 'icon_class': 'SiFirebase', 'color': 'text-orange-500', 'category': 'backend', 'proficiency': 78},
            {'name': 'PostgreSQL', 'icon_class': 'SiPostgresql', 'color': 'text-blue-700', 'category': 'database', 'proficiency': 80},
        ]
        
        created_techs = {}
        for tech_data in technologies_data:
            tech, created = Technology.objects.get_or_create(
                name=tech_data['name'],
                defaults=tech_data
            )
            created_techs[tech.name] = tech
            if created:
                self.stdout.write(f'✓ Created technology: {tech.name}')
            else:
                self.stdout.write(f'→ Technology already exists: {tech.name}')
        
        # Create sample projects
        projects_data = [
            {
                'name': 'E-Commerce Platform',
                'description': 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Features include shopping cart, order tracking, and inventory management.',
                'long_description': 'Built with the MERN stack, this e-commerce platform includes advanced features like real-time inventory updates, secure payment processing with Stripe, user reviews, and a comprehensive admin panel for managing products and orders.',
                'category': 'Full-Stack',
                'is_featured': True,
                'github_url': 'https://github.com/VirtusDakura/ecommerce-platform',
                'demo_url': 'https://ecommerce-demo.virtus.dev',
                'technologies': ['React', 'Node.js', 'MongoDB', 'Express'],
                'order': 1
            },
            {
                'name': 'Task Management App',
                'description': 'A collaborative task management application with real-time updates, team collaboration features, and progress tracking.',
                'long_description': 'This project management tool allows teams to create, assign, and track tasks in real-time. Features include drag-and-drop kanban boards, time tracking, file uploads, and team chat functionality.',
                'category': 'Frontend',
                'is_featured': True,
                'github_url': 'https://github.com/VirtusDakura/task-manager',
                'demo_url': 'https://taskmanager.virtus.dev',
                'technologies': ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
                'order': 2
            },
            {
                'name': 'AI Data Analytics Dashboard',
                'description': 'An intelligent dashboard for data visualization and analytics with machine learning insights and predictive modeling.',
                'long_description': 'A comprehensive analytics platform that processes large datasets and provides actionable insights through interactive charts, machine learning predictions, and automated reporting features.',
                'category': 'Full-Stack',
                'is_featured': True,
                'github_url': 'https://github.com/VirtusDakura/ai-analytics',
                'demo_url': 'https://analytics.virtus.dev',
                'technologies': ['Python', 'React', 'PostgreSQL'],
                'order': 3
            },
        ]
        
        for project_data in projects_data:
            tech_names = project_data.pop('technologies')
            project, created = Project.objects.get_or_create(
                name=project_data['name'],
                defaults=project_data
            )
            
            if created:
                # Add technologies to project
                for tech_name in tech_names:
                    if tech_name in created_techs:
                        ProjectTechnology.objects.get_or_create(
                            project=project,
                            technology=created_techs[tech_name]
                        )
                
                self.stdout.write(f'✓ Created project: {project.name}')
            else:
                self.stdout.write(f'→ Project already exists: {project.name}')
        
        # Create sample experience
        experiences_data = [
            {
                'company': 'Tech Innovations Inc.',
                'position': 'Senior Full-Stack Developer',
                'description': 'Led development of enterprise web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.',
                'start_date': date(2022, 1, 15),
                'end_date': None,
                'is_current': True,
                'location': 'Remote',
                'company_url': 'https://example.com',
                'order': 1
            },
            {
                'company': 'Digital Solutions Ltd.',
                'position': 'Full-Stack Developer',
                'description': 'Developed and maintained multiple client projects. Implemented RESTful APIs and modern frontend interfaces.',
                'start_date': date(2020, 6, 1),
                'end_date': date(2021, 12, 31),
                'is_current': False,
                'location': 'New York, NY',
                'company_url': 'https://example.com',
                'order': 2
            },
        ]
        
        for exp_data in experiences_data:
            exp, created = Experience.objects.get_or_create(
                company=exp_data['company'],
                position=exp_data['position'],
                defaults=exp_data
            )
            if created:
                self.stdout.write(f'✓ Created experience: {exp.position} at {exp.company}')
            else:
                self.stdout.write(f'→ Experience already exists: {exp.position} at {exp.company}')
        
        self.stdout.write(
            self.style.SUCCESS('\n✨ Successfully populated database with sample data!')
        )
        self.stdout.write(
            self.style.SUCCESS('You can now access the admin panel at http://localhost:8000/admin/')
        )
