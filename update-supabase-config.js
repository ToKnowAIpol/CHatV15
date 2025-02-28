// Update Supabase Configuration Script
// This script uses the Supabase Management API to update authentication settings

import fetch from 'node-fetch';

// Configuration
const SUPABASE_ACCESS_TOKEN = 'sbp_0440abf615538793120c17c4c389bc887fa74cb6';
const PROJECT_REF = 'qhedwiumrbiowwtkebym';
const SITE_URL = 'https://c-hat-v15.vercel.app';
const REDIRECT_URLS = [
  'http://localhost:8080/dashboard',
  'https://c-hat-v15.vercel.app/dashboard'
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
    config.additional_redirect_urls = REDIRECT_URLS;
    
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
  console.log('Fetching current Supabase authentication configuration...');
  const config = await getAuthConfig();
  
  if (config) {
    console.log('\nUpdating Supabase authentication configuration...');
    await updateAuthConfig(config);
    
    console.log('\nConfiguration update complete!');
    console.log('\nIMPORTANT: Remember to update your Google OAuth settings in the Google Cloud Console:');
    console.log('Add these redirect URIs:');
    console.log(`- https://qhedwiumrbiowwtkebym.supabase.co/auth/v1/callback`);
    console.log(`- ${SITE_URL}/auth/v1/callback`);
    
    console.log('\nIMPORTANT: For security reasons, please revoke or change your Supabase access token after using this script.');
  }
}

main().catch(console.error);
