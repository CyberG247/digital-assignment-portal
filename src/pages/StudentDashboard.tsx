import { useState } from "react";
import Navigation from "@/components/Navigation";
import AssignmentCard from "@/components/AssignmentCard";
import SubmissionModal from "@/components/SubmissionModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, AlertTriangle } from "lucide-react";

// Mock data for assignments
const mockAssignments = [
  {
    id: "1",
    title: "React Component Architecture Essay",
    description: "Write a comprehensive essay about React component architecture and best practices. Include examples and real-world applications.",
    dueDate: new Date(2024, 11, 15),
    status: "pending" as const,
    subject: "Computer Science",
  },
  {
    id: "2", 
    title: "Database Design Project",
    description: "Design a relational database for an e-commerce application. Include ER diagrams and normalization.",
    dueDate: new Date(2024, 11, 20),
    status: "submitted" as const,
    subject: "Database Systems",
  },
  {
    id: "3",
    title: "JavaScript Algorithm Implementation",
    description: "Implement sorting algorithms in JavaScript with performance analysis.",
    dueDate: new Date(2024, 11, 10),
    status: "graded" as const,
    subject: "Algorithms",
    grade: 92,
    maxGrade: 100,
  },
  {
    id: "4",
    title: "UI/UX Case Study Analysis",
    description: "Analyze a mobile app's user interface and suggest improvements based on design principles.",
    dueDate: new Date(2024, 10, 28),
    status: "pending" as const,
    subject: "Design",
  },
];

const StudentDashboard = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const stats = {
    total: mockAssignments.length,
    pending: mockAssignments.filter(a => a.status === "pending").length,
    submitted: mockAssignments.filter(a => a.status === "submitted").length,
    graded: mockAssignments.filter(a => a.status === "graded").length,
  };

  const overdue = mockAssignments.filter(a => 
    new Date() > a.dueDate && a.status === "pending"
  ).length;

  const handleSubmitAssignment = (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
    setIsSubmissionModalOpen(true);
  };

  const handleSubmission = (submission: { notes: string; files: File[] }) => {
    console.log("Submission:", submission);
    // Here you would typically send the submission to your backend
  };

  const selectedAssignmentData = mockAssignments.find(a => a.id === selectedAssignment);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your assignments and submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
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

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.submitted}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.graded}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmit={() => handleSubmitAssignment(assignment.id)}
              onView={() => console.log("View assignment:", assignment.id)}
            />
          ))}
        </div>
      </div>

      {selectedAssignmentData && (
        <SubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          assignmentTitle={selectedAssignmentData.title}
          onSubmit={handleSubmission}
        />
      )}
    </div>
  );
};

export default StudentDashboard;