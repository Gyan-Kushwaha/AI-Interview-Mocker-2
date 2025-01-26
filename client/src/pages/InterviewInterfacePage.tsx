import { getInterviewByID } from "@/api/mockinterview.api";
import InterviewInterface from "@/components/InterviewInterface";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { useNotification } from "@/components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";
import { useParams } from "react-router-dom";

const InterviewInterfacePage = () => {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        console.log(id);
        const resposne = await getInterviewByID(id || "");
        console.log("Interview", resposne);
        
      } catch (error) {
        console.error(error);
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "error",
          message: "Interview not found",
        };
        addNotification(newNotification);
        setTimeout(() => {
          window.location.href = "/dashboard";
          setLoading(false);
        }, 100000);
      }
    };
    fetchInterview();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <InterviewInterface />
    </div>
  );
};

export default InterviewInterfacePage;
