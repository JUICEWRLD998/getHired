"use client"

import { useState } from "react"
import { Note } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Edit2, Trash2, StickyNote } from "lucide-react"
import { format } from "date-fns"

interface NotesTabProps {
  notes: Note[]
}

export function NotesTab({ notes: initialNotes }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNoteContent, setNewNoteContent] = useState("")

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: newNoteContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationId: "temp",
    }
    
    setNotes([newNote, ...notes])
    setNewNoteContent("")
    setIsAddOpen(false)
  }

  const handleEditNote = () => {
    if (!editingNote || !newNoteContent.trim()) return
    
    setNotes(notes.map(note => 
      note.id === editingNote.id 
        ? { ...note, content: newNoteContent, updatedAt: new Date().toISOString() }
        : note
    ))
    setNewNoteContent("")
    setEditingNote(null)
    setIsEditOpen(false)
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId))
  }

  const openEditDialog = (note: Note) => {
    setEditingNote(note)
    setNewNoteContent(note.content)
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Add Note Button */}
      <div className="flex justify-end">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Write your note here..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote} className="bg-primary hover:bg-primary/90">
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <StickyNote className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-1">No notes yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Add notes to keep track of important details about this application.
            </p>
            <Button 
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note.id} className="group">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-2">
                      {format(new Date(note.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      {note.updatedAt !== note.createdAt && (
                        <span className="ml-2 text-xs">(edited)</span>
                      )}
                    </p>
                    <p className="whitespace-pre-wrap text-foreground">{note.content}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(note)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteNote(note.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Write your note here..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditNote} className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
