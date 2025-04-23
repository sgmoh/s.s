import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AISettings } from "@/lib/types";
import { maskApiKey } from "@/lib/utils";
import { AI_MODELS, MESSAGE_STYLES, DEFAULT_AI_KEY } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";

const AISettingsPage = () => {
  const queryClient = useQueryClient();
  const [showApiKey, setShowApiKey] = useState(false);
  
  const { data: aiSettings, isLoading } = useQuery<AISettings>({
    queryKey: ["/api/ai/settings"],
    staleTime: 60000,
  });

  const [settings, setSettings] = useState<AISettings>({
    model: "deepseek-r1-zero",
    temperature: 0.7,
    maxTokens: 150,
    messageStyle: "romantic"
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: AISettings) => {
      const response = await apiRequest("PUT", "/api/ai/settings", newSettings);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai/settings"] });
    }
  });

  // Update local state when data is loaded
  useState(() => {
    if (aiSettings) {
      setSettings(aiSettings);
    }
  });

  const handleSave = () => {
    updateSettingsMutation.mutate(settings);
  };

  const handleReset = () => {
    if (aiSettings) {
      setSettings(aiSettings);
    }
  };

  if (isLoading) {
    return <div>Loading AI settings...</div>;
  }

  return (
    <Card className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">AI Configuration</h2>
        <p className="text-sm text-gray-600 mt-1">Configure your OpenRouter AI settings</p>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">API Key</Label>
          <div className="flex">
            <Input
              type={showApiKey ? "text" : "password"}
              value={maskApiKey(DEFAULT_AI_KEY)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-[#7289DA] focus:border-[#7289DA]"
              readOnly
            />
            <Button
              type="button"
              variant="secondary"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              <span className="material-icons text-sm">{showApiKey ? "visibility_off" : "visibility"}</span>
            </Button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Your key is securely stored and hidden for security</p>
        </div>
        
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">AI Model</Label>
          <Select 
            value={settings.model}
            onValueChange={(value) => setSettings({...settings, model: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Temperature</Label>
            <div className="flex items-center space-x-2">
              <Slider
                value={[settings.temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(value) => setSettings({...settings, temperature: value[0]})}
                className="w-full"
              />
              <span className="text-sm font-medium">{settings.temperature}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Controls creativity (0.0-1.0)</p>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Max Tokens</Label>
            <div className="flex items-center space-x-2">
              <Slider
                value={[settings.maxTokens]}
                min={50}
                max={1000}
                step={50}
                onValueChange={(value) => setSettings({...settings, maxTokens: value[0]})}
                className="w-full"
              />
              <span className="text-sm font-medium">{settings.maxTokens}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Maximum response length</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Playful Message Style</Label>
          <RadioGroup 
            value={settings.messageStyle}
            onValueChange={(value: "romantic" | "funny" | "adventurous") => setSettings({...settings, messageStyle: value})}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {MESSAGE_STYLES.map((style) => (
              <div key={style.value} className="relative">
                <RadioGroupItem 
                  value={style.value}
                  id={style.value}
                  className="peer absolute opacity-0"
                />
                <Label 
                  htmlFor={style.value}
                  className="block p-3 border rounded-md cursor-pointer text-center peer-data-[state=checked]:border-[#7289DA] peer-data-[state=checked]:bg-blue-50"
                >
                  {style.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="mt-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">AI Message Preview</Label>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#7289DA] flex items-center justify-center text-white flex-shrink-0">
                <span className="material-icons text-sm">smart_toy</span>
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-gray-800 mb-1">Love Bot</p>
                <p>Good morning, sunshine! I hope you woke up with a smile, because I'm already thinking about how lucky I am to have you in my life. What's one thing you're looking forward to today?</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="default"
            className="px-4 py-2 bg-[#7289DA] text-white rounded-md hover:bg-blue-600"
            onClick={handleSave}
            disabled={updateSettingsMutation.isPending}
          >
            {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISettingsPage;
