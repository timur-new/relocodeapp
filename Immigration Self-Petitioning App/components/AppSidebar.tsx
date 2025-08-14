import { Calendar, FileText, Home, Settings, User, CheckCircle, BookOpen, Upload } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      key: "dashboard"
    },
    {
      title: "Visa Selection",
      icon: CheckCircle,
      key: "visa-selection"
    },
    {
      title: "My Application",
      icon: FileText,
      key: "application"
    },
    {
      title: "Documents",
      icon: Upload,
      key: "documents"
    },
    {
      title: "Instructions",
      icon: BookOpen,
      key: "instructions"
    },
    {
      title: "Profile",
      icon: User,
      key: "profile"
    },
    {
      title: "Settings",
      icon: Settings,
      key: "settings"
    }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Immigration Self-Petitioning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.key)}
                    isActive={activeTab === item.key}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}