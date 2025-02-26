
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from './ui/sidebar';
import { MessageSquare, Settings, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/conversations">
                      <MessageSquare className="w-4 h-4" />
                      <span>Conversations</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/visitors">
                      <Users className="w-4 h-4" />
                      <span>Visitors</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/settings">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 bg-background">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
