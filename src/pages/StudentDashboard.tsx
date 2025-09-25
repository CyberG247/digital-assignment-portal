import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AssignmentCard from "@/components/AssignmentCard";
import AssignmentDetailsModal from "@/components/AssignmentDetailsModal";
import SubmissionModal from "@/components/SubmissionModal";
import SubmissionSuccessModal from "@/components/SubmissionSuccessModal";
import NotificationCenter from "@/components/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, AlertTriangle, LogOut, User } from "lucide-react";
import { useStudentAuth } from "@/contexts/StudentAuthContext";
import { useAssignments } from "@/contexts/AssignmentContext";

const StudentDashboard = () => {
  const { student, logout, isAuthenticated } = useStudentAuth();
  const { getAssignmentsForStudent, submitAssignment } = useAssignments();
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isAuthenticated || !student) {
    return <Navigate to="/" replace />;
  }

  const assignments = getAssignmentsForStudent(student.studentId);

  // Calculate statistics
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === "pending").length,
    submitted: assignments.filter(a => a.status === "submitted").length,
    graded: assignments.filter(a => a.status === "graded").length,
    overdue: assignments.filter(a => a.status === "overdue").length
  };

  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const handleSubmitClick = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
  };

  const handleSubmitAssignment = (assignmentId: string, file: File) => {
    submitAssignment(assignmentId, student.studentId, file.name);
    setShowSubmissionModal(false);
    setShowSuccessModal(true);
  };

  const handleLogout = () => {
    logout();
  };

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

        <div className="space-y-6">
          {/* Notifications */}
          <NotificationCenter />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
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
                {stats.overdue > 0 && (
                  <Badge variant="destructive" className="mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {stats.overdue} Overdue
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
              {assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                  <div 
                    key={assignment.id} 
                    className="animate-slide-up" 
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <AssignmentCard
                      assignment={assignment}
                      onSubmit={() => handleSubmitClick(assignment)}
                      onView={() => handleViewDetails(assignment)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No assignments yet</h3>
                  <p className="text-muted-foreground">Check back later for new assignments from your teachers.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <SubmissionModal
          isOpen={showSubmissionModal}
          onClose={() => setShowSubmissionModal(false)}
          assignmentTitle={selectedAssignment?.title || ""}
          onSubmit={(submissionData) => handleSubmitAssignment(selectedAssignment?.id, submissionData.files[0])}
        />

        <AssignmentDetailsModal
          assignment={selectedAssignment}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAssignment(null);
          }}
          onSubmit={() => {
            setShowDetailsModal(false);
            setShowSubmissionModal(true);
          }}
        />

        <SubmissionSuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            setSelectedAssignment(null);
          }}
          assignmentTitle={selectedAssignment?.title || ""}
        />
      </main>
    </div>
  );
};

export default StudentDashboard;