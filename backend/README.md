# ProBattle Backend Setup Guide

## Prerequisites
- Node.js installed
- MySQL installed and running
- npm or yarn

## Installation Steps

### 1. Create Database
Open MySQL command line or MySQL Workbench and run:
```bash
mysql -u root -p < database.sql
```

Or manually run the SQL from `database.sql` file in your MySQL client.

**Sample login credentials:**
- Email: `test@example.com`
- Password: `test123` (hashed in database)

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Database Connection
Edit `.env` file and update MySQL credentials if needed:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=probattle
API_PORT=3000
```

### 4. Start Backend Server
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Login
**POST** `/api/auth/login`
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

### Signup
**POST** `/api/auth/signup`
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "9999999999"
}
```

### Get User Info
**GET** `/api/auth/me`
**Headers:** `Authorization: Bearer <token>`

## Frontend Integration

The app will automatically connect to `http://localhost:3000` for login/signup.

When user logs in:
1. Token is saved to localStorage
2. User is redirected to dashboard
3. Subsequent requests include the token in Authorization header

## Testing

### Test Login with curl:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Signup:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123","name":"Test User","phone":"9999999999"}'
```

## Troubleshooting

**Error: Connection Refused**
- Make sure MySQL is running
- Check database credentials in `.env`

**Error: Cannot find module**
- Run `npm install` again

**CORS Error**
- Backend already has CORS enabled for all origins
- Make sure requests are using `http://localhost:3000`

## Next Steps

1. Test login with test@example.com / test123
2. Add dashboard page after login
3. Add tournament listing API
4. Add wallet/payment functionality
5. Deploy backend to hosting (Heroku, AWS, etc.)

## Password Reset

Sample password in database: `test123`
To create new user with custom password, use the signup endpoint or manually hash password using bcryptjs.

## Security Notes

- Change `JWT_SECRET` in production
- Use HTTPS in production
- Add rate limiting
- Implement refresh tokens
- Add password validation rules
