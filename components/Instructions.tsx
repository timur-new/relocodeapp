import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { BookOpen, AlertTriangle, CheckCircle, Info } from "lucide-react"

export function Instructions() {
  const instructionData = {
    "EB-1A": {
      overview: "The EB-1A category is for individuals with extraordinary ability in the sciences, arts, education, business, or athletics. You must demonstrate sustained national or international acclaim and recognition for achievements in the field.",
      requirements: "You must meet at least 3 of the 10 criteria listed below, OR provide evidence of a one-time achievement (major international award).",
      tips: [
        "Quality over quantity - focus on strong evidence for 3-4 criteria rather than weak evidence for many",
        "Provide context for achievements - explain why they demonstrate extraordinary ability",
        "Use expert letters to connect evidence to the legal standards",
        "Show progression and sustained acclaim over time"
      ],
      criteria: [
        {
          title: "Receipt of major internationally recognized awards",
          description: "Evidence of receipt of major internationally recognized awards or prizes for excellence",
          examples: ["Nobel Prize", "Pulitzer Prize", "Olympic medals", "Grammy Awards", "Academy Awards"],
          evidenceTypes: ["Award certificates", "Official announcements", "Media coverage"],
          tips: "This is the strongest possible evidence. If you have this, you may not need to prove other criteria."
        },
        {
          title: "Membership in associations requiring outstanding achievements", 
          description: "Membership in associations that require outstanding achievements judged by experts",
          examples: ["Fellows of professional societies", "National academies", "Exclusive professional organizations"],
          evidenceTypes: ["Membership certificates", "Selection criteria", "Letters explaining exclusivity"],
          tips: "Focus on highly selective memberships, not just paying dues to join an organization."
        }
      ]
    },
    "EB-2 NIW": {
      overview: "The National Interest Waiver allows certain professionals to obtain permanent residence without a job offer if their work is in the national interest of the United States.",
      requirements: "You must have an advanced degree OR exceptional ability, AND satisfy the three-prong test from Matter of Dhanasar.",
      tips: [
        "Clearly define your proposed endeavor and its national importance",
        "Show how you are uniquely positioned to advance this work",
        "Demonstrate why waiving the job offer requirement benefits the US",
        "Use expert letters to support each prong of the test"
      ],
      criteria: [
        {
          title: "Advanced degree or exceptional ability",
          description: "Master's degree or higher, OR exceptional ability in sciences, arts, or business",
          examples: ["Master's/PhD", "10+ years experience", "Professional licenses", "Industry recognition"],
          evidenceTypes: ["Degrees", "Transcripts", "Experience letters", "Salary evidence", "Awards"],
          tips: "Bachelor's + 5 years experience can substitute for advanced degree."
        },
        {
          title: "Substantial merit and national importance",
          description: "Your proposed endeavor has substantial merit and national importance to the US",
          examples: ["Medical research", "Renewable energy", "AI/technology", "Economic development"],
          evidenceTypes: ["Research publications", "Government priorities", "Expert letters", "Policy documents"],
          tips: "Connect your work to broader national priorities and challenges."
        }
      ]
    },
    "O-1": {
      overview: "The O-1 visa is for individuals with extraordinary ability or achievement in their field. It's a temporary visa that can be renewed indefinitely.",
      requirements: "You must meet at least 3 of the 8 criteria for extraordinary ability, OR provide evidence of a major award.",
      tips: [
        "O-1 has slightly lower standards than EB-1A",
        "Can be a stepping stone to EB-1A permanent residence",
        "Requires a US sponsor/employer or agent",
        "Must demonstrate temporary nature of stay"
      ],
      criteria: [
        {
          title: "Receipt of major awards or prizes",
          description: "Major awards or prizes for excellence in your field of endeavor",
          examples: ["Industry awards", "Academic honors", "Professional recognition", "Government awards"],
          evidenceTypes: ["Award certificates", "Selection criteria", "Media coverage", "Official announcements"],
          tips: "Awards should be for excellence in your field, not just participation."
        },
        {
          title: "Membership in associations requiring outstanding achievements",
          description: "Membership in associations that require outstanding achievements as judged by experts",
          examples: ["Professional societies", "Honor societies", "Exclusive organizations"],
          evidenceTypes: ["Membership certificates", "Selection criteria", "Peer review process documentation"],
          tips: "Membership must require expert judgment of outstanding achievements, not just credentials."
        }
      ]
    }
  }

  const commonMistakes = [
    {
      mistake: "Submitting weak evidence",
      solution: "Focus on quality over quantity. Better to have strong evidence for 3 criteria than weak evidence for 6."
    },
    {
      mistake: "Not explaining significance",
      solution: "Always provide context. Explain why your achievements demonstrate extraordinary ability."
    },
    {
      mistake: "Generic recommendation letters",
      solution: "Letters should be specific, detailed, and connect your achievements to legal standards."
    },
    {
      mistake: "Ignoring the 'extraordinary' standard",
      solution: "Show that you are in the small percentage at the top of your field."
    }
  ]

  const documentTips = [
    {
      category: "Organization",
      tip: "Organize documents by criterion, with a clear index and tabs"
    },
    {
      category: "Expert Letters",
      tip: "Get 5-8 letters from recognized experts who can attest to your achievements"
    },
    {
      category: "Evidence Quality", 
      tip: "Use official documents, authenticated translations, and clear photocopies"
    },
    {
      category: "Legal Brief",
      tip: "Consider including a legal brief that connects evidence to immigration law standards"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Instructions & Guidance</h1>
        <p className="text-muted-foreground">Comprehensive guide to strengthen your self-petition</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="criteria">Criteria Guide</TabsTrigger>
          <TabsTrigger value="documents">Document Tips</TabsTrigger>
          <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {Object.entries(instructionData).map(([visaType, data]) => (
            <Card key={visaType}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {visaType} Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What is {visaType}?</h4>
                  <p className="text-sm text-muted-foreground">{data.overview}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <p className="text-sm text-muted-foreground">{data.requirements}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Success Tips</h4>
                  <ul className="text-sm space-y-1">
                    {data.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          {Object.entries(instructionData).map(([visaType, data]) => (
            <Card key={visaType}>
              <CardHeader>
                <CardTitle>{visaType} Criteria Detailed Guide</CardTitle>
                <CardDescription>
                  In-depth explanation of each criterion with examples and tips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {data.criteria.map((criterion, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Criterion {index + 1}</Badge>
                          {criterion.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Description</h5>
                          <p className="text-sm text-muted-foreground">{criterion.description}</p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Examples</h5>
                          <ul className="text-sm space-y-1">
                            {criterion.examples.map((example, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="text-primary">•</span>
                                <span className="text-muted-foreground">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Evidence Types</h5>
                          <ul className="text-sm space-y-1">
                            {criterion.evidenceTypes.map((evidence, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="text-primary">•</span>
                                <span className="text-muted-foreground">{evidence}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div>
                              <h5 className="text-sm font-medium text-blue-900">Pro Tip</h5>
                              <p className="text-sm text-blue-700">{criterion.tips}</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Preparation Best Practices</CardTitle>
              <CardDescription>Essential tips for organizing and presenting your evidence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {documentTips.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{item.category}</h4>
                    <p className="text-sm text-muted-foreground">{item.tip}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Checklist Template</CardTitle>
              <CardDescription>Suggested organization structure for your petition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="font-medium">I. Cover Letter & Table of Contents</div>
                <div className="ml-4 text-muted-foreground">• Executive summary of qualifications</div>
                <div className="ml-4 text-muted-foreground">• Detailed table of contents with page numbers</div>
                
                <div className="font-medium">II. Personal Documents</div>
                <div className="ml-4 text-muted-foreground">• Passport, birth certificate, CV/resume</div>
                
                <div className="font-medium">III. Evidence by Criterion</div>
                <div className="ml-4 text-muted-foreground">• Separate section for each claimed criterion</div>
                <div className="ml-4 text-muted-foreground">• Expert letters explaining significance</div>
                
                <div className="font-medium">IV. Supporting Documentation</div>
                <div className="ml-4 text-muted-foreground">• Additional context and background materials</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Common Mistakes to Avoid
              </CardTitle>
              <CardDescription>Learn from others' experiences to strengthen your case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {commonMistakes.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900 mb-1">Mistake: {item.mistake}</h4>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <p className="text-sm text-green-700">
                          <span className="font-medium">Solution:</span> {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline Recommendations</CardTitle>
              <CardDescription>Typical timeline for petition preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Months 1-2</Badge>
                  <span className="text-sm">Research criteria, gather existing documents, identify gaps</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Months 3-4</Badge>
                  <span className="text-sm">Request expert letters, obtain missing documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Months 5-6</Badge>
                  <span className="text-sm">Organize petition, write cover letter, final review</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Month 7</Badge>
                  <span className="text-sm">Submit petition to USCIS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}