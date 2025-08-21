import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { CheckCircle, Upload, FileText, AlertTriangle, Info } from "lucide-react"
import { useMemo, useState } from "react"
import { useAdminMaterials } from "./AdminMaterialsContext"

interface ApplicationProps {
  selectedVisa: string
  onTabChange: (tab: string) => void
}

export function Application({ selectedVisa, onTabChange }: ApplicationProps) {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([
    "major-awards", "media-coverage", "judging"
  ])
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({})
  const [uploadsByCriterion, setUploadsByCriterion] = useState<Record<string, string[]>>({})
  const { examplesByVisa, faqsByVisa, videosByVisa } = useAdminMaterials()

  const visaCriteria = {
    "EB-1A": [
      {
        id: "major-awards",
        title: "Receipt of awards or prizes for excellence",
        description: "Major national or international prizes i.e. Best App, Outstanding Entrepreneur, Innovation of the Year",
        required: false,
        strength: "high"
      },
      {
        id: "membership",
        title: "Membership in associations requiring outstanding achievements",
        description: "Membership that requires outstanding achievements as judged by experts",
        required: false,
        strength: "medium"
      },
      {
        id: "media-coverage",
        title: "Published material about you in major media",
        description: "Articles, books, or other published material about your work",
        required: false,
        strength: "high"
      },
      {
        id: "judging",
        title: "Judging the work of others in your field",
        description: "Serving as a judge or reviewer of others' work",
        required: false,
        strength: "medium"
      },
      {
        id: "original-contributions",
        title: "Original contributions of major significance",
        description: "Patents, innovations, or original research with significant impact",
        required: false,
        strength: "high"
      },
      {
        id: "scholarly-articles",
        title: "Scholarly articles you have authored",
        description: "Publications in professional journals or major trade publications",
        required: false,
        strength: "medium"
      },
      {
        id: "artistic-exhibitions",
        title: "Display of work at artistic exhibitions",
        description: "Solo or group exhibitions in galleries or museums",
        required: false,
        strength: "medium"
      },
      {
        id: "leading-role",
        title: "Leading or critical role in distinguished organizations",
        description: "Leadership position in organizations with distinguished reputation",
        required: false,
        strength: "medium"
      },
      {
        id: "high-salary",
        title: "High salary compared to others in the field",
        description: "Evidence of high remuneration relative to others in your field",
        required: false,
        strength: "low"
      },
      {
        id: "commercial-success",
        title: "Commercial success in performing arts",
        description: "Box office receipts, record sales, or similar commercial indicators",
        required: false,
        strength: "medium"
      }
    ],
    "EB-2 NIW": [
      {
        id: "advanced-degree",
        title: "Advanced degree",
        description: "Master's degree or higher, or bachelor's plus 5 years experience",
        required: true,
        strength: "high"
      },
      {
        id: "exceptional-ability",
        title: "Exceptional ability",
        description: "Degree of expertise significantly above that ordinarily encountered",
        required: false,
        strength: "high"
      },
      {
        id: "substantial-merit",
        title: "Substantial merit and national importance",
        description: "Work has substantial merit and national importance to the US",
        required: true,
        strength: "high"
      },
      {
        id: "well-positioned",
        title: "Well positioned to advance the endeavor",
        description: "You are well positioned to advance the proposed endeavor",
        required: true,
        strength: "high"
      },
      {
        id: "beneficial",
        title: "Beneficial to waive job offer requirement",
        description: "It would be beneficial to the US to waive the job offer requirement",
        required: true,
        strength: "high"
      }
    ],
    "O-1": [
      {
        id: "major-awards-o1",
        title: "Receipt of major awards or prizes",
        description: "Major awards or prizes for excellence in your field",
        required: false,
        strength: "high"
      },
      {
        id: "membership-o1",
        title: "Membership in associations requiring outstanding achievements",
        description: "Membership requiring outstanding achievements as judged by experts",
        required: false,
        strength: "medium"
      },
      {
        id: "published-material-o1",
        title: "Published material about you",
        description: "Articles or other published material about you and your work",
        required: false,
        strength: "high"
      },
      {
        id: "judging-o1",
        title: "Judging the work of others",
        description: "Participation as a judge of others' work in your field",
        required: false,
        strength: "medium"
      },
      {
        id: "original-contributions-o1",
        title: "Original contributions of major significance",
        description: "Original scientific, scholarly, or business-related contributions",
        required: false,
        strength: "high"
      },
      {
        id: "scholarly-articles-o1",
        title: "Scholarly articles you have authored",
        description: "Publications in professional journals or major trade publications",
        required: false,
        strength: "medium"
      },
      {
        id: "leading-role-o1",
        title: "Leading or critical role in distinguished organizations",
        description: "Leadership position in organizations with distinguished reputation",
        required: false,
        strength: "medium"
      },
      {
        id: "high-remuneration",
        title: "High salary or remuneration",
        description: "Evidence of high salary or other remuneration for your services",
        required: false,
        strength: "low"
      }
    ]
  }

  const currentCriteria = visaCriteria[selectedVisa as keyof typeof visaCriteria] || []
  const requiredCriteria = currentCriteria.filter(c => c.required)
  const optionalCriteria = currentCriteria.filter(c => !c.required)
  const minRequired = selectedVisa === "EB-1A" ? 3 : selectedVisa === "O-1" ? 3 : requiredCriteria.length
  const selectedOptional = selectedCriteria.filter(id => 
    optionalCriteria.some(c => c.id === id)
  ).length
  const selectedRequired = selectedCriteria.filter(id => 
    requiredCriteria.some(c => c.id === id)
  ).length

  const handleCriteriaToggle = (criteriaId: string) => {
    setSelectedCriteria(prev => 
      prev.includes(criteriaId) 
        ? prev.filter(id => id !== criteriaId)
        : [...prev, criteriaId]
    )
  }

  const progressPercentage = Math.min(
    (selectedOptional + selectedRequired) / (minRequired + requiredCriteria.length) * 100,
    100
  )

  const canProceed = selectedVisa === "EB-2 NIW" 
    ? selectedRequired === requiredCriteria.length
    : selectedOptional >= minRequired

  const criterionDetails: Record<string, {
    requirements: string[]
    documents: string[]
    info: string
  }> = useMemo(() => ({
    "major-awards": {
      requirements: [
        "Prize recognizes excellence in the field",
        "Awarding body is credible with published selection criteria",
      ],
      documents: ["Award certificate", "Photo of the award", "Official announcement/press release", "Media coverage (if any)"],
      info: "Awards can be industry-level (e.g., Best App, Innovation of the Year) if well documented.",
    },
    "media-coverage": {
      requirements: ["Independent third-party coverage", "Focus is on your achievements"],
      documents: ["PDFs or screenshots", "Permalinks/archives", "Translations if not in English"],
      info: "Prefer reputable outlets; add context on reach/circulation.",
    },
    "judging": {
      requirements: ["Selective invitation or role", "Related to your field"],
      documents: ["Invitation letters", "Event overview", "Listing showing you as judge"],
      info: "Hackathons, conferences, and peer review panels can qualify.",
    },
  }), [])

  const handleToggleExpand = (criteriaId: string) => {
    setExpandedCriteria(prev => ({ ...prev, [criteriaId]: !prev[criteriaId] }))
  }

  const handleMockUpload = (criteriaId: string) => {
    const nextName = `Evidence_${(uploadsByCriterion[criteriaId]?.length ?? 0) + 1}.pdf`
    setUploadsByCriterion(prev => ({
      ...prev,
      [criteriaId]: [...(prev[criteriaId] ?? []), nextName]
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{selectedVisa} Application</h1>
          <p className="text-muted-foreground">Select the criteria that apply to your case</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {selectedVisa}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Criteria Selected</span>
            <span className="font-medium">
              {selectedCriteria.length} / {currentCriteria.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
          
          {selectedVisa !== "EB-2 NIW" && (
            <div className="flex items-center gap-2">
              {canProceed ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              )}
              <span className="text-sm">
                {canProceed 
                  ? `You meet the minimum requirement (${minRequired} criteria)`
                  : `Need ${minRequired - selectedOptional} more criteria (minimum ${minRequired} required)`
                }
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="criteria" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="criteria">Evidence Criteria</TabsTrigger>
          <TabsTrigger value="documents">Required Documents</TabsTrigger>
          <TabsTrigger value="review">Review & Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="criteria" className="space-y-4">
          {requiredCriteria.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Required Criteria</CardTitle>
                <CardDescription>These criteria are mandatory for {selectedVisa}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {requiredCriteria.map((criteria) => (
                  <div key={criteria.id} className="flex flex-col gap-2 p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={criteria.id}
                        checked={selectedCriteria.includes(criteria.id)}
                        onCheckedChange={() => handleCriteriaToggle(criteria.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <label htmlFor={criteria.id} className="font-medium cursor-pointer">
                            {criteria.title}
                          </label>
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                          <Badge variant={criteria.strength === 'high' ? 'default' : 'secondary'} className="text-xs">
                            {criteria.strength} strength
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleToggleExpand(criteria.id)}>
                            <Info className="h-3 w-3 mr-1" />
                            {expandedCriteria[criteria.id] ? 'Hide details' : 'View details'}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{criteria.description}</p>
                      </div>
                    </div>
                    {expandedCriteria[criteria.id] && (
                      <div className="rounded-md bg-muted/40 p-3 space-y-3">
                        <div>
                          <h5 className="text-sm font-medium mb-1">Requirements</h5>
                          <ul className="text-sm text-muted-foreground list-disc pl-4">
                            {(criterionDetails[criteria.id]?.requirements ?? ["See Instructions tab for details"]).map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">Documents Necessary</h5>
                          <ul className="text-sm text-muted-foreground list-disc pl-4">
                            {(criterionDetails[criteria.id]?.documents ?? ["Attach relevant proof"]).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">Other Information</h5>
                          <p className="text-sm text-muted-foreground">{criterionDetails[criteria.id]?.info ?? 'Refer to the Instructions > Criteria Guide for more.'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {optionalCriteria.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evidence Criteria</CardTitle>
                <CardDescription>
                  Select at least {minRequired} criteria that apply to your case
                  {selectedVisa !== "EB-2 NIW" && ` (${selectedOptional}/${minRequired} selected)`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {optionalCriteria.map((criteria) => (
                  <div key={criteria.id} className="flex flex-col gap-2 p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={criteria.id}
                        checked={selectedCriteria.includes(criteria.id)}
                        onCheckedChange={() => handleCriteriaToggle(criteria.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <label htmlFor={criteria.id} className="font-medium cursor-pointer">
                            {criteria.title}
                          </label>
                          <Badge variant={criteria.strength === 'high' ? 'default' : criteria.strength === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                            {criteria.strength} strength
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleToggleExpand(criteria.id)}>
                            <Info className="h-3 w-3 mr-1" />
                            {expandedCriteria[criteria.id] ? 'Hide details' : 'View details'}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{criteria.description}</p>
                      </div>
                    </div>
                    {expandedCriteria[criteria.id] && (
                      <div className="rounded-md bg-muted/40 p-3 space-y-3">
                        <div>
                          <h5 className="text-sm font-medium mb-1">Requirements</h5>
                          <ul className="text-sm text-muted-foreground list-disc pl-4">
                            {(criterionDetails[criteria.id]?.requirements ?? ["See Instructions tab for details"]).map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">Documents Necessary</h5>
                          <ul className="text-sm text-muted-foreground list-disc pl-4">
                            {(criterionDetails[criteria.id]?.documents ?? ["Attach relevant proof"]).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">Other Information</h5>
                          <p className="text-sm text-muted-foreground">{criterionDetails[criteria.id]?.info ?? 'Refer to the Instructions > Criteria Guide for more.'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload by Selected Criteria</CardTitle>
              <CardDescription>Provide documents specific to each criterion you selected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCriteria.map((id) => {
                const details = criterionDetails[id]
                return (
                  <div key={id} className="p-3 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{currentCriteria.find(c => c.id === id)?.title ?? id}</div>
                      <Button size="sm" onClick={() => handleMockUpload(id)}>
                        <Upload className="h-4 w-4 mr-1" /> Upload
                      </Button>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium mb-1">Suggested documents:</h5>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        {(details?.documents ?? ["Attach relevant proof"]).map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    {(uploadsByCriterion[id] ?? []).length > 0 && (
                      <div className="space-y-1">
                        <h5 className="text-xs font-medium">Uploaded:</h5>
                        <ul className="text-xs text-muted-foreground list-disc pl-4">
                          {(uploadsByCriterion[id] ?? []).map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Examples of completed criteria</CardTitle>
              <CardDescription>Admin-provided samples to guide your preparation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(examplesByVisa[selectedVisa as keyof typeof examplesByVisa] ?? []).map((ex, i) => (
                <div key={i} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{ex.title}</div>
                    {ex.description && <div className="text-xs text-muted-foreground">{ex.description}</div>}
                  </div>
                  {ex.url && (
                    <a className="text-xs text-primary underline" href={ex.url} target="_blank" rel="noreferrer">Open</a>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Frequently asked questions for {selectedVisa}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(faqsByVisa[selectedVisa as keyof typeof faqsByVisa] ?? []).map((faq, i) => (
                <div key={i} className="p-3 border rounded">
                  <div className="text-sm font-medium">{faq.question}</div>
                  <div className="text-xs text-muted-foreground">{faq.answer}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Video to help you</CardTitle>
              <CardDescription>Tutorials and walkthroughs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(videosByVisa[selectedVisa as keyof typeof videosByVisa] ?? []).map((v, i) => (
                <div key={i} className="p-3 border rounded flex items-center justify-between">
                  <div className="text-sm font-medium">{v.title}</div>
                  <a className="text-xs text-primary underline" href={v.url} target="_blank" rel="noreferrer">Watch</a>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Review</CardTitle>
              <CardDescription>Review your application before submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4>Selected Criteria ({selectedCriteria.length})</h4>
                <div className="grid gap-2">
                  {selectedCriteria.map(id => {
                    const criteria = currentCriteria.find(c => c.id === id)
                    return criteria ? (
                      <div key={id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{criteria.title}</span>
                        <Badge variant={criteria.required ? 'destructive' : 'default'} className="text-xs">
                          {criteria.required ? 'Required' : criteria.strength}
                        </Badge>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
              
              {canProceed ? (
                <Button className="w-full" size="lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              ) : (
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-orange-700">
                    Please select the required criteria before submitting
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}