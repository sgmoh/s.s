import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPreference } from "@/lib/types";
import { HUSBAND_ID, WIFE_ID } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";

const Users = () => {
  const queryClient = useQueryClient();
  
  const [husbandPrefs, setHusbandPrefs] = useState<UserPreference>({
    id: HUSBAND_ID,
    name: "husband",
    preferences: {
      goodMorning: true,
      specialOccasions: true,
      reminders: false,
      messageStyle: "romantic"
    }
  });
  
  const [wifePrefs, setWifePrefs] = useState<UserPreference>({
    id: WIFE_ID,
    name: "wife",
    preferences: {
      goodMorning: true,
      specialOccasions: true,
      reminders: true,
      messageStyle: "humorous"
    }
  });

  const { data: userPrefs, isLoading } = useQuery({
    queryKey: ["/api/users/preferences"],
    staleTime: 60000,
    onSuccess: (data) => {
      if (data) {
        const husband = data.find((user: UserPreference) => user.name === "husband");
        const wife = data.find((user: UserPreference) => user.name === "wife");
        
        if (husband) setHusbandPrefs(husband);
        if (wife) setWifePrefs(wife);
      }
    }
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (prefs: UserPreference) => {
      const response = await apiRequest("PUT", `/api/users/${prefs.id}/preferences`, prefs.preferences);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/preferences"] });
    }
  });

  const handleSaveHusbandPrefs = () => {
    updatePreferencesMutation.mutate(husbandPrefs);
  };

  const handleSaveWifePrefs = () => {
    updatePreferencesMutation.mutate(wifePrefs);
  };

  if (isLoading) {
    return <div>Loading user preferences...</div>;
  }

  return (
    <Card className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">User Configuration</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your users and their settings</p>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Husband User Card */}
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="bg-[#7289DA] text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white text-[#7289DA] flex items-center justify-center">
                  <span className="material-icons">person</span>
                </div>
                <div>
                  <h3 className="font-semibold">Husband</h3>
                  <p className="text-xs opacity-80">ID: {HUSBAND_ID.substring(0, 8)}••••••••••</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="husband-gm"
                      checked={husbandPrefs.preferences.goodMorning}
                      onCheckedChange={(checked) => setHusbandPrefs({
                        ...husbandPrefs,
                        preferences: {
                          ...husbandPrefs.preferences,
                          goodMorning: checked as boolean
                        }
                      })}
                      className="h-4 w-4 text-[#7289DA] focus:ring-[#7289DA] border-gray-300 rounded"
                    />
                    <Label htmlFor="husband-gm" className="ml-2 block text-sm text-gray-700">Good Morning Messages</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="husband-special"
                      checked={husbandPrefs.preferences.specialOccasions}
                      onCheckedChange={(checked) => setHusbandPrefs({
                        ...husbandPrefs,
                        preferences: {
                          ...husbandPrefs.preferences,
                          specialOccasions: checked as boolean
                        }
                      })}
                      className="h-4 w-4 text-[#7289DA] focus:ring-[#7289DA] border-gray-300 rounded"
                    />
                    <Label htmlFor="husband-special" className="ml-2 block text-sm text-gray-700">Special Occasions</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="husband-reminders"
                      checked={husbandPrefs.preferences.reminders}
                      onCheckedChange={(checked) => setHusbandPrefs({
                        ...husbandPrefs,
                        preferences: {
                          ...husbandPrefs.preferences,
                          reminders: checked as boolean
                        }
                      })}
                      className="h-4 w-4 text-[#7289DA] focus:ring-[#7289DA] border-gray-300 rounded"
                    />
                    <Label htmlFor="husband-reminders" className="ml-2 block text-sm text-gray-700">Reminders</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Message Style Preference</Label>
                <Select
                  value={husbandPrefs.preferences.messageStyle}
                  onValueChange={(value: "romantic" | "humorous" | "motivational") => setHusbandPrefs({
                    ...husbandPrefs,
                    preferences: {
                      ...husbandPrefs.preferences,
                      messageStyle: value
                    }
                  })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="motivational">Motivational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  className="px-4 py-2 bg-[#7289DA] text-white rounded-md hover:bg-blue-600 text-sm"
                  onClick={handleSaveHusbandPrefs}
                  disabled={updatePreferencesMutation.isPending}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
          
          {/* Wife User Card */}
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="bg-[#FF6B6B] text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white text-[#FF6B6B] flex items-center justify-center">
                  <span className="material-icons">person</span>
                </div>
                <div>
                  <h3 className="font-semibold">Wife</h3>
                  <p className="text-xs opacity-80">ID: {WIFE_ID.substring(0, 8)}••••••••••</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="wife-gm"
                      checked={wifePrefs.preferences.goodMorning}
                      onCheckedChange={(checked) => setWifePrefs({
                        ...wifePrefs,
                        preferences: {
                          ...wifePrefs.preferences,
                          goodMorning: checked as boolean
                        }
                      })}
                      className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded"
                    />
                    <Label htmlFor="wife-gm" className="ml-2 block text-sm text-gray-700">Good Morning Messages</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="wife-special"
                      checked={wifePrefs.preferences.specialOccasions}
                      onCheckedChange={(checked) => setWifePrefs({
                        ...wifePrefs,
                        preferences: {
                          ...wifePrefs.preferences,
                          specialOccasions: checked as boolean
                        }
                      })}
                      className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded"
                    />
                    <Label htmlFor="wife-special" className="ml-2 block text-sm text-gray-700">Special Occasions</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="wife-reminders"
                      checked={wifePrefs.preferences.reminders}
                      onCheckedChange={(checked) => setWifePrefs({
                        ...wifePrefs,
                        preferences: {
                          ...wifePrefs.preferences,
                          reminders: checked as boolean
                        }
                      })}
                      className="h-4 w-4 text-[#FF6B6B] focus:ring-[#FF6B6B] border-gray-300 rounded"
                    />
                    <Label htmlFor="wife-reminders" className="ml-2 block text-sm text-gray-700">Reminders</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Message Style Preference</Label>
                <Select
                  value={wifePrefs.preferences.messageStyle}
                  onValueChange={(value: "romantic" | "humorous" | "motivational") => setWifePrefs({
                    ...wifePrefs,
                    preferences: {
                      ...wifePrefs.preferences,
                      messageStyle: value
                    }
                  })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="motivational">Motivational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-red-500 text-sm"
                  onClick={handleSaveWifePrefs}
                  disabled={updatePreferencesMutation.isPending}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Users;
