import { createContext, useContext, useState, ReactNode } from "react";

interface StudentData {
  name: string;
  studentId: string;
}

interface StudentAuthContextType {
  student: StudentData | null;
  login: (studentData: StudentData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(undefined);

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within a StudentAuthProvider");
  }
  return context;
};

interface StudentAuthProviderProps {
  children: ReactNode;
}

export const StudentAuthProvider = ({ children }: StudentAuthProviderProps) => {
  const [student, setStudent] = useState<StudentData | null>(null);

  const login = (studentData: StudentData) => {
    setStudent(studentData);
    localStorage.setItem("studentData", JSON.stringify(studentData));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem("studentData");
  };

  // Initialize student from localStorage on mount
  useState(() => {
    const savedStudent = localStorage.getItem("studentData");
    if (savedStudent) {
      try {
        setStudent(JSON.parse(savedStudent));
      } catch (error) {
        localStorage.removeItem("studentData");
      }
    }
  });

  const value = {
    student,
    login,
    logout,
    isAuthenticated: !!student,
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
};