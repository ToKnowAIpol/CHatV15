// Update Supabase Configuration for narevka.com
// This script uses the Supabase Management API to update authentication settings for the new domain

import fetch from 'node-fetch';

// Configuration
const SUPABASE_ACCESS_TOKEN = 'YOUR_SUPABASE_ACCESS_TOKEN'; // Replace with your actual token
const PROJECT_REF = 'qhedwiumrbiowwtkebym';
const SITE_URL = 'https://narevka.com';
const REDIRECT_URLS = [
  'https://narevka.com',
  'https://narevka.com/callback',
  'https://narevka.com/dashboard'
];

// API endpoints
const AUTH_CONFIG_URL = `https://api.supabase.io/v1/projects/${PROJECT_REF}/auth/config`;

async function getAuthConfig() {
  try {
    const response = await fetch(AUTH_CONFIG_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Current Auth Configuration:');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching auth config:', error);
    return null;
  }
}

async function updateAuthConfig(config) {
  try {
    // Update the configuration
    config.site_url = SITE_URL;
    
    // Merge existing redirect URLs with new ones to avoid overwriting
    const existingUrls = config.additional_redirect_urls || [];
    const allUrls = [...new Set([...existingUrls, ...REDIRECT_URLS])];
    config.additional_redirect_urls = allUrls;
    
    const response = await fetch(AUTH_CONFIG_URL, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Updated Auth Configuration:');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error updating auth config:', error);
    return null;
  }
}

async function main() {
  console.log('\n=== Updating Supabase Configuration for narevka.com ===\n');
  
  if (SUPABASE_ACCESS_TOKEN === 'YOUR_SUPABASE_ACCESS_TOKEN') {
    console.log('ERROR: You need to replace "YOUR_SUPABASE_ACCESS_TOKEN" with your actual Supabase access token.');
    console.log('You can generate a new access token in the Supabase dashboard under Project Settings > API > Access Tokens.');
    return;
  }
  
  console.log('Fetching current Supabase authentication configuration...');
  const config = await getAuthConfig();
  
  if (config) {
    console.log('\nUpdating Supabase authentication configuration...');
    await updateAuthConfig(config);
    
    console.log('\nConfiguration update complete!');
    console.log('\nIMPORTANT: Remember to update your Google OAuth settings in the Google Cloud Console:');
    console.log('Add these redirect URIs:');
    console.log(`- ${SITE_URL}/callback`);
    
    console.log('\nIMPORTANT: For security reasons, please revoke or change your Supabase access token after using this script.');
  }
  
  console.log('\n=== End of Configuration Update ===\n');
}

main().catch(console.error);
