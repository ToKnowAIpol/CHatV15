
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ChatWidget } from '@/components/ChatWidget';

const Index = () => {
  const [aiEnabled, setAiEnabled] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="ai-mode"
              checked={aiEnabled}
              onCheckedChange={setAiEnabled}
            />
            <Label htmlFor="ai-mode">AI RESPONSE</Label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-medium mb-2">Active Conversations</h3>
            <p className="text-3xl font-semibold">3</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium mb-2">Total Visitors</h3>
            <p className="text-3xl font-semibold">124</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium mb-2">Response Time</h3>
            <p className="text-3xl font-semibold">2m</p>
          </Card>
        </div>
      </div>

      {/* Preview of the chat widget */}
      <ChatWidget />
    </DashboardLayout>
  );
};

export default Index;
