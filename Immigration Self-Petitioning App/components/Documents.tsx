import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Upload, FileText, Download, Trash2, Eye, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export function Documents() {
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: "1",
      name: "CV_Resume.pdf",
      category: "Personal Documents",
      size: "2.4 MB",
      uploadDate: "2024-01-10",
      status: "approved"
    },
    {
      id: "2", 
      name: "Recommendation_Letter_1.pdf",
      category: "Letters of Recommendation",
      size: "1.8 MB",
      uploadDate: "2024-01-09",
      status: "pending"
    },
    {
      id: "3",
      name: "Publication_List.pdf", 
      category: "Publications",
      size: "890 KB",
      uploadDate: "2024-01-08",
      status: "approved"
    },
    {
      id: "4",
      name: "Award_Certificate.pdf",
      category: "Awards & Recognition",
      size: "1.2 MB", 
      uploadDate: "2024-01-07",
      status: "needs_revision"
    }
  ])

  const documentCategories = [
    {
      name: "Personal Documents",
      required: ["CV/Resume", "Passport Copy"],
      optional: ["Academic Transcripts"],
      uploaded: 1,
      total: 3
    },
    {
      name: "Letters of Recommendation", 
      required: ["Expert Opinion Letters (3-5)"],
      optional: ["Additional Reference Letters"],
      uploaded: 1,
      total: 5
    },
    {
      name: "Publications",
      required: ["Publication List", "Citation Reports"],
      optional: ["Full Text of Key Publications"],
      uploaded: 1,
      total: 4
    },
    {
      name: "Awards & Recognition",
      required: ["Award Certificates"],
      optional: ["Media Coverage", "Recognition Letters"],
      uploaded: 1,
      total: 3
    },
    {
      name: "Professional Evidence",
      required: ["Work Portfolio"],
      optional: ["Client Testimonials", "Project Documentation"],
      uploaded: 0,
      total: 4
    }
  ]

  const handleFileUpload = (category: string) => {
    // Mock file upload
    const newDoc = {
      id: Date.now().toString(),
      name: `New_Document_${Date.now()}.pdf`,
      category,
      size: "1.5 MB",
      uploadDate: new Date().toISOString().split('T')[0],
      status: "pending" as const
    }
    setUploadedDocs(prev => [...prev, newDoc])
  }

  const handleDeleteDoc = (docId: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== docId))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'needs_revision':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'pending':
        return <Badge variant="secondary">Under Review</Badge>
      case 'needs_revision':
        return <Badge variant="destructive">Needs Revision</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const totalUploaded = uploadedDocs.length
  const totalRequired = documentCategories.reduce((sum, cat) => sum + cat.total, 0)
  const progressPercentage = (totalUploaded / totalRequired) * 100

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Document Management</h1>
        <p className="text-muted-foreground">Upload and organize your supporting documents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Documents Uploaded</span>
            <span className="font-medium">{totalUploaded} / {totalRequired}</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% complete - Keep uploading to strengthen your application
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="upload">Quick Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {documentCategories.map((category) => (
            <Card key={category.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {category.uploaded}/{category.total} uploaded
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleFileUpload(category.name)}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                </div>
                <Progress value={(category.uploaded / category.total) * 100} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Required Documents:</h4>
                  <ul className="text-sm space-y-1">
                    {category.required.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-red-500">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Optional Documents:</h4>
                  <ul className="text-sm space-y-1">
                    {category.optional.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-muted-foreground">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Uploaded Files:</h4>
                  {uploadedDocs
                    .filter(doc => doc.category === category.name)
                    .map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.size} • {doc.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(doc.status)}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteDoc(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Uploaded Documents</CardTitle>
              <CardDescription>Manage all your uploaded files in one place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadedDocs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(doc.status)}
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.category} • {doc.size} • {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(doc.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDoc(doc.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Upload</CardTitle>
              <CardDescription>Drag and drop your files or click to browse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here, or click to select files
                </p>
                <Button>
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}