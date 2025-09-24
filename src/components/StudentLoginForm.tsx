import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User, IdCard, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const studentLoginSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  studentId: z.string().trim().min(3, "Student ID must be at least 3 characters").max(20, "Student ID must be less than 20 characters")
});

interface StudentLoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (studentData: { name: string; studentId: string }) => void;
}

const StudentLoginForm = ({ isOpen, onClose, onLogin }: StudentLoginFormProps) => {
  const [formData, setFormData] = useState({ name: "", studentId: "" });
  const [errors, setErrors] = useState<{ name?: string; studentId?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = studentLoginSchema.parse(formData);
      
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLogin(validatedData as { name: string; studentId: string });
      toast({
        title: "Login Successful",
        description: `Welcome, ${validatedData.name}!`,
      });
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { name?: string; studentId?: string } = {};
        error.issues.forEach((err) => {
          if (err.path[0] === 'name') fieldErrors.name = err.message;
          if (err.path[0] === 'studentId') fieldErrors.studentId = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold animate-fade-in">Student Login</CardTitle>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Enter your credentials to access your assignments
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                  disabled={isLoading}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className={errors.studentId ? "border-destructive" : ""}
                  disabled={isLoading}
                />
                {errors.studentId && <p className="text-sm text-destructive">{errors.studentId}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Logging in..."
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default StudentLoginForm;