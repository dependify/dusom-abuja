import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Loader2, MessageCircle, Send, Keyboard, GraduationCap, BookOpen, Calendar, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ELEVENLABS_AGENT_ID = "agent_2601kfx2xrd5emmbts6ss7m5146j";

const QUICK_QUESTIONS = [
  { icon: GraduationCap, text: "What are the admission requirements?" },
  { icon: BookOpen, text: "Tell me about the courses offered" },
  { icon: Calendar, text: "When is the next session?" },
  { icon: HelpCircle, text: "How do I apply?" },
];

export function VoiceAgentButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [textInput, setTextInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [transcripts, setTranscripts] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
      setIsConnecting(false);
    },
    onMessage: (message: any) => {
      console.log("Voice agent message:", message);
      if (message.type === "user_transcript" && message.user_transcription_event?.user_transcript) {
        setTranscripts(prev => [...prev, { 
          role: "user", 
          text: message.user_transcription_event.user_transcript 
        }]);
      } else if (message.type === "agent_response" && message.agent_response_event?.agent_response) {
        setTranscripts(prev => [...prev, { 
          role: "agent", 
          text: message.agent_response_event.agent_response 
        }]);
      }
    },
    onError: (error) => {
      console.error("Voice agent error:", error);
      setIsConnecting(false);
      toast({
        variant: "destructive",
        title: "Voice Agent Error",
        description: "There was a problem connecting to the voice agent. Please try again.",
      });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts]);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    setTranscripts([]);

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get token from edge function
      const { data, error } = await supabase.functions.invoke("elevenlabs-conversation-token", {
        body: { agent_id: ELEVENLABS_AGENT_ID },
      });

      if (error || !data?.token) {
        throw new Error(error?.message || "Failed to get conversation token");
      }

      // Start the conversation with WebRTC
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });

    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to voice agent.",
      });
    }
  }, [conversation, toast]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const sendTextMessage = useCallback(async (messageOverride?: string) => {
    const messageToSend = messageOverride || textInput.trim();
    if (!messageToSend || isSending) return;

    if (!messageOverride) setTextInput("");
    setIsSending(true);
    setTranscripts(prev => [...prev, { role: "user", text: messageToSend }]);

    try {
      const { data, error } = await supabase.functions.invoke("elevenlabs-text-chat", {
        body: { 
          agent_id: ELEVENLABS_AGENT_ID,
          message: messageToSend,
          conversation_history: transcripts
        },
      });

      if (error) throw new Error(error.message);

      if (data?.response) {
        setTranscripts(prev => [...prev, { role: "agent", text: data.response }]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        variant: "destructive",
        title: "Message Failed",
        description: "Couldn't send your message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  }, [textInput, isSending, transcripts, toast]);

  const handleQuickQuestion = (question: string) => {
    sendTextMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const toggleOpen = () => {
    if (isOpen && conversation.status === "connected") {
      stopConversation();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-24 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={toggleOpen}
          size="lg"
          className={`rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
            conversation.status === "connected"
              ? "bg-accent-green hover:bg-accent-green/90"
              : "bg-accent-gold hover:bg-accent-orange"
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Pulse effect when connected */}
        {conversation.status === "connected" && (
          <span className="absolute inset-0 rounded-full bg-accent-green/30 animate-ping" />
        )}
      </motion.div>

      {/* Voice Agent Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-44 right-8 z-50 w-80 max-w-[calc(100vw-4rem)] bg-background border border-border rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary text-primary-foreground p-4">
              <h3 className="font-heading font-semibold text-lg">DUSOM Assistant</h3>
              <p className="text-sm text-primary-foreground/80">
                Ask about admissions, courses & more
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="px-4 pt-4">
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setMode("voice")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    mode === "voice"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Mic className="h-4 w-4" />
                  Voice
                </button>
                <button
                  onClick={() => setMode("text")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    mode === "text"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Keyboard className="h-4 w-4" />
                  Text
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Status (Voice mode only) */}
              {mode === "voice" && (
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      conversation.status === "connected"
                        ? "bg-accent-green"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <span className="text-muted-foreground">
                    {conversation.status === "connected"
                      ? conversation.isSpeaking
                        ? "Speaking..."
                        : "Listening..."
                      : "Ready to connect"}
                  </span>
                </div>
              )}

              {/* Welcome Message & Quick Questions (when no conversation yet) */}
              {transcripts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-accent-gold/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-foreground mb-1">
                      👋 Welcome to DUSOM!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      I'm here to help you with admissions to Dunamis School of Ministry. 
                      Ask me about requirements, courses, application process, or session dates.
                    </p>
                  </div>
                  
                  {mode === "text" && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Quick questions:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {QUICK_QUESTIONS.map((q, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleQuickQuestion(q.text)}
                            disabled={isSending}
                            className="flex items-center gap-2 p-2 text-left text-xs rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50"
                          >
                            <q.icon className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-foreground">{q.text}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Transcripts / Messages */}
              {transcripts.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2 text-sm">
                  {transcripts.map((t, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg ${
                        t.role === "user"
                          ? "bg-primary/10 text-foreground ml-4"
                          : "bg-accent-gold/10 text-foreground mr-4"
                      }`}
                    >
                      <span className="font-medium text-xs text-muted-foreground block mb-1">
                        {t.role === "user" ? "You" : "Assistant"}
                      </span>
                      {t.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Voice Mode Controls */}
              {mode === "voice" && (
                <>
                  {conversation.status === "disconnected" ? (
                    <Button
                      onClick={startConversation}
                      disabled={isConnecting}
                      className="w-full bg-accent-gold hover:bg-accent-orange text-white"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4" />
                          Start Voice Chat
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={stopConversation}
                      variant="destructive"
                      className="w-full"
                    >
                      <MicOff className="mr-2 h-4 w-4" />
                      End Conversation
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground text-center">
                    {conversation.status === "connected"
                      ? "Speak naturally. I'll respond when you pause."
                      : "Click to speak with our AI admissions assistant"}
                  </p>
                </>
              )}

              {/* Text Mode Controls */}
              {mode === "text" && (
                <>
                  <div className="flex gap-2">
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about admissions..."
                      disabled={isSending}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => sendTextMessage()}
                      disabled={isSending || !textInput.trim()}
                      size="icon"
                      className="bg-accent-gold hover:bg-accent-orange text-white"
                    >
                      {isSending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Type your question about admissions, courses, or requirements
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
