export default async (req, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers,
    });
  }

  try {
    // Get user IP from Netlify context
    const userIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                   req.headers.get('x-real-ip') || 
                   context.ip || 
                   'unknown';

    // Fetch location data from ipapi.co (free, no auth required)
    let locationData = {
      ip: userIp,
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown'
    };

    try {
      const locationResponse = await fetch(`https://ipapi.co/${userIp}/json/`);
      if (locationResponse.ok) {
        const data = await locationResponse.json();
        locationData = {
          ip: userIp,
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country: data.country_name || 'Unknown'
        };
      }
    } catch (e) {
      console.error('Error fetching location:', e);
    }

    return new Response(
      JSON.stringify(locationData),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error getting user IP:', error);
    return new Response(
      JSON.stringify({ 
        ip: 'unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        error: error.message 
      }),
      { status: 200, headers }
    );
  }
};