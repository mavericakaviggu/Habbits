# Habits Tracker - Backend Setup

## Prerequisites
- Java 17 or higher
- Maven 3.6+

## Running the Backend

### Option 1: Using Maven
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Option 2: Using IDE
1. Import the project as a Maven project
2. Run `HabitsTrackerApplication.java` as a Java application

## API Endpoints

The backend runs on `http://localhost:8080`

### Habits
- `GET /api/habits` - Get all habits
- `GET /api/habits/active` - Get active habits
- `GET /api/habits/{id}` - Get habit by ID
- `POST /api/habits` - Create new habit
- `PUT /api/habits/{id}` - Update habit
- `DELETE /api/habits/{id}` - Delete habit
- `GET /api/habits/search?name=...` - Search habits

### Habit Entries
- `GET /api/entries/habit/{habitId}` - Get all entries for a habit
- `GET /api/entries/habit/{habitId}/range?startDate=...&endDate=...` - Get entries by date range
- `POST /api/entries` - Create/update entry
- `DELETE /api/entries/{id}` - Delete entry

## Database

By default, the application uses H2 in-memory database for development.

### H2 Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:habitsdb`
- Username: `sa`
- Password: (leave empty)

### Switch to MySQL (Production)
1. Uncomment MySQL dependency in `pom.xml`
2. Uncomment MySQL configuration in `application.properties`
3. Update database credentials
4. Create database: `CREATE DATABASE habitsdb;`
