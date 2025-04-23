import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AI_MODELS, MESSAGE_STYLES } from "@/lib/constants";

const Setup = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    discordToken: "",
    husbandId: "",
    wifeId: "",
    openAiKey: "",
    aiModel: "gpt-4o",
    messageStyle: "romantic",
    customTruths: "",
    customDares: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save the configuration
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      toast({
        title: "Setup complete!",
        description: "Your Love Bot has been configured successfully.",
      });

      // Redirect to dashboard after successful setup
      window.location.href = "/";
    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: "Setup failed",
        description: "There was an error setting up your bot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="love-container">
      {/* Header */}
      <div className="relative mb-8 text-center">
        <h1 className="love-gradient-text text-4xl md:text-5xl font-bold mb-4">
          Discord Love Bot Setup
        </h1>
        <p className="text-pink-100 max-w-2xl mx-auto">
          Configure your personal Love Bot in just a few steps to enhance your relationship through Discord.
        </p>
      </div>

      {/* Setup Card */}
      <div className="love-card max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`w-1/4 h-2 mx-1 rounded-full ${s <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-pink-100 mb-2">
            {step === 1 && "Discord Setup"}
            {step === 2 && "User Configuration"}
            {step === 3 && "AI Settings"}
            {step === 4 && "Final Touches"}
          </h2>
          <p className="text-purple-200 mb-6">
            {step === 1 && "Connect your Discord bot to enable all features."}
            {step === 2 && "Set up the couple's Discord user IDs."}
            {step === 3 && "Configure the AI settings for personalized messages."}
            {step === 4 && "Add custom content for Truth or Dare games."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Discord Setup */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="discordToken" className="text-pink-100">Discord Bot Token</Label>
                <Input
                  id="discordToken"
                  name="discordToken"
                  placeholder="Enter your Discord bot token"
                  value={config.discordToken}
                  onChange={handleChange}
                  className="bg-black/50 border-purple-500/30 text-white"
                  required
                />
                <p className="text-xs text-purple-300">
                  Get this from the <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="underline text-pink-400">Discord Developer Portal</a>.
                  Create a new application, add a bot, and copy the token.
                </p>
              </div>

              <div className="space-y-2 mt-8">
                <h3 className="text-lg font-semibold text-pink-100">Bot Setup Instructions:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-purple-200">
                  <li>Go to the <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="underline text-pink-400">Discord Developer Portal</a></li>
                  <li>Create a "New Application" and give it a name</li>
                  <li>Go to the "Bot" tab and click "Add Bot"</li>
                  <li>Under the TOKEN section, click "Reset Token" and then "Copy"</li>
                  <li>Paste the token in the field above</li>
                  <li>In the "OAuth2" → "URL Generator" tab, select scopes: "bot" and "applications.commands"</li>
                  <li>For bot permissions, select: "Send Messages", "Embed Links", and "Use Slash Commands"</li>
                  <li>Copy the generated URL and open it in a new tab to invite the bot to your server</li>
                </ol>
              </div>
            </div>
          )}

          {/* Step 2: User Configuration */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="husbandId" className="text-pink-100">Husband's Discord ID</Label>
                <Input
                  id="husbandId"
                  name="husbandId"
                  placeholder="Enter husband's Discord ID"
                  value={config.husbandId}
                  onChange={handleChange}
                  className="bg-black/50 border-purple-500/30 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wifeId" className="text-pink-100">Wife's Discord ID</Label>
                <Input
                  id="wifeId"
                  name="wifeId"
                  placeholder="Enter wife's Discord ID"
                  value={config.wifeId}
                  onChange={handleChange}
                  className="bg-black/50 border-purple-500/30 text-white"
                  required
                />
              </div>

              <div className="space-y-2 mt-8">
                <h3 className="text-lg font-semibold text-pink-100">How to find Discord IDs:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-purple-200">
                  <li>Open Discord and go to Settings</li>
                  <li>Go to "Advanced" and enable "Developer Mode"</li>
                  <li>Right-click on each user's name and select "Copy ID"</li>
                  <li>Paste the IDs in the fields above</li>
                </ol>
              </div>
            </div>
          )}

          {/* Step 3: AI Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openAiKey" className="text-pink-100">OpenAI API Key</Label>
                <Input
                  id="openAiKey"
                  name="openAiKey"
                  placeholder="Enter your OpenAI API key"
                  value={config.openAiKey}
                  onChange={handleChange}
                  className="bg-black/50 border-purple-500/30 text-white"
                  required
                />
                <p className="text-xs text-purple-300">
                  Get this from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline text-pink-400">OpenAI Dashboard</a>.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aiModel" className="text-pink-100">AI Model</Label>
                <Select 
                  value={config.aiModel} 
                  onValueChange={(value) => handleSelectChange("aiModel", value)}
                >
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-500/30 text-white">
                    {AI_MODELS.map(model => (
                      <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageStyle" className="text-pink-100">Default Message Style</Label>
                <Select 
                  value={config.messageStyle} 
                  onValueChange={(value) => handleSelectChange("messageStyle", value)}
                >
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select message style" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-500/30 text-white">
                    {MESSAGE_STYLES.map(style => (
                      <SelectItem key={style.id} value={style.id}>{style.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Final Touches */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customTruths" className="text-pink-100">Custom Truth Questions (Optional)</Label>
                <Textarea
                  id="customTruths"
                  name="customTruths"
                  placeholder="Enter custom truth questions, one per line"
                  value={config.customTruths}
                  onChange={handleChange}
                  className="bg-black/50 border-purple-500/30 text-white min-h-[120px]"
                />
                <p className="text-xs text-purple-300">
                  Add your own truth questions, one per line. These will be added to the default questions.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDares" className="text-pink-100">Custom Dare Challenges (Optional)</Label>
                <Textarea
                  id="customDares"
                  name="customDares"
                  placeholder="Enter custom dare challenges, one per line"
                  value={config.customDares}
                  onChange={handleChange}
                  className="bg-black/50 border-purple-500/30 text-white min-h-[120px]"
                />
                <p className="text-xs text-purple-300">
                  Add your own dare challenges, one per line. These will be added to the default challenges.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button 
                type="button" 
                onClick={prevStep}
                className="love-btn"
                disabled={loading}
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="love-btn"
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="love-btn"
                disabled={loading}
              >
                {loading ? "Setting Up..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setup;