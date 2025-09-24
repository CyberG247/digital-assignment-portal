import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, User, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "submitted" | "graded" | "overdue";
  subject: string;
  grade?: number;
  maxGrade?: number;
  instructions?: string;
  resources?: string[];
}

interface AssignmentDetailsModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const AssignmentDetailsModal = ({ assignment, isOpen, onClose, onSubmit }: AssignmentDetailsModalProps) => {
  if (!assignment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-primary text-primary-foreground";
      case "graded":
        return "bg-success text-success-foreground";
      case "overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-warning text-warning-foreground";
    }
  };

  const isOverdue = new Date() > assignment.dueDate && assignment.status === "pending";
  const actualStatus = isOverdue ? "overdue" : assignment.status;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">{assignment.title}</span>
            <Badge className={getStatusColor(actualStatus)}>
              {actualStatus.toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Assignment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Subject:</span>
              <span>{assignment.subject}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Due:</span>
              <span className={isOverdue ? "text-destructive font-medium" : ""}>
                {format(assignment.dueDate, "MMM dd, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>

          {/* Grade Display */}
          {assignment.grade !== undefined && (
            <div className="p-4 bg-success-light rounded-lg border border-success/20">
              <div className="flex items-center justify-between">
                <span className="font-medium">Your Grade:</span>
                <span className="text-2xl font-bold text-success">
                  {assignment.grade}/{assignment.maxGrade || 100}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {assignment.description}
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <h3 className="font-semibold">Instructions</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">
                {assignment.instructions || `Complete the ${assignment.title} assignment by uploading your work before the due date. Make sure to follow the guidelines provided in class and include all required elements in your submission.`}
              </p>
            </div>
          </div>

          {/* Resources */}
          {assignment.resources && assignment.resources.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-1">
                {assignment.resources.map((resource, index) => (
                  <li key={index} className="text-sm text-primary hover:underline cursor-pointer">
                    • {resource}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            {assignment.status === "pending" && onSubmit && (
              <Button onClick={onSubmit} className="flex-1 bg-gradient-primary">
                <FileText className="w-4 h-4 mr-2" />
                Submit Assignment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDetailsModal;