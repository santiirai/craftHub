# Setup Guide - Fix Registration Issues

## Step 1: Environment Setup

### Create .env file in server directory:
```bash
cd server
```

Create a file named `.env` with the following content:
```env
MONGODB_URI=mongodb://localhost:27017/crafthub
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

## Step 2: Install Dependencies

### Server Dependencies:
```bash
cd server
npm install
```

### Client Dependencies:
```bash
cd client
npm install
```

### Admin Dependencies:
```bash
cd admin
npm install
```

## Step 3: Start MongoDB

Make sure MongoDB is running on your system:
```bash
# On Windows (if installed as service)
# MongoDB should start automatically

# On Mac/Linux
mongod
```

## Step 4: Start the Server

```bash
cd server
npm start
```

You should see: `Server running on port 5000`

## Step 5: Test Server Connection

Open your browser and go to: `http://localhost:5000`

You should see a response (even if it's an error, it means the server is running).

## Step 6: Start Client Application

```bash
cd client
npm run dev
```

## Step 7: Test Registration

1. Open `http://localhost:5174` in your browser
2. Open browser developer tools (F12)
3. Go to Console tab
4. Click "Register" button
5. Fill in the form and submit
6. Check the console for any error messages

## Common Issues and Solutions

### Issue 1: "Cannot connect to server"
**Solution:** Make sure the server is running on port 5000

### Issue 2: "MongoDB connection failed"
**Solution:** 
- Make sure MongoDB is installed and running
- Check your MONGODB_URI in .env file

### Issue 3: "CORS error"
**Solution:** The server now has CORS middleware installed

### Issue 4: "JWT_SECRET not defined"
**Solution:** Make sure you have JWT_SECRET in your .env file

### Issue 5: "Module not found"
**Solution:** Run `npm install` in the respective directory

## Debugging Steps

1. **Check Server Logs:**
   - Look at the terminal where you started the server
   - Any errors will be displayed there

2. **Check Browser Console:**
   - Press F12 in your browser
   - Go to Console tab
   - Look for any error messages

3. **Test API Endpoints:**
   - Use Postman or curl to test endpoints directly
   - Example: `curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","password":"password"}'`

## Expected Behavior

After successful setup:
1. Registration should create a new user
2. Login should authenticate the user
3. User should be redirected to dashboard
4. Admin dashboard should show real data
5. Client dashboard should allow product browsing and cart management

## If Still Having Issues

1. Check if all three terminals are running:
   - Server (port 5000)
   - Client (port 5174)
   - Admin (port 5173)

2. Verify MongoDB is running:
   ```bash
   # Check if MongoDB is running
   mongo --eval "db.runCommand('ping')"
   ```

3. Check network connectivity:
   ```bash
   # Test if port 5000 is accessible
   curl http://localhost:5000
   ```

4. Clear browser cache and try again