// Authentication Debugging Script for narevka.com
// Run this script in the browser console

console.log('\n=== Authentication Debugging for narevka.com ===\n');

// Check for session in localStorage
function checkLocalStorage() {
  console.log('Checking localStorage for Supabase session:');
  
  // Look for Supabase-related items in localStorage
  const supabaseItems = Object.keys(localStorage)
    .filter(key => key.includes('supabase') || key.includes('sb-'))
    .reduce((obj, key) => {
      try {
        // Try to parse JSON values
        const value = localStorage.getItem(key);
        obj[key] = JSON.parse(value);
      } catch (e) {
        // If not JSON, store as is
        obj[key] = localStorage.getItem(key);
      }
      return obj;
    }, {});
  
  if (Object.keys(supabaseItems).length > 0) {
    console.log('Found Supabase items in localStorage:', supabaseItems);
    
    // Check for session specifically
    const sessionKey = Object.keys(supabaseItems).find(key => 
      key.includes('session') || 
      (typeof supabaseItems[key] === 'object' && supabaseItems[key]?.access_token)
    );
    
    if (sessionKey) {
      console.log('Session found in localStorage!');
      console.log('Session key:', sessionKey);
      console.log('Session data:', supabaseItems[sessionKey]);
      
      // Check if session is expired
      if (supabaseItems[sessionKey].expires_at) {
        const expiresAt = new Date(supabaseItems[sessionKey].expires_at * 1000);
        const now = new Date();
        console.log('Session expires at:', expiresAt.toLocaleString());
        console.log('Current time:', now.toLocaleString());
        console.log('Session is ' + (expiresAt > now ? 'valid' : 'expired'));
      }
    } else {
      console.log('No session found in localStorage, but other Supabase items exist.');
    }
  } else {
    console.log('No Supabase items found in localStorage.');
  }
}

// Check for cookies
function checkCookies() {
  console.log('\nChecking cookies:');
  
  const cookies = document.cookie.split(';')
    .map(cookie => cookie.trim().split('='))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  
  const supabaseCookies = Object.keys(cookies)
    .filter(key => key.includes('supabase') || key.includes('sb-'))
    .reduce((obj, key) => {
      obj[key] = cookies[key];
      return obj;
    }, {});
  
  if (Object.keys(supabaseCookies).length > 0) {
    console.log('Found Supabase cookies:', supabaseCookies);
  } else {
    console.log('No Supabase cookies found.');
  }
}

// Check current URL for auth parameters
function checkUrl() {
  console.log('\nChecking current URL for auth parameters:');
  
  const url = new URL(window.location.href);
  console.log('Current URL:', url.toString());
  console.log('Pathname:', url.pathname);
  
  // Check for access_token in hash
  if (url.hash && url.hash.includes('access_token')) {
    console.log('Found access_token in URL hash!');
    
    const hashParams = new URLSearchParams(url.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    const expiresIn = hashParams.get('expires_in');
    
    console.log('Access token:', accessToken ? accessToken.substring(0, 10) + '...' : 'none');
    console.log('Refresh token:', refreshToken ? 'present' : 'none');
    console.log('Expires in:', expiresIn);
  } else {
    console.log('No access_token found in URL hash.');
  }
  
  // Check for code in query params
  if (url.searchParams.has('code')) {
    console.log('Found code parameter in URL!');
    console.log('Code:', url.searchParams.get('code').substring(0, 10) + '...');
  } else {
    console.log('No code parameter found in URL.');
  }
}

// Test Supabase session
async function testSupabaseSession() {
  console.log('\nTesting Supabase session:');
  
  // Check if Supabase is available
  if (typeof supabase === 'undefined') {
    console.log('Supabase client not available in this context.');
    return;
  }
  
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('Error getting session:', error);
      return;
    }
    
    if (data.session) {
      console.log('Active session found!');
      console.log('User ID:', data.session.user.id);
      console.log('User email:', data.session.user.email);
      console.log('Auth provider:', data.session.user?.app_metadata?.provider || 'email');
      console.log('Session expires at:', new Date(data.session.expires_at * 1000).toLocaleString());
    } else {
      console.log('No active session found.');
    }
  } catch (error) {
    console.log('Error testing Supabase session:', error);
  }
}

// Run all checks
checkLocalStorage();
checkCookies();
checkUrl();

// Note about testing Supabase session
console.log('\nTo test the Supabase session, run this in the console:');
console.log('await testSupabaseSession()');

console.log('\n=== End of Authentication Debugging ===\n');
