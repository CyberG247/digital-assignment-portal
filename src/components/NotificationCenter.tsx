import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, Clock, Award } from "lucide-react";
import { useAssignments } from "@/contexts/AssignmentContext";
import { useStudentAuth } from "@/contexts/StudentAuthContext";
import { format } from "date-fns";

const NotificationCenter = () => {
  const { student } = useStudentAuth();
  const { getNotificationsForStudent, markNotificationAsRead } = useAssignments();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!student) return null;

  const notifications = getNotificationsForStudent(student.studentId);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const getNotificationIcon = (message: string) => {
    if (message.includes("submitted successfully")) {
      return <CheckCircle className="w-4 h-4 text-success" />;
    }
    if (message.includes("graded")) {
      return <Award className="w-4 h-4 text-warning" />;
    }
    return <Clock className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2 px-2 py-1 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {isExpanded ? 'Hide' : 'Show'}
        </span>
      </Button>

      {isExpanded && (
        <Card className="mt-3">
          <CardHeader>
            <CardTitle className="text-lg">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-smooth hover:bg-muted/50 ${
                      notification.read 
                        ? 'bg-muted/20 border-border' 
                        : 'bg-primary/5 border-primary/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.message)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {notification.assignmentTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(notification.timestamp, "MMM dd, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No notifications yet
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;