// Authentication Debugging Script
// Run this script with: node auth-debug.js

console.log('\n=== Authentication Debugging Helper ===\n');

// Configuration
const SUPABASE_URL = 'https://qhedwiumrbiowwtkebym.supabase.co';
const VERCEL_DOMAINS = [
  'https://c-hat-v15.vercel.app',
  'https://c-hat-v15-toknowaipols-projects.vercel.app',
  'https://c-hat-v15-git-main-toknowaipols-projects.vercel.app'
];

console.log('This script helps diagnose authentication issues with your application.\n');

console.log('Supabase Configuration:');
console.log(`- Supabase URL: ${SUPABASE_URL}`);
console.log('- Auth Callback URL: ' + SUPABASE_URL + '/auth/v1/callback');

console.log('\nVercel Domains:');
VERCEL_DOMAINS.forEach((domain, index) => {
  console.log(`${index + 1}. ${domain}`);
});

console.log('\nTroubleshooting Steps:');
console.log('1. Check browser console for authentication errors');
console.log('   - Open browser developer tools (F12 or Ctrl+Shift+I)');
console.log('   - Go to the Console tab');
console.log('   - Look for any errors related to authentication');

console.log('\n2. Verify Supabase URL Configuration:');
console.log('   - Go to Supabase dashboard: https://app.supabase.com');
console.log('   - Select your project');
console.log('   - Go to Authentication → URL Configuration');
console.log('   - Ensure Site URL is set to your primary domain');
console.log('   - Ensure all Vercel domains are added to Redirect URLs');

console.log('\n3. Verify Google OAuth Configuration:');
console.log('   - Go to Google Cloud Console: https://console.cloud.google.com');
console.log('   - Navigate to APIs & Services → Credentials');
console.log('   - Edit your OAuth 2.0 Client ID');
console.log('   - Ensure the Supabase callback URL is added to Authorized redirect URIs:');
console.log(`     ${SUPABASE_URL}/auth/v1/callback`);

console.log('\n4. Test Authentication Flow:');
console.log('   - Try signing in with email/password first');
console.log('   - If that works, try Google authentication');
console.log('   - Check if you\'re redirected to the dashboard after authentication');

console.log('\n5. Check Dashboard Route:');
console.log('   - Verify the dashboard route exists in your application');
console.log('   - Try accessing the dashboard directly after signing in');

console.log('\n=== End of Debugging Helper ===\n');

console.log('If you\'re still experiencing issues, check the browser network tab for more details on the authentication requests and responses.');
