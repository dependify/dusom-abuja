import type { VercelRequest, VercelResponse } from '@vercel/node';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, agent_id, message, conversation_history } = req.body || {};

  if (!agent_id) {
    return res.status(400).json({ error: 'agent_id is required' });
  }

  try {
    // Handle token request (voice)
    if (action === 'token' || (!action && !message)) {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agent_id}`,
        {
          method: 'GET',
          headers: { 'xi-api-key': ELEVENLABS_API_KEY },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs token error:', response.status, errorText);
        return res.status(response.status).json({
          error: 'Failed to get signed URL from ElevenLabs',
          details: errorText,
        });
      }

      const data = await response.json();
      return res.json({ token: data.signed_url, signed_url: data.signed_url });
    }

    // Handle chat request (text)
    if (action === 'chat' || message) {
      const conversationContext = conversation_history?.map((msg: any) => ({
        role: msg.role,
        message: msg.content || msg.message,
      })) || [];

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/agents/${agent_id}/simulate-conversation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            simulation_specification: {
              simulated_user_config: {
                initial_messages: [{ role: 'user', message }],
              },
              ...(conversationContext.length > 0 && {
                partial_conversation_history: conversationContext,
              }),
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs chat error:', response.status, errorText);
        return res.status(response.status).json({
          error: 'Failed to chat with ElevenLabs agent',
          details: errorText,
        });
      }

      const data: any = await response.json();
      const agentMessages = data.simulated_conversation?.filter(
        (msg: any) => msg.role === 'agent' && msg.message
      );
      const lastAgentResponse = agentMessages?.[agentMessages.length - 1];

      return res.json({
        response: lastAgentResponse?.message || "I'm sorry, I couldn't process your request. Please try again.",
        conversation: data.simulated_conversation,
        analysis: data.analysis,
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error: any) {
    console.error('Voice API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
