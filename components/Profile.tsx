import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react"
import { useState } from "react"

export function Profile() {
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson", 
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    country: "United States",
    occupation: "Research Scientist",
    organization: "Stanford University",
    fieldOfExpertise: "Artificial Intelligence",
    yearsOfExperience: "8",
    education: "PhD in Computer Science",
    languages: "English (Native), Spanish (Fluent), French (Basic)"
  })

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Profile Information</h1>
        <p className="text-muted-foreground">Manage your personal and professional details</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country of Birth</Label>
              <Select value={profile.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="occupation">Current Occupation</Label>
              <Input
                id="occupation"
                value={profile.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Current Organization</Label>
              <Input
                id="organization"
                value={profile.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldOfExpertise">Field of Expertise</Label>
              <Input
                id="fieldOfExpertise"
                value={profile.fieldOfExpertise}
                onChange={(e) => handleInputChange('fieldOfExpertise', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Select value={profile.yearsOfExperience} onValueChange={(value) => handleInputChange('yearsOfExperience', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-15">11-15 years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Highest Education</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="education"
                  value={profile.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Textarea
                id="languages"
                value={profile.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                placeholder="List languages and proficiency levels"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4>Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive updates about your application</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4>Password</h4>
              <p className="text-sm text-muted-foreground">Change your account password</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}