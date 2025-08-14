import { useState } from "react"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { Dashboard } from "./components/Dashboard"
import { VisaSelection } from "./components/VisaSelection"
import { Application } from "./components/Application"
import { Documents } from "./components/Documents"
import { Instructions } from "./components/Instructions"
import { Profile } from "./components/Profile"
import { Card, CardContent } from "./components/ui/card"
import { Settings } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedVisa, setSelectedVisa] = useState<string>("EB-1A")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleVisaSelect = (visa: string) => {
    setSelectedVisa(visa)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={handleTabChange} />
      case "visa-selection":
        return (
          <VisaSelection 
            selectedVisa={selectedVisa}
            onVisaSelect={handleVisaSelect}
            onTabChange={handleTabChange}
          />
        )
      case "application":
        return (
          <Application 
            selectedVisa={selectedVisa}
            onTabChange={handleTabChange}
          />
        )
      case "documents":
        return <Documents />
      case "instructions":
        return <Instructions />
      case "profile":
        return <Profile />
      case "settings":
        return (
          <div className="p-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h2>Settings</h2>
                  <p className="text-muted-foreground">
                    Settings panel coming soon. Manage app preferences, notifications, and account settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <Dashboard onTabChange={handleTabChange} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  )
}