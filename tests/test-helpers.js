
cat > test-helpers.js << 'EOF'
const TestDataFactory = require('./tests/helpers/TestDataFactory');
const TestAssertions = require('./tests/helpers/TestAssertions');

console.log('Testing helper imports...');

// Test basic functionality
const user = TestDataFactory.createUser({ name: 'John Doe' });
console.log('✅ TestDataFactory working:', user.name);

try {
  TestAssertions.assertEquals(user.name, 'John Doe');
  console.log('✅ TestAssertions working');
} catch (e) {
  console.log('❌ TestAssertions failed:', e.message);
}

console.log('✅ All test utilities loaded successfully');
EOF