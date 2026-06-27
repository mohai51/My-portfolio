export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  
  const scriptURL = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptURL) {
    return res.status(500).json({ error: 'Google Script URL is not configured.' });
  }

  try {
    
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: req.body, 
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
