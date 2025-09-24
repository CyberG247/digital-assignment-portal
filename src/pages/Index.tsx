import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Users, Shield, Clock, CheckCircle } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Easy Submissions",
      description: "Upload assignments with drag-and-drop functionality and automatic file validation."
    },
    {
      icon: Clock,
      title: "Deadline Tracking",
      description: "Never miss a deadline with automatic notifications and visual progress indicators."
    },
    {
      icon: Users,
      title: "Teacher Tools",
      description: "Comprehensive grading system with feedback options and analytics dashboard."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "End-to-end encryption ensures your submissions and grades remain private."
    },
    {
      icon: CheckCircle,
      title: "Instant Notifications",
      description: "Real-time updates on submission status, grades, and important announcements."
    },
    {
      icon: BookOpen,
      title: "Progress Analytics",
      description: "Track performance with detailed insights and improvement recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Digital Assignment
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Submission Portal</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Streamline your academic workflow with our secure, efficient platform for assignment submissions, 
              grading, and feedback. Perfect for students and educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-primary shadow-medium text-lg px-8 py-6">
                <Link to="/student">
                  <FileText className="w-5 h-5 mr-2" />
                  Student Portal
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/teacher">
                  <Users className="w-5 h-5 mr-2" />
                  Teacher Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose EduPortal?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern education with powerful features that make assignment management effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-lg text-muted-foreground">Assignments Submitted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">500+</div>
              <div className="text-lg text-muted-foreground">Active Teachers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">5,000+</div>
              <div className="text-lg text-muted-foreground">Happy Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Assignment Workflow?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of educators and students who've streamlined their academic process with EduPortal.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
