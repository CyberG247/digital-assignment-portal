import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentTitle: string;
}

const SubmissionSuccessModal = ({ isOpen, onClose, assignmentTitle }: SubmissionSuccessModalProps) => {
  const submissionTime = new Date();
  const gradeAvailableTime = new Date(submissionTime.getTime() + (48 * 60 * 60 * 1000)); // 48 hours later

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <div className="space-y-6 py-4">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-bounce-in">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-success animate-fade-in">
              Assignment Submitted Successfully!
            </h2>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your submission has been received and processed.
            </p>
          </div>

          {/* Receipt Details */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 text-left animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Assignment</p>
                <p className="text-sm text-muted-foreground">{assignmentTitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Submitted On</p>
                <p className="text-sm text-muted-foreground">
                  {format(submissionTime, "MMM dd, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="font-medium">Grade Available</p>
                <p className="text-sm text-muted-foreground">
                  {format(gradeAvailableTime, "MMM dd, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-warning-foreground">
              <strong>Important:</strong> Please check back after 48 hours to see your grade. 
              You will receive an email notification once your assignment has been graded.
            </p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onClose} 
            className="w-full bg-gradient-primary animate-fade-in" 
            style={{ animationDelay: '0.8s' }}
          >
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionSuccessModal;