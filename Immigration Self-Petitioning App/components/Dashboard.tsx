import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CheckCircle, Clock, FileText, AlertCircle } from "lucide-react"

interface DashboardProps {
  onTabChange: (tab: string) => void
}

export function Dashboard({ onTabChange }: DashboardProps) {
  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    selectedVisa: "EB-1A",
    progress: 65,
    documentsUploaded: 8,
    totalDocuments: 12,
    criteriaSelected: 6,
    totalCriteria: 10
  }

  const recentActivity = [
    { action: "Uploaded CV", date: "2 hours ago", status: "completed" },
    { action: "Selected 3 additional criteria", date: "1 day ago", status: "completed" },
    { action: "Updated personal information", date: "3 days ago", status: "completed" },
    { action: "Started EB-1A application", date: "1 week ago", status: "completed" }
  ]

  const nextSteps = [
    { task: "Upload recommendation letters", priority: "high" },
    { task: "Complete publication evidence", priority: "medium" },
    { task: "Review application before submission", priority: "low" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Welcome back, {mockUser.name}</h1>
        <p className="text-muted-foreground">Here's your application progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Selected Visa</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.selectedVisa}</div>
            <p className="text-xs text-muted-foreground">
              Extraordinary Ability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Overall Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.progress}%</div>
            <Progress value={mockUser.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.documentsUploaded}/{mockUser.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Documents uploaded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Criteria Met</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.criteriaSelected}/{mockUser.totalCriteria}</div>
            <p className="text-xs text-muted-foreground">
              Evidence criteria
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest application updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Actions needed to complete your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{step.task}</span>
                </div>
                <Badge variant={step.priority === 'high' ? 'destructive' : step.priority === 'medium' ? 'default' : 'secondary'}>
                  {step.priority}
                </Badge>
              </div>
            ))}
            <Button 
              className="w-full mt-4" 
              onClick={() => onTabChange('application')}
            >
              Continue Application
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}