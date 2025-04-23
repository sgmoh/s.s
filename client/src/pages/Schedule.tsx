import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { formatTime } from "@/lib/utils";
import { ScheduledMessage } from "@/lib/types";
import { SCHEDULED_MESSAGES } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";

const Schedule = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    type: "Good Morning",
    time: "07:00",
    recipients: "both"
  });

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["/api/schedules"],
    staleTime: 60000,
  });

  const addScheduleMutation = useMutation({
    mutationFn: async (schedule: typeof newSchedule) => {
      const response = await apiRequest("POST", "/api/schedules", schedule);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/schedules"] });
      setIsAddDialogOpen(false);
      setNewSchedule({
        type: "Good Morning",
        time: "07:00",
        recipients: "both"
      });
    }
  });

  const toggleScheduleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/schedules/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/schedules"] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addScheduleMutation.mutate(newSchedule);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Message Schedule</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="px-4 py-2 bg-[#7289DA] text-white rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors">
              <span className="material-icons text-sm">add</span>
              <span>Add Schedule</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Schedule</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message-type" className="text-right">Type</Label>
                  <Input 
                    id="message-type" 
                    className="col-span-3"
                    value={newSchedule.type} 
                    onChange={(e) => setNewSchedule({...newSchedule, type: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time (UK)</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="col-span-3"
                    value={newSchedule.time} 
                    onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipients" className="text-right">Recipients</Label>
                  <Select 
                    onValueChange={(value) => setNewSchedule({...newSchedule, recipients: value})} 
                    defaultValue={newSchedule.recipients}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="husband">Husband</SelectItem>
                      <SelectItem value="wife">Wife</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={addScheduleMutation.isPending}>
                  {addScheduleMutation.isPending ? "Adding..." : "Add Schedule"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardContent className="p-6">
          {isLoading ? (
            <p>Loading schedules...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (UK)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(schedules || SCHEDULED_MESSAGES).map((schedule: ScheduledMessage) => (
                    <tr key={schedule.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{schedule.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatTime(schedule.time)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{schedule.recipients}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          schedule.status === 'active' 
                            ? 'bg-[#43B581] bg-opacity-10 text-[#43B581]' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {schedule.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <Button 
                          variant="link" 
                          className="text-[#7289DA] hover:text-blue-700"
                          onClick={() => toggleScheduleStatus.mutate({ 
                            id: schedule.id, 
                            status: schedule.status === 'active' ? 'paused' : 'active' 
                          })}
                        >
                          {schedule.status === 'active' ? 'Pause' : 'Activate'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Schedule;
