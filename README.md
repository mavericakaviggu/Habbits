# Habbits Tracker Application

A daily habits tracking application built with Spring Boot and React.

## Project Structure

- **backend/** - Spring Boot REST API for habits management
- **frontend/** - React application for the user interface

## Technology Stack

### Backend
- Spring Boot 3.2.4
- Java 17
- Spring Data JPA
- H2 Database (development) / MySQL (production)
- Lombok
- Maven

### Frontend
- React 18
- Axios for API calls
- CSS3 for styling
- Responsive design

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm

### Running the Application

#### 1. Start the Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**H2 Console (Development):** `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:habitsdb`
- Username: `sa`
- Password: (leave empty)

#### 2. Start the Frontend

In a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Features

✅ **Implemented:**
- Create, read, update, and delete habits
- Track habit frequency (daily, weekly, monthly)
- Set target counts for habits
- Mark habits as active/inactive
- Mark habits as completed for today
- Responsive UI for mobile and desktop
- RESTful API with proper validation
- CORS configured for frontend-backend communication

🚀 **Future Enhancements:**
- View habit completion history
- Calendar view for tracking
- Analytics and insights dashboard
- Habit streaks and statistics
- Reminders and notifications
- User authentication
- Dark mode

## API Documentation

See [backend/README.md](backend/README.md) for detailed API endpoints.

## Security & Accessibility

This application follows Accenture's coding standards:
- **Security by Design**: Input validation, secure CORS configuration, parameterized queries
- **Accessibility (WCAG 2.1 AA)**: Semantic HTML, ARIA labels, keyboard navigation, sufficient color contrast
- **Resource Efficiency**: Optimized queries, efficient rendering, minimal network payload

## License

This project is for personal use.
