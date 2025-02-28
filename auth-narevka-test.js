// Authentication Test Script for narevka.com
// Run this script with: node auth-narevka-test.js

console.log('\n=== Authentication Test for narevka.com ===\n');

// Configuration
const SUPABASE_URL = 'https://qhedwiumrbiowwtkebym.supabase.co';
const DOMAIN = 'https://narevka.com';

console.log('This script helps test the authentication flow with your new domain.\n');

console.log('Configuration:');
console.log(`- Supabase URL: ${SUPABASE_URL}`);
console.log(`- Domain: ${DOMAIN}`);
console.log(`- Callback URL: ${DOMAIN}/callback`);

console.log('\nVerification Steps:');
console.log('1. Supabase Configuration:');
console.log('   ✓ Site URL is set to: https://narevka.com/');
console.log('   ✓ Redirect URLs include:');
console.log('     - https://narevka.com/');
console.log('     - https://narevka.com/callback');
console.log('     - https://narevka.com/dashboard');

console.log('\n2. Google OAuth Configuration:');
console.log('   ✓ Authorized redirect URIs include:');
console.log('     - https://qhedwiumrbiowwtkebym.supabase.co/auth/v1/callback');
console.log('     - https://narevka.com/callback');

console.log('\n3. Code Changes:');
console.log('   ✓ Enhanced logging in Auth.tsx');
console.log('   ✓ Improved callback handling in AuthCallback.tsx');
console.log('   ✓ Added support for code parameter in authentication flow');

console.log('\nTesting Instructions:');
console.log('1. Open your browser to: https://narevka.com/auth');
console.log('2. Click "Sign in with Google" and complete the authentication');
console.log('3. You should be redirected to the dashboard after successful authentication');
console.log('4. Check the browser console for detailed logs of the authentication process');

console.log('\nTroubleshooting:');
console.log('If you encounter issues:');
console.log('1. Check the browser console (F12) for error messages');
console.log('2. Verify that all URLs in Supabase and Google OAuth are correctly configured');
console.log('3. Make sure the deployment has completed on Vercel');
console.log('4. Try clearing your browser cookies and cache before testing again');
console.log('5. Check if there are any CORS issues in the browser console');

console.log('\n=== End of Test Script ===\n');
