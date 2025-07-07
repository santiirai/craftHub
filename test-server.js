// Simple test script to verify server functionality
const testServer = async () => {
  try {
    console.log('Testing server connection...');
    
    // Test server health
    const healthResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    console.log('Server response status:', healthResponse.status);
    const data = await healthResponse.json();
    console.log('Server response:', data);
    
  } catch (error) {
    console.error('Server test failed:', error.message);
  }
};

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testServer();
} 