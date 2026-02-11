export default async (req, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers,
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    const userData = await req.json();

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return new Response(
        JSON.stringify({ error: 'GitHub token not configured' }),
        { status: 500, headers }
      );
    }

    // Get current file content and SHA
    const fileUrl = 'https://api.github.com/repos/Sumanradhadas/DB-INFO-JUTADHUNDO/contents/user-singup.json';
    const getResponse = await fetch(fileUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Netlify-Function'
      }
    });

    let currentData = [];
    let sha = null;

    if (getResponse.ok) {
      const fileData = await getResponse.json();
      sha = fileData.sha;
      
      // Decode base64 content
      const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
      try {
        currentData = JSON.parse(content);
        if (!Array.isArray(currentData)) {
          currentData = [];
        }
      } catch (e) {
        currentData = [];
      }
    }

    // Add new user data with timestamp
    currentData.push({
      ...userData,
      timestamp: new Date().toISOString(),
    });

    // Encode updated data
    const updatedContent = Buffer.from(JSON.stringify(currentData, null, 2)).toString('base64');

    // Update file in GitHub
    const updateResponse = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Netlify-Function',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Add new user signup',
        content: updatedContent,
        sha: sha,
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.text();
      throw new Error(`GitHub API error: ${updateResponse.status} - ${errorData}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User data saved successfully' }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error saving user data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save user data', details: error.message }),
      { status: 500, headers }
    );
  }
};