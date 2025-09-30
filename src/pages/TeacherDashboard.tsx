import { useState } from "react";
import Navigation from "@/components/Navigation";
import AssignmentCard from "@/components/AssignmentCard";
import CreateAssignmentModal from "@/components/CreateAssignmentModal";
import GradeAssignmentModal from "@/components/GradeAssignmentModal";
import AssignmentDetailsModal from "@/components/AssignmentDetailsModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Users, Award, Plus, CheckCircle, Clock } from "lucide-react";
import { useAssignments } from "@/contexts/AssignmentContext";

const TeacherDashboard = () => {
  const { assignments } = useAssignments();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  // Calculate stats from real assignment data
  const stats = {
    totalAssignments: assignments.length,
    pendingGrading: assignments.filter(a => a.status === "submitted").length,
    totalSubmissions: assignments.reduce((sum, a) => sum + (a.submittedBy?.length || 0), 0),
    averageGrade: assignments.filter(a => a.grade !== undefined).length > 0 
      ? Math.round(assignments.filter(a => a.grade !== undefined).reduce((sum, a) => sum + (a.grade || 0), 0) / assignments.filter(a => a.grade !== undefined).length)
      : 0
  };

  const handleCreateAssignment = () => {
    setShowCreateModal(true);
  };

  const handleGradeAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowGradeModal(true);
  };

  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage assignments and track student progress</p>
          </div>
          <Button 
            onClick={handleCreateAssignment}
            className="bg-gradient-primary shadow-medium w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalAssignments}</div>
              <p className="text-xs text-muted-foreground">assignments created</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pendingGrading}</div>
              <p className="text-xs text-muted-foreground">assignments awaiting grades</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">student submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.averageGrade}%</div>
              <p className="text-xs text-muted-foreground">across all graded assignments</p>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Section */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground animate-fade-in">Assignment Management</h2>
          
          {/* Assignments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <div 
                  key={assignment.id} 
                  className="animate-slide-up" 
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <Card className="transition-smooth hover:shadow-medium group cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-smooth">
                          {assignment.title}
                        </CardTitle>
                        <Badge 
                          className={
                            assignment.status === "submitted" 
                              ? "bg-primary text-primary-foreground" 
                              : assignment.status === "graded"
                              ? "bg-success text-success-foreground"
                              : "bg-warning text-warning-foreground"
                          }
                        >
                          {assignment.submittedBy?.length || 0} submissions
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">{assignment.subject}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                          Progress: {assignment.submittedBy?.length || 0}/25 students
                        </div>
                        {assignment.grade && (
                          <div className="text-success font-semibold">
                            Avg: {assignment.grade}%
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(assignment)} 
                          className="flex-1"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {assignment.status === "submitted" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleGradeAssignment(assignment)} 
                            className="flex-1"
                          >
                            <Award className="w-4 h-4 mr-2" />
                            Grade Assignment
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No assignments created yet</h3>
                <p className="text-muted-foreground mb-4">Get started by creating your first assignment for students.</p>
                <Button onClick={handleCreateAssignment} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Assignment
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <CreateAssignmentModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />

        <GradeAssignmentModal
          assignment={selectedAssignment}
          isOpen={showGradeModal}
          onClose={() => {
            setShowGradeModal(false);
            setSelectedAssignment(null);
          }}
        />

        <AssignmentDetailsModal
          assignment={selectedAssignment}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAssignment(null);
          }}
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;