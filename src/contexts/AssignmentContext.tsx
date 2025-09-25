import { createContext, useContext, useState, ReactNode } from "react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  status: "pending" | "submitted" | "graded" | "overdue";
  subject: string;
  grade?: number;
  maxGrade?: number;
  submittedBy?: string[];
  submissionFile?: string;
}

interface Notification {
  id: string;
  studentId: string;
  assignmentTitle: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface AssignmentContextType {
  assignments: Assignment[];
  notifications: Notification[];
  createAssignment: (assignment: Omit<Assignment, 'id' | 'status' | 'submittedBy'>) => void;
  submitAssignment: (assignmentId: string, studentId: string, file: string) => void;
  gradeAssignment: (assignmentId: string, studentId: string, grade: number) => void;
  getAssignmentsForStudent: (studentId: string) => Assignment[];
  getNotificationsForStudent: (studentId: string) => Notification[];
  markNotificationAsRead: (notificationId: string) => void;
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error("useAssignments must be used within an AssignmentProvider");
  }
  return context;
};

// Mock initial assignments with December 2025 dates
const initialAssignments: Assignment[] = [
  {
    id: "1",
    title: "Data Structures Lab Report",
    description: "Complete analysis of Binary Search Trees implementation with complexity analysis and performance benchmarks.",
    instructions: "Submit a comprehensive lab report including code implementation, time complexity analysis, and performance comparison with other data structures.",
    dueDate: new Date(2025, 11, 15, 23, 59), // December 15, 2025
    status: "pending",
    subject: "Computer Science",
    maxGrade: 100,
    submittedBy: []
  },
  {
    id: "2", 
    title: "Machine Learning Project",
    description: "Develop a classification model using supervised learning algorithms for a real-world dataset.",
    instructions: "Choose a dataset, preprocess the data, implement at least two different algorithms, compare their performance, and create a detailed report with visualizations.",
    dueDate: new Date(2025, 11, 20, 23, 59), // December 20, 2025
    status: "pending",
    subject: "Artificial Intelligence",
    maxGrade: 150,
    submittedBy: []
  },
  {
    id: "3",
    title: "Database Design Assignment", 
    description: "Design and implement a normalized database for a library management system.",
    instructions: "Create an ER diagram, normalize to 3NF, implement in SQL, and populate with sample data. Include queries for common operations.",
    dueDate: new Date(2025, 11, 10, 23, 59), // December 10, 2025
    status: "submitted",
    subject: "Database Systems",
    maxGrade: 100,
    submittedBy: ["STU001"],
    grade: 85
  },
  {
    id: "4",
    title: "Web Development Portfolio",
    description: "Create a responsive portfolio website showcasing your web development skills.",
    instructions: "Build a portfolio using modern web technologies (HTML5, CSS3, JavaScript). Must be responsive, accessible, and include at least 3 projects.",
    dueDate: new Date(2025, 11, 25, 23, 59), // December 25, 2025
    status: "pending", 
    subject: "Web Development",
    maxGrade: 120,
    submittedBy: []
  }
];

interface AssignmentProviderProps {
  children: ReactNode;
}

export const AssignmentProvider = ({ children }: AssignmentProviderProps) => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const createAssignment = (newAssignment: Omit<Assignment, 'id' | 'status' | 'submittedBy'>) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: Math.random().toString(36).substring(2),
      status: "pending",
      submittedBy: []
    };
    setAssignments(prev => [...prev, assignment]);
  };

  const submitAssignment = (assignmentId: string, studentId: string, file: string) => {
    setAssignments(prev => prev.map(assignment => {
      if (assignment.id === assignmentId) {
        const submittedBy = assignment.submittedBy || [];
        if (!submittedBy.includes(studentId)) {
          return {
            ...assignment,
            status: "submitted" as const,
            submittedBy: [...submittedBy, studentId],
            submissionFile: file
          };
        }
      }
      return assignment;
    }));

    // Add notification for submission
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      const notification: Notification = {
        id: Math.random().toString(36).substring(2),
        studentId,
        assignmentTitle: assignment.title,
        message: `Your assignment "${assignment.title}" has been submitted successfully. Please check back after 48 hours to see your grade.`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  const gradeAssignment = (assignmentId: string, studentId: string, grade: number) => {
    setAssignments(prev => prev.map(assignment => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          status: "graded" as const,
          grade
        };
      }
      return assignment;
    }));

    // Add notification for grade
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      const notification: Notification = {
        id: Math.random().toString(36).substring(2),
        studentId,
        assignmentTitle: assignment.title,
        message: `Your assignment "${assignment.title}" has been graded. You scored ${grade}/${assignment.maxGrade || 100} points.`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  const getAssignmentsForStudent = (studentId: string) => {
    return assignments.map(assignment => ({
      ...assignment,
      status: assignment.submittedBy?.includes(studentId) ? 
        (assignment.grade !== undefined ? "graded" as const : "submitted" as const) :
        (new Date() > assignment.dueDate ? "overdue" as const : "pending" as const)
    }));
  };

  const getNotificationsForStudent = (studentId: string) => {
    return notifications.filter(notification => notification.studentId === studentId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const value = {
    assignments,
    notifications,
    createAssignment,
    submitAssignment,
    gradeAssignment,
    getAssignmentsForStudent,
    getNotificationsForStudent,
    markNotificationAsRead
  };

  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
};