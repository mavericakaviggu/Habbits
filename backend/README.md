# Habits Tracker - Backend Setup

## Prerequisites
- Java 17 or higher
- Maven 3.6+

## Running the Backend

### Local Development (with H2 Database)

To run the backend locally with an embedded H2 database:

```bash
cd backend
mvn spring-boot:run "-Dspring-boot.run.profiles=local"
```

Or using PowerShell:
```powershell
cd backend; mvn spring-boot:run "-Dspring-boot.run.profiles=local"
```

This will:
- Use H2 file-based database stored in `./data/habitsdb`
- Enable H2 Console at `http://localhost:8080/h2-console`
- Run on port 8080
- Allow CORS from localhost:3000

### Production Deployment (Render)

On Render, the application automatically uses the environment variables:
- `DATASOURCE_URL` - PostgreSQL database URL
- `DATASOURCE_USER` - Database username
- `DATASOURCE_PASSWORD` - Database password
- `FRONTEND_URL` - Frontend URL for CORS

**No changes needed** - the default profile uses environment variables which are set in Render.

### Option 3: Using IDE
1. Import the project as a Maven project
2. Add VM argument: `-Dspring.profiles.active=local`
3. Run `HabitsTrackerApplication.java` as a Java application

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

### Local Development - H2 Database
The application uses H2 file-based database for local development (when using `local` profile).

**H2 Console:**
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/habitsdb`
- Username: `sa`
- Password: (leave empty)

Data is persisted in the `./data/habitsdb.mv.db` file.

### Production - PostgreSQL
On Render, the application automatically uses PostgreSQL database configured through environment variables.

## Configuration Files

- `application.properties` - Default configuration (uses environment variables for Render)
- `application-local.properties` - Local development configuration (H2 database)

## Important Notes

- The local development setup uses H2 database and does **not** require PostgreSQL
- The Render deployment configuration is **unchanged** and uses environment variables
- Always use the `local` profile when running locally to avoid missing environment variable errors
