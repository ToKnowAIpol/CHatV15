import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
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

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">User Information</h2>
          {session ? (
            <div>
              <p><strong>User ID:</strong> {session.user.id}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Last Sign In:</strong> {new Date(session.user.last_sign_in_at || '').toLocaleString()}</p>
            </div>
          ) : (
            <p>Not signed in</p>
          )}
        </Card>
      </div>
    </div>
  );
}
