import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, CheckCircle, AlertCircle } from "lucide-react";
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
}

interface AssignmentCardProps {
  assignment: Assignment;
  isTeacher?: boolean;
  onSubmit?: () => void;
  onGrade?: () => void;
  onView?: () => void;
}

const AssignmentCard = ({ assignment, isTeacher = false, onSubmit, onGrade, onView }: AssignmentCardProps) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
      case "graded":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = new Date() > assignment.dueDate && assignment.status === "pending";
  const actualStatus = isOverdue ? "overdue" : assignment.status;

  return (
    <Card className="transition-smooth hover:shadow-medium group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-smooth">
            {assignment.title}
          </CardTitle>
          <Badge className={`${getStatusColor(actualStatus)} flex items-center gap-1`}>
            {getStatusIcon(actualStatus)}
            <span className="capitalize">{actualStatus}</span>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-medium">{assignment.subject}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Due: {format(assignment.dueDate, "MMM dd, yyyy")}</span>
          </div>
          
          {assignment.grade !== undefined && (
            <div className="text-success font-semibold">
              {assignment.grade}/{assignment.maxGrade || 100}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {isTeacher ? (
            <>
              <Button variant="outline" size="sm" onClick={onView} className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                View Details
              </Button>
              {assignment.status === "submitted" && (
                <Button size="sm" onClick={onGrade} className="flex-1">
                  Grade Assignment
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={onView} className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                View Details
              </Button>
              {assignment.status === "pending" && (
                <Button size="sm" onClick={onSubmit} className="flex-1">
                  Submit Assignment
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;