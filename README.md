# Mantravi Back Office Management System

A comprehensive Spring Boot application for managing blogs, contacts, users, and file uploads with a modern admin dashboard.

## 🚀 Features

### Core Functionality
- **Blog Management**: Create, edit, publish, and manage blog posts
- **Contact Management**: Handle contact form submissions with status tracking
- **User Management**: Role-based user administration (Admin, Editor, Support)
- **File Upload**: Blog cover image upload and management
- **Excel Export**: Export contacts to Excel format
- **Dashboard**: Real-time statistics and quick actions

### Technical Features
- **Spring Boot 3.2.0** with Java 17
- **Spring Security** with role-based access control
- **JPA/Hibernate** for database operations
- **MySQL** database support
- **Thymeleaf** for server-side rendering
- **Bootstrap 5** for responsive UI
- **Swagger/OpenAPI** documentation
- **Apache POI** for Excel export
- **File upload** with local storage

## 🛠️ Technology Stack

- **Backend**: Spring Boot, Spring Security, Spring Data JPA
- **Database**: MySQL 8.0
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Build Tool**: Maven
- **Documentation**: Swagger/OpenAPI 3
- **File Processing**: Apache POI for Excel export

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mantravi-backoffice
```

### 2. Database Setup
Create a MySQL database:
```sql
CREATE DATABASE mantravi_backoffice;
```

### 3. Configuration
Update `src/main/resources/application.yml` with your database credentials:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mantravi_backoffice?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: your_username
    password: your_password
```

### 4. Build and Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### 5. Access the Application
- **Admin Dashboard**: http://localhost:8080/admin/dashboard
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Login**: http://localhost:8080/login

### 6. Default Credentials
- **Username**: admin
- **Password**: admin123

## 📁 Project Structure

```
mantravi-backoffice/
├── src/main/java/com/mantravi/
│   ├── config/          # Configuration classes
│   ├── controller/       # REST and Web controllers
│   ├── dto/             # Data Transfer Objects
│   ├── entity/          # JPA Entities
│   ├── repository/      # Spring Data Repositories
│   ├── service/         # Business Logic Services
│   ├── exception/       # Global Exception Handling
│   └── util/           # Utility Classes
├── src/main/resources/
│   ├── templates/       # Thymeleaf templates
│   ├── static/          # CSS, JS, Images
│   ├── uploads/         # File upload directory
│   └── application.yml  # Application configuration
└── pom.xml             # Maven dependencies
```

## 🔐 Security & Roles

### User Roles
- **ADMIN**: Full access to all features
- **EDITOR**: Blog management only
- **SUPPORT**: Contact management only

### Security Features
- Form-based authentication
- Role-based access control
- CSRF protection
- Password encryption with BCrypt
- Session management

## 📊 API Endpoints

### Public APIs
- `GET /api/public/blogs` - Get all published blogs
- `GET /api/public/blogs/{slug}` - Get blog by slug
- `POST /api/public/contacts` - Submit contact form

### Admin APIs
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/blogs` - List blogs
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/{id}` - Update blog
- `DELETE /api/admin/blogs/{id}` - Delete blog
- `PATCH /api/admin/blogs/{id}/publish` - Publish blog
- `POST /api/admin/blogs/upload-image` - Upload blog image
- `GET /api/admin/contacts` - List contacts
- `PATCH /api/admin/contacts/{id}` - Update contact
- `GET /api/admin/contacts/export` - Export contacts to Excel
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user

## 🎨 Admin Dashboard

### Dashboard Features
- **Statistics Cards**: Total blogs, contacts, users
- **Quick Actions**: Create blog, view contacts, add users
- **Recent Activity**: Latest blogs and contacts
- **Responsive Design**: Mobile-friendly interface

### Management Pages
- **Blog Management**: Create, edit, publish blogs
- **Contact Management**: View, update, export contacts
- **User Management**: Add, edit, manage users and roles

## 📁 File Management

### Upload Directory Structure
```
uploads/
├── blogs/              # Blog cover images
└── users/             # User profile pictures (future)
```

### Supported File Types
- **Images**: JPEG, PNG, GIF, WebP
- **Maximum Size**: 10MB per file

## 🔧 Configuration

### Application Properties
```yaml
# Database Configuration
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mantravi_backoffice
    username: root
    password: password

# File Upload Settings
file:
  upload-dir: uploads/
  blog-images-dir: uploads/blogs/

# CORS Settings
cors:
  allowed-origins: "*"
  allowed-methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS"
```

## 🧪 Testing

### Sample Data
The application automatically creates sample data on startup:
- 3 sample blogs (2 published, 1 draft)
- 4 sample contacts with different statuses
- 1 admin user (admin/admin123)

### Testing Endpoints
Use the Swagger UI at http://localhost:8080/swagger-ui.html to test API endpoints.

## 🚀 Deployment

### Production Configuration
1. Update database credentials in `application.yml`
2. Set production profile: `spring.profiles.active=prod`
3. Configure file upload directory permissions
4. Set up SSL certificates for HTTPS
5. Configure reverse proxy (Nginx/Apache)

### Docker Deployment
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/mantravi-backoffice-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: admin@mantravi.com
- Documentation: http://localhost:8080/swagger-ui.html

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Blog management
  - Contact management
  - User management
  - File upload
  - Excel export
  - Admin dashboard

---

**Mantravi Technologies** - Building the future with technology.
# mantravi-website
