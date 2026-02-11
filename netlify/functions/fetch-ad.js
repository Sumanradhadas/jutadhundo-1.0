export default async (req, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Cache-Control': 'no-cache',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers,
    });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return new Response(
        JSON.stringify({ error: 'GitHub token not configured' }),
        { status: 500, headers }
      );
    }

    // Fetch ad HTML
    const adUrl = 'https://api.github.com/repos/Sumanradhadas/DB-INFO-JUTADHUNDO/contents/ad.html';
    const adResponse = await fetch(adUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Netlify-Function'
      }
    });

    let adHtml = null;
    let adDuration = 20; // Default 20 seconds

    if (adResponse.ok) {
      adHtml = await adResponse.text();
      
      // Try to extract duration from HTML comment <!-- DURATION:30 -->
      const durationMatch = adHtml.match(/<!--\s*DURATION:(\d+)\s*-->/);
      if (durationMatch) {
        adDuration = parseInt(durationMatch[1], 10);
      }
    }

    // Fetch IP blacklist
    const ipUrl = 'https://api.github.com/repos/Sumanradhadas/DB-INFO-JUTADHUNDO/contents/ip.txt';
    const ipResponse = await fetch(ipUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Netlify-Function'
      }
    });

    let blacklistedIps = [];
    if (ipResponse.ok) {
      const ipText = await ipResponse.text();
      blacklistedIps = ipText.split('\n')
        .map(ip => ip.trim())
        .filter(ip => ip && !ip.startsWith('#'));
    }

    return new Response(
      JSON.stringify({
        adHtml,
        adDuration,
        blacklistedIps
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error fetching ad data:', error);
    return new Response(
      JSON.stringify({ 
        adHtml: null, 
        adDuration: 20, 
        blacklistedIps: [],
        error: error.message 
      }),
      { status: 200, headers }
    );
  }
};