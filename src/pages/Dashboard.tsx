import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  User
} from 'lucide-react';

export default function Dashboard() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!session?.user?.email) return 'U';
    return session.user.email
      .split('@')[0]
      .split('.')
      .map(part => part[0]?.toUpperCase())
      .join('')
      .slice(0, 2);
  };

  // Get user's email or name
  const getUserDisplayName = () => {
    return session?.user?.user_metadata?.full_name || 
           session?.user?.email?.split('@')[0] || 
           'User';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header/Navigation Bar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">ChatV15 Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{getUserDisplayName()}</p>
                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 border-r bg-card hidden md:block">
          <nav className="p-4 space-y-2">
            <Button 
              variant={activeTab === 'overview' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Overview</span>
            </Button>
            <Button 
              variant={activeTab === 'conversations' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('conversations')}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Conversations</span>
            </Button>
            <Button 
              variant={activeTab === 'visitors' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('visitors')}
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Visitors</span>
            </Button>
            <Button 
              variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('profile')}
            >
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Profile</span>
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview" className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              
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
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-bold">User Profile</h2>
              
              <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{getUserDisplayName()}</h3>
                    <p className="text-muted-foreground">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">User ID</h4>
                    <p className="text-sm break-all bg-muted p-2 rounded">{session?.user?.id}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Authentication Method</h4>
                    <p>{session?.user?.app_metadata?.provider || 'Email'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Last Sign In</h4>
                    <p>{new Date(session?.user?.last_sign_in_at || '').toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Account Created</h4>
                    <p>{new Date(session?.user?.created_at || '').toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="conversations">
              <h2 className="text-2xl font-bold mb-6">Conversations</h2>
              <Card className="p-6">
                <p className="text-muted-foreground">No active conversations.</p>
              </Card>
            </TabsContent>

            <TabsContent value="visitors">
              <h2 className="text-2xl font-bold mb-6">Visitors</h2>
              <Card className="p-6">
                <p className="text-muted-foreground">No visitor data available.</p>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <Card className="p-6">
                <p className="text-muted-foreground">Settings will be available soon.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-card">
        <div className="grid grid-cols-5">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2 px-0 h-auto rounded-none"
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs mt-1">Overview</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2 px-0 h-auto rounded-none"
            onClick={() => setActiveTab('conversations')}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Chats</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2 px-0 h-auto rounded-none"
            onClick={() => setActiveTab('visitors')}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Visitors</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2 px-0 h-auto rounded-none"
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-2 px-0 h-auto rounded-none"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs mt-1">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
