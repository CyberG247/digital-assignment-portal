import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Plus } from "lucide-react";
import { useAssignments } from "@/contexts/AssignmentContext";
import { useToast } from "@/hooks/use-toast";

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAssignmentModal = ({ isOpen, onClose }: CreateAssignmentModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    instructions: "",
    dueDate: "",
    maxGrade: 100
  });
  
  const { createAssignment } = useAssignments();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subject || !formData.description || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    createAssignment({
      title: formData.title,
      subject: formData.subject,
      description: formData.description,
      instructions: formData.instructions || `Complete the ${formData.title} assignment by uploading your work before the due date. Make sure to follow the guidelines provided in class and include all required elements in your submission.`,
      dueDate: new Date(formData.dueDate),
      maxGrade: formData.maxGrade
    });

    toast({
      title: "Assignment Created",
      description: `"${formData.title}" has been published successfully.`,
    });

    // Reset form and close modal
    setFormData({
      title: "",
      subject: "",
      description: "",
      instructions: "",
      dueDate: "",
      maxGrade: 100
    });
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Plus className="w-5 h-5" />
            Create New Assignment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter assignment title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="Enter subject name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Provide a brief description of the assignment"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Detailed Instructions</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleChange("instructions", e.target.value)}
              placeholder="Provide detailed instructions for students (optional - default instructions will be used if left empty)"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxGrade">Maximum Grade</Label>
              <Input
                id="maxGrade"
                type="number"
                value={formData.maxGrade}
                onChange={(e) => handleChange("maxGrade", parseInt(e.target.value) || 100)}
                placeholder="100"
                min={1}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create & Publish Assignment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentModal;