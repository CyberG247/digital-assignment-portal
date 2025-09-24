import Navigation from "@/components/Navigation";
import AssignmentCard from "@/components/AssignmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Clock, CheckCircle, Plus } from "lucide-react";

// Mock data for teacher assignments
const mockTeacherAssignments = [
  {
    id: "1",
    title: "React Component Architecture Essay",
    description: "Write a comprehensive essay about React component architecture and best practices.",
    dueDate: new Date(2024, 11, 15),
    status: "submitted" as const,
    subject: "Computer Science",
    submissionsCount: 24,
    totalStudents: 30,
  },
  {
    id: "2",
    title: "Database Design Project", 
    description: "Design a relational database for an e-commerce application.",
    dueDate: new Date(2024, 11, 20),
    status: "pending" as const,
    subject: "Database Systems",
    submissionsCount: 15,
    totalStudents: 28,
  },
  {
    id: "3",
    title: "JavaScript Algorithm Implementation",
    description: "Implement sorting algorithms in JavaScript with performance analysis.",
    dueDate: new Date(2024, 11, 10),
    status: "graded" as const,
    subject: "Algorithms",
    submissionsCount: 25,
    totalStudents: 25,
    avgGrade: 87.5,
  },
];

const TeacherDashboard = () => {
  const stats = {
    totalAssignments: mockTeacherAssignments.length,
    pendingGrading: mockTeacherAssignments.filter(a => a.status === "submitted").length,
    totalSubmissions: mockTeacherAssignments.reduce((acc, a) => acc + a.submissionsCount, 0),
    avgGrade: 87.5,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Manage assignments and track student progress</p>
          </div>
          <Button className="bg-gradient-primary shadow-medium">
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalAssignments}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pendingGrading}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalSubmissions}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.avgGrade}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTeacherAssignments.map((assignment) => (
            <Card key={assignment.id} className="transition-smooth hover:shadow-medium group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-smooth">
                    {assignment.title}
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{assignment.subject}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="font-medium">
                      {assignment.submissionsCount}/{assignment.totalStudents}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-smooth"
                      style={{ width: `${(assignment.submissionsCount / assignment.totalStudents) * 100}%` }}
                    />
                  </div>
                  
                  {assignment.avgGrade && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Average Grade:</span>
                      <span className="font-medium text-success">{assignment.avgGrade}%</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {assignment.status === "submitted" && (
                    <Button size="sm" className="flex-1">
                      Grade ({assignment.submissionsCount})
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;