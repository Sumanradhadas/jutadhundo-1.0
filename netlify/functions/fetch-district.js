export default async (req, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Cache-Control': 'public, max-age=3600',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers,
    });
  }

  try {
    const url = new URL(req.url);
    const district = url.searchParams.get('district');

    if (!district) {
      return new Response(
        JSON.stringify({ error: 'District parameter is required' }),
        { status: 400, headers }
      );
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return new Response(
        JSON.stringify({ error: 'GitHub token not configured' }),
        { status: 500, headers }
      );
    }

    // Fetch district JSON from private repo
    const githubUrl = `https://api.github.com/repos/Sumanradhadas/allcirclesbih/contents/${district}.json`;
    
    const response = await fetch(githubUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Netlify-Function'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: 'District not found' }),
          { status: 404, headers }
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const districtData = await response.json();
    
    return new Response(JSON.stringify(districtData), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching district data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch district data', details: error.message }),
      { status: 500, headers }
    );
  }
};