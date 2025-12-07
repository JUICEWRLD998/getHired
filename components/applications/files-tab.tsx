"use client"

import { useState } from "react"
import { FileAttachment, Resume } from "@/lib/types"
import { mockResumes } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  FileText, 
  Download, 
  Trash2,
  File,
  Upload
} from "lucide-react"
import { format } from "date-fns"

interface FilesTabProps {
  files: FileAttachment[]
  resumeId?: string
}

const fileTypeColors: Record<string, string> = {
  resume: "bg-blue-100 text-blue-800",
  cover_letter: "bg-purple-100 text-purple-800",
  portfolio: "bg-green-100 text-green-800",
  other: "bg-gray-100 text-gray-800",
}

const fileTypeLabels: Record<string, string> = {
  resume: "Resume",
  cover_letter: "Cover Letter",
  portfolio: "Portfolio",
  other: "Other",
}

export function FilesTab({ files: initialFiles, resumeId }: FilesTabProps) {
  const [files, setFiles] = useState<FileAttachment[]>(initialFiles)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "resume" as "resume" | "cover_letter" | "portfolio" | "other",
    existingResume: "",
  })

  // Get the attached resume from mock data
  const attachedResume = resumeId 
    ? mockResumes.find(r => r.id === resumeId) 
    : null

  const handleAddFile = () => {
    if (formData.existingResume) {
      // Adding existing resume from library
      const resume = mockResumes.find(r => r.id === formData.existingResume)
      if (resume) {
        const fileUrl: string = resume.fileUrl ?? "#"
        const newFile: FileAttachment = {
          id: `file-${Date.now()}`,
          name: resume.name,
          type: "resume",
          url: fileUrl,
          applicationId: "temp",
          createdAt: new Date().toISOString(),
        }
        setFiles([...files, newFile])
      }
    } else if (formData.name) {
      // Adding new file (mock upload)
      const newFile: FileAttachment = {
        id: `file-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        url: "#",
        applicationId: "temp",
        createdAt: new Date().toISOString(),
      }
      setFiles([...files, newFile])
    }
    
    setFormData({ name: "", type: "resume", existingResume: "" })
    setIsAddOpen(false)
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId))
  }

  return (
    <div className="space-y-6">
      {/* Attached Resume Section */}
      {attachedResume && (
        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-3">
            Primary Resume
          </h3>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{attachedResume.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {attachedResume.isDefault && (
                        <Badge variant="secondary" className="mr-2">Default</Badge>
                      )}
                      Uploaded {format(new Date(attachedResume.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Files Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm text-muted-foreground">
            Additional Files ({files.length})
          </h3>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add File
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add File</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Add from Resume Library</Label>
                  <Select
                    value={formData.existingResume}
                    onValueChange={(value) => 
                      setFormData({ ...formData, existingResume: value, name: "" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resume" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockResumes.map((resume) => (
                        <SelectItem key={resume.id} value={resume.id}>
                          {resume.name} {resume.isDefault && "(Default)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or upload new
                    </span>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="file-name">File Name</Label>
                  <Input
                    id="file-name"
                    placeholder="e.g., Cover Letter - Google"
                    value={formData.name}
                    onChange={(e) => 
                      setFormData({ ...formData, name: e.target.value, existingResume: "" })
                    }
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="file-type">File Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "resume" | "cover_letter" | "portfolio" | "other") => 
                      setFormData({ ...formData, type: value })
                    }
                    disabled={!!formData.existingResume}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resume">Resume</SelectItem>
                      <SelectItem value="cover_letter">Cover Letter</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddFile} 
                  className="bg-primary hover:bg-primary/90"
                  disabled={!formData.name && !formData.existingResume}
                >
                  Add File
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {files.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <File className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-1">No additional files</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Add cover letters, portfolios, or other documents.
              </p>
              <Button 
                variant="outline"
                className="gap-2"
                onClick={() => setIsAddOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add File
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <Card key={file.id} className="group">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={fileTypeColors[file.type]}>
                            {fileTypeLabels[file.type]}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Added {format(new Date(file.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
