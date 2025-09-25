import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Award, FileText, User } from "lucide-react";
import { useAssignments } from "@/contexts/AssignmentContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subject: string;
  maxGrade?: number;
  submittedBy?: string[];
}

interface GradeAssignmentModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}

const GradeAssignmentModal = ({ assignment, isOpen, onClose }: GradeAssignmentModalProps) => {
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  
  const { gradeAssignment } = useAssignments();
  const { toast } = useToast();

  if (!assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const gradeValue = parseFloat(grade);
    const maxGrade = assignment.maxGrade || 100;
    
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > maxGrade) {
      toast({
        title: "Invalid Grade",
        description: `Grade must be between 0 and ${maxGrade}`,
        variant: "destructive"
      });
      return;
    }

    // For demo purposes, we'll grade for the first submitted student
    const studentId = assignment.submittedBy?.[0] || "STU001";
    
    gradeAssignment(assignment.id, studentId, gradeValue);

    toast({
      title: "Assignment Graded",
      description: `Grade of ${gradeValue}/${maxGrade} has been assigned for "${assignment.title}".`,
    });

    // Reset form and close modal
    setGrade("");
    setFeedback("");
    onClose();
  };

  const submissionCount = assignment.submittedBy?.length || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Award className="w-5 h-5" />
            Grade Assignment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Assignment Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{assignment.title}</h3>
              <Badge variant="outline">{assignment.subject}</Badge>
            </div>
            <p className="text-muted-foreground">{assignment.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>Due: {format(assignment.dueDate, "MMM dd, yyyy 'at' h:mm a")}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{submissionCount} submission{submissionCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div className="space-y-4">
            <h4 className="font-semibold">Submission Details</h4>
            {submissionCount > 0 ? (
              <div className="bg-success-light p-4 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Student ID: {assignment.submittedBy?.[0] || "STU001"}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Submission file: assignment_submission.pdf (mock file)
                </p>
                <p className="text-sm text-muted-foreground">
                  Submitted on: {format(new Date(), "MMM dd, yyyy 'at' h:mm a")}
                </p>
              </div>
            ) : (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">No submissions yet</p>
              </div>
            )}
          </div>

          {/* Grading Form */}
          {submissionCount > 0 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade (out of {assignment.maxGrade || 100})</Label>
                <Input
                  id="grade"
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder={`Enter grade (0-${assignment.maxGrade || 100})`}
                  min={0}
                  max={assignment.maxGrade || 100}
                  step={0.5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback (Optional)</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback for the student..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-gradient-primary">
                  <Award className="w-4 h-4 mr-2" />
                  Submit Grade
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GradeAssignmentModal;