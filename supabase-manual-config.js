// Supabase Manual Configuration Helper
// This script provides instructions for manually updating Supabase settings

console.log('\n=== Supabase Manual Configuration Helper ===\n');

// Configuration
const PROJECT_REF = 'qhedwiumrbiowwtkebym';
const SUPABASE_URL = 'https://qhedwiumrbiowwtkebym.supabase.co';
const SITE_URL = 'https://c-hat-v15.vercel.app';
const LOCAL_URL = 'http://localhost:8080';

console.log('Follow these steps to manually update your Supabase configuration:\n');

console.log('1. Log in to your Supabase dashboard: https://app.supabase.com');
console.log(`2. Select your project: ${PROJECT_REF}`);
console.log('3. Go to Authentication → URL Configuration');

console.log('\nUpdate the following settings:\n');

console.log('Site URL:');
console.log(`- Set to: ${SITE_URL}`);

console.log('\nRedirect URLs:');
console.log(`- Add: ${LOCAL_URL}/dashboard`);
console.log(`- Add: ${SITE_URL}/dashboard`);

console.log('\nFor Google OAuth:');
console.log('1. Go to Authentication → Providers → Google');
console.log('2. Ensure "Enabled" is turned on');
console.log('3. Make sure you have valid Client ID and Client Secret from Google Cloud Console');
console.log('4. In your Google Cloud Console (https://console.cloud.google.com):');
console.log('   - Go to your project');
console.log('   - Navigate to APIs & Services → Credentials');
console.log('   - Edit your OAuth 2.0 Client ID');
console.log('   - Add the following Authorized redirect URIs:');
console.log(`     - ${SUPABASE_URL}/auth/v1/callback`);

console.log('\nAfter making these changes:');
console.log('1. Save all settings in Supabase');
console.log('2. Save all settings in Google Cloud Console');
console.log('3. Wait a few minutes for changes to propagate');
console.log('4. Test authentication on both localhost and production URLs');

console.log('\nIMPORTANT: For security reasons, please revoke or change your Supabase access token after completing this process.');

console.log('\n=== End of Manual Configuration Helper ===\n');

// Check if the code in Auth.tsx is using the correct URLs
console.log('Also, make sure your Auth.tsx file is using the correct redirect URLs:');
console.log(`- For local development: ${LOCAL_URL}/dashboard`);
console.log(`- For production: ${SITE_URL}/dashboard`);

console.log('\nYou can verify this by checking the handleGoogleSignIn and handleSubmit functions in src/pages/Auth.tsx');
