# CraftHub E-Commerce Platform

A full-stack e-commerce platform with enhanced admin and client dashboards featuring CRUD operations and payment integration.

## Features

### Admin Dashboard
- **Overview**: Real-time statistics and analytics
- **Product Management**: Full CRUD operations for products
- **User Management**: Manage users and admin permissions
- **Transaction Management**: View and update order statuses
- **Analytics**: Sales charts, user growth, and popular products

### Client Dashboard
- **Product Browsing**: Browse and search products
- **Shopping Cart**: Add, remove, and update quantities
- **Order Management**: View order history and status
- **Payment Integration**: Multiple payment methods (Khalti, eSewa, COD)
- **User Authentication**: Register, login, and profile management

## Project Structure

```
vite_craft/
├── admin/                 # Admin Dashboard (React)
├── client/               # Client Frontend (React)
└── server/               # Backend API (Node.js/Express)
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=mongodb://localhost:27017/crafthub
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

Start the server:
```bash
npm start
```

### 2. Admin Dashboard Setup

```bash
cd admin
npm install
npm run dev
```

The admin dashboard will be available at `http://localhost:5173`

### 3. Client Dashboard Setup

```bash
cd client
npm install
npm run dev
```

The client dashboard will be available at `http://localhost:5174`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/:id` - Update user (Admin only)

### Transactions
- `GET /api/transactions` - Get all transactions (Admin only)
- `GET /api/transactions/user` - Get user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction status (Admin only)

## Usage

### Admin Dashboard
1. Access the admin dashboard at `http://localhost:5173`
2. Use the sidebar to navigate between different sections:
   - **Overview**: View statistics and analytics
   - **Products**: Manage product inventory
   - **Users**: Manage user accounts
   - **Transactions**: Monitor orders and payments

### Client Dashboard
1. Access the client dashboard at `http://localhost:5174`
2. Register or login to access full features
3. Browse products and add them to cart
4. Complete checkout with payment integration
5. View order history and track status

## Payment Integration

The platform supports multiple payment methods:
- **Khalti**: Digital wallet payment
- **eSewa**: Online payment gateway
- **Cash on Delivery**: Pay on delivery

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- ECharts (for analytics)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Key Features
- Real-time data updates
- Responsive design
- Secure authentication
- Role-based access control
- Payment processing
- Order management
- Analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 