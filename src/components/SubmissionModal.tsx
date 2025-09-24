import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentTitle: string;
  onSubmit: (submission: { notes: string; files: File[] }) => void;
}

const SubmissionModal = ({ isOpen, onClose, assignmentTitle, onSubmit }: SubmissionModalProps) => {
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one file for your submission.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ notes, files });
    setNotes("");
    setFiles([]);
    onClose();
    
    toast({
      title: "Assignment submitted!",
      description: "Your assignment has been submitted successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <p className="text-sm text-muted-foreground">{assignmentTitle}</p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your submission..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label>Files</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-smooth bg-muted/20">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, TXT up to 10MB each
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
              </label>

              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Assignment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;