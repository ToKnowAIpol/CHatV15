// Supabase Configuration Helper
// Run this script with: node supabase-config-helper.js

console.log('\n=== Supabase Authentication Configuration Helper ===\n');

// Get the current URL
const localUrl = 'http://localhost:8080';
const productionUrl = 'https://chatv15.vercel.app';

console.log('To fix authentication issues, you need to update your Supabase project settings.\n');
console.log('1. Log in to your Supabase dashboard: https://app.supabase.com');
console.log('2. Select your project');
console.log('3. Go to Authentication → URL Configuration');
console.log('\nUpdate the following settings:\n');

console.log('Site URL:');
console.log(`- Set to: ${productionUrl}`);
console.log('\nRedirect URLs:');
console.log(`- Add: ${localUrl}/dashboard`);
console.log(`- Add: ${productionUrl}/dashboard`);

console.log('\nFor Google OAuth:');
console.log('1. Go to Authentication → Providers → Google');
console.log('2. Ensure "Enabled" is turned on');
console.log('3. Add the following Authorized redirect URIs in your Google Cloud Console:');
console.log(`- ${localUrl}/auth/v1/callback`);
console.log(`- ${productionUrl}/auth/v1/callback`);

console.log('\nAfter making these changes:');
console.log('1. Save all settings in Supabase');
console.log('2. Wait a few minutes for changes to propagate');
console.log('3. Test authentication on both localhost and production URLs');

console.log('\n=== End of Configuration Helper ===\n');
