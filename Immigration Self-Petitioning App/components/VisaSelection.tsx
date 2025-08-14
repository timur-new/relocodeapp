import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { CheckCircle, Clock, Users } from "lucide-react"

interface VisaSelectionProps {
  selectedVisa: string | null
  onVisaSelect: (visa: string) => void
  onTabChange: (tab: string) => void
}

export function VisaSelection({ selectedVisa, onVisaSelect, onTabChange }: VisaSelectionProps) {
  const visaTypes = [
    {
      type: "EB-1A",
      title: "Extraordinary Ability",
      description: "For individuals with extraordinary ability in sciences, arts, education, business, or athletics",
      processingTime: "8-16 months",
      requirements: [
        "Must meet 3 out of 10 criteria",
        "Evidence of sustained national or international acclaim",
        "Recognition of achievements in the field"
      ],
      criteria: [
        "Receipt of major international awards",
        "Membership in associations requiring outstanding achievements",
        "Published material about you in major media",
        "Judging the work of others in your field",
        "Original contributions of major significance",
        "Scholarly articles you have authored",
        "Display of work at artistic exhibitions",
        "Leading/critical role in distinguished organizations",
        "High salary compared to others in the field",
        "Commercial success in performing arts"
      ],
      color: "blue"
    },
    {
      type: "EB-2 NIW",
      title: "National Interest Waiver",
      description: "For professionals whose work is in the national interest of the United States",
      processingTime: "12-24 months",
      requirements: [
        "Advanced degree or exceptional ability",
        "Work must be in the national interest",
        "Must satisfy the Matter of Dhanasar test"
      ],
      criteria: [
        "Advanced degree (Master's or higher)",
        "Exceptional ability in sciences, arts, or business",
        "Substantial merit and national importance",
        "Well positioned to advance the proposed endeavor",
        "Beneficial to waive job offer requirement"
      ],
      color: "green"
    },
    {
      type: "O-1",
      title: "Extraordinary Ability (Temporary)",
      description: "Temporary visa for individuals with extraordinary ability or achievement",
      processingTime: "2-4 months",
      requirements: [
        "Must meet 3 out of 8 criteria",
        "Sustained national or international recognition",
        "Temporary nature (renewable)"
      ],
      criteria: [
        "Receipt of major awards or prizes",
        "Membership in associations requiring outstanding achievements",
        "Published material about you",
        "Judging the work of others",
        "Original contributions of major significance",
        "Scholarly articles you have authored",
        "Leading/critical role in distinguished organizations",
        "High salary or remuneration"
      ],
      color: "purple"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Choose Your Visa Type</h1>
        <p className="text-muted-foreground">Select the visa category that best fits your qualifications</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {visaTypes.map((visa) => (
          <Card 
            key={visa.type} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedVisa === visa.type ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onVisaSelect(visa.type)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {visa.type}
                  {selectedVisa === visa.type && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </CardTitle>
                <Badge variant="outline" className={`border-${visa.color}-500 text-${visa.color}-500`}>
                  {visa.type.includes('O-1') ? 'Temporary' : 'Permanent'}
                </Badge>
              </div>
              <CardDescription>{visa.title}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{visa.description}</p>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Processing: {visa.processingTime}</span>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Key Requirements:</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {visa.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Evidence Criteria ({visa.criteria.length}):</h4>
                <div className="text-xs text-muted-foreground max-h-32 overflow-y-auto">
                  {visa.criteria.slice(0, 3).map((criterion, index) => (
                    <div key={index} className="flex items-start gap-1 mb-1">
                      <span className="text-primary">•</span>
                      {criterion}
                    </div>
                  ))}
                  {visa.criteria.length > 3 && (
                    <div className="text-xs text-primary">
                      +{visa.criteria.length - 3} more criteria
                    </div>
                  )}
                </div>
              </div>

              {selectedVisa === visa.type && (
                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    onTabChange('application')
                  }}
                >
                  Start Application
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedVisa && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3>Ready to proceed with {selectedVisa}?</h3>
                <p className="text-sm text-muted-foreground">
                  You can change your selection later if needed
                </p>
              </div>
              <Button onClick={() => onTabChange('application')}>
                Continue to Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}