const EMAIL_OCTOPUS_API_KEY = process.env.EMAIL_OCTOPUS_API_KEY;
const EMAIL_OCTOPUS_LIST_ID = process.env.EMAIL_OCTOPUS_LIST_ID;

export default async function handler(
  request: any,
  response: any
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key and list ID are configured
  if (!EMAIL_OCTOPUS_API_KEY || !EMAIL_OCTOPUS_LIST_ID) {
    console.error('Missing environment variables:', {
      apiKey: !!EMAIL_OCTOPUS_API_KEY,
      listId: !!EMAIL_OCTOPUS_LIST_ID
    });
    return response.status(500).json({ 
      error: 'Server configuration error',
      details: {
        apiKey: !!EMAIL_OCTOPUS_API_KEY,
        listId: !!EMAIL_OCTOPUS_LIST_ID
      }
    });
  }

  const { email } = request.body;

  // Validate email
  if (!email || typeof email !== 'string') {
    return response.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Debug: Log the API key and list ID (first few characters only)
    console.log('API Key exists:', !!EMAIL_OCTOPUS_API_KEY);
    console.log('List ID exists:', !!EMAIL_OCTOPUS_LIST_ID);
    console.log('API Key prefix:', EMAIL_OCTOPUS_API_KEY?.substring(0, 10));
    console.log('List ID:', EMAIL_OCTOPUS_LIST_ID);

    // Use EmailOctopus API v2 to create a contact
    const apiUrl = `https://emailoctopus.com/api/v2/lists/${EMAIL_OCTOPUS_LIST_ID}/contacts`;
    console.log('API URL:', apiUrl);

    const requestBody = {
      email_address: email,
      status: 'subscribed'
    };
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const emailOctopusResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EMAIL_OCTOPUS_API_KEY}`
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await emailOctopusResponse.json();
    console.log('EmailOctopus response status:', emailOctopusResponse.status);
    console.log('EmailOctopus response data:', responseData);

    if (!emailOctopusResponse.ok) {
      // Handle specific EmailOctopus errors
      if (responseData.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        return response.status(409).json({ error: 'Email already subscribed' });
      }
      
      console.error('EmailOctopus API error:', responseData);
      return response.status(400).json({ 
        error: responseData.error?.message || 'Failed to subscribe',
        details: responseData 
      });
    }

    // Success
    return response.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed!',
      data: responseData 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    console.error('Error stack:', error.stack);
    return response.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      stack: error.stack
    });
  }
}