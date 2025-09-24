import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AssignmentCard from "@/components/AssignmentCard";
import SubmissionModal from "@/components/SubmissionModal";
import AssignmentDetailsModal from "@/components/AssignmentDetailsModal";
import SubmissionSuccessModal from "@/components/SubmissionSuccessModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, AlertTriangle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudentAuth } from "@/contexts/StudentAuthContext";

const mockAssignments = [
  {
    id: "1",
    title: "Essay on Climate Change",
    description: "Write a comprehensive essay discussing the impacts of climate change on global ecosystems and potential solutions.",
    dueDate: new Date("2025-12-15"),
    status: "pending" as const,
    subject: "Environmental Science",
    instructions: "Your essay should be 1500-2000 words and include at least 5 scholarly references. Focus on both the environmental and socioeconomic impacts of climate change."
  },
  {
    id: "2", 
    title: "Math Problem Set #3",
    description: "Complete problems 1-25 from Chapter 8, focusing on differential equations and their applications.",
    dueDate: new Date("2025-12-10"),
    status: "submitted" as const,
    subject: "Calculus II",
    instructions: "Show all work and provide clear explanations for each solution. Use proper mathematical notation throughout."
  },
  {
    id: "3",
    title: "History Research Paper",
    description: "Research and analyze the causes and effects of World War I on European society.",
    dueDate: new Date("2025-12-20"),
    status: "graded" as const,
    subject: "European History",
    grade: 92,
    maxGrade: 100,
    instructions: "Your paper should be 2000-2500 words with proper citations in Chicago style. Include primary sources where possible."
  },
  {
    id: "4",
    title: "Programming Project",
    description: "Create a web application using React and implement user authentication and data persistence.",
    dueDate: new Date("2025-12-30"),
    status: "pending" as const,
    subject: "Computer Science",
    instructions: "Your application should include user registration, login, and a dashboard. Use modern React practices and ensure responsive design."
  },
  {
    id: "5",
    title: "Chemistry Lab Report",
    description: "Document your findings from the organic chemistry synthesis experiment and provide detailed analysis.",
    dueDate: new Date("2025-12-12"),
    status: "submitted" as const,
    subject: "Organic Chemistry",
    instructions: "Include methodology, results, discussion, and conclusion sections. Provide chemical structures and reaction mechanisms."
  },
  {
    id: "6",
    title: "Literature Analysis",
    description: "Analyze the themes and literary devices used in Shakespeare's Hamlet, focusing on character development.",
    dueDate: new Date("2025-12-25"),
    status: "pending" as const,
    subject: "English Literature",
    instructions: "Your analysis should be 1200-1500 words. Focus on 2-3 main characters and their development throughout the play."
  }
];

const StudentDashboard = () => {
  const { student, logout, isAuthenticated } = useStudentAuth();
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState<typeof mockAssignments[0] | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const stats = {
    total: mockAssignments.length,
    pending: mockAssignments.filter(a => a.status === "pending").length,
    submitted: mockAssignments.filter(a => a.status === "submitted").length,
    graded: mockAssignments.filter(a => a.status === "graded").length,
  };

  const overdue = mockAssignments.filter(a => 
    new Date() > a.dueDate && a.status === "pending"
  ).length;

  const handleSubmitAssignment = (assignment: typeof mockAssignments[0]) => {
    setSelectedAssignment(assignment);
    setIsSubmissionModalOpen(true);
  };

  const handleViewDetails = (assignment: typeof mockAssignments[0]) => {
    setSelectedAssignment(assignment);
    setIsDetailsModalOpen(true);
  };

  const handleSubmission = (submissionData: { notes: string; files: File[] }) => {
    console.log("Submitting assignment:", selectedAssignment?.title, submissionData);
    setIsSubmissionModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header with Student Info */}
        <div className="mb-8 flex justify-between items-start">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your assignments and progress.
            </p>
          </div>
          
          {/* Student Info Card */}
          <Card className="min-w-[280px] animate-slide-up">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="h-8 w-8 p-0"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
              {overdue > 0 && (
                <Badge variant="destructive" className="mt-1">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {overdue} Overdue
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.submitted}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.graded}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground animate-fade-in">Your Assignments</h2>
          </div>
          
          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAssignments.map((assignment, index) => {
              return (
                <div 
                  key={assignment.id} 
                  className="animate-slide-up" 
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <AssignmentCard
                    assignment={assignment}
                    onSubmit={() => handleSubmitAssignment(assignment)}
                    onView={() => handleViewDetails(assignment)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Modals */}
        <SubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          assignmentTitle={selectedAssignment?.title || ""}
          onSubmit={handleSubmission}
        />

        <AssignmentDetailsModal
          assignment={selectedAssignment}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedAssignment(null);
          }}
          onSubmit={() => {
            setIsDetailsModalOpen(false);
            setIsSubmissionModalOpen(true);
          }}
        />

        <SubmissionSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            setSelectedAssignment(null);
          }}
          assignmentTitle={selectedAssignment?.title || ""}
        />
      </main>
    </div>
  );
};

export default StudentDashboard;