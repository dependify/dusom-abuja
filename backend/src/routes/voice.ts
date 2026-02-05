import { Router } from 'express';
import { query } from '../utils/db.js';

const router = Router();

// ElevenLabs configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_3c4f17f77fa4b9165fc8e6b65e27d01f70753d08a1de4ca0';
const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID || 'agent_2601kfx2xrd5emmbts6ss7m5146j';

// Get signed URL for voice conversation
router.post('/token', async (req, res) => {
  try {
    const { agent_id } = req.body;
    
    if (!agent_id) {
      return res.status(400).json({ error: 'agent_id is required' });
    }

    // Call ElevenLabs API to get signed URL
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agent_id}`, {
      method: 'GET',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Failed to get signed URL from ElevenLabs',
        details: errorText 
      });
    }

    const data: any = await response.json();
    
    if (!data.signed_url) {
      return res.status(500).json({ error: 'No signed_url in ElevenLabs response' });
    }

    // Return the token/signed URL
    res.json({ 
      token: data.signed_url,
      signed_url: data.signed_url 
    });
  } catch (error: any) {
    console.error('Voice token error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Text chat with agent using simulate-conversation endpoint
router.post('/chat', async (req, res) => {
  try {
    const { agent_id, message, conversation_history } = req.body;
    
    if (!agent_id || !message) {
      return res.status(400).json({ error: 'agent_id and message are required' });
    }

    // Build conversation history for simulation
    const conversationContext = conversation_history?.map((msg: any) => ({
      role: msg.role,
      message: msg.content || msg.message,
    })) || [];

    // Call ElevenLabs API for text chat using simulate-conversation
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agent_id}/simulate-conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        simulation_specification: {
          simulated_user_config: {
            initial_messages: [
              {
                role: 'user',
                message: message,
              }
            ],
          },
          ...(conversationContext.length > 0 && {
            partial_conversation_history: conversationContext,
          }),
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs chat error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Failed to chat with ElevenLabs agent',
        details: errorText 
      });
    }

    const data: any = await response.json();
    
    // Extract the most recent agent's response from the simulated conversation
    // The API simulates a conversation, so we get the last agent message
    const agentMessages = data.simulated_conversation?.filter(
      (msg: any) => msg.role === 'agent' && msg.message
    );
    const lastAgentResponse = agentMessages?.[agentMessages.length - 1];

    res.json({
      response: lastAgentResponse?.message || "I'm sorry, I couldn't process your request. Please try again.",
      conversation: data.simulated_conversation,
      analysis: data.analysis,
    });
  } catch (error: any) {
    console.error('Voice chat error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default router;
