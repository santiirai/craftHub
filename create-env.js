const fs = require('fs');
const path = require('path');

const envContent = `MONGO_URI = 'mongodb+srv://craftWeb:craftWeb456@cluster0.6rmnekg.mongodb.net/ecommerceApp?retryWrites=true&w=majority&appName=Cluster0'
PORT = 8000
JWT_SECRET = 'your_super_secret_jwt_key_here_make_it_long_and_random_123456789'
NODE_ENV = development`;

const envPath = path.join(__dirname, 'server', '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully in server directory!');
  console.log('📁 File location:', envPath);
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('\n📝 Please manually create a .env file in the server directory with:');
  console.log(envContent);
} 