import { editInterview, getInterviewByID } from "@/api/mockinterview.api";
import InterviewInterface from "@/components/InterviewInterface";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { useNotification } from "@/components/Notifications/NotificationContext";
import { MockInterview, Notification } from "@/vite-env";
import { useParams } from "react-router-dom";
import { generateQuestions } from "@/api/gemini.api";

const InterviewInterfacePage = () => {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [interviewData, setInterviewData] = useState<MockInterview>();
  useEffect(() => {
    const startInterview = async () => {
      try {
        // console.log(id);
        const formData = {
          interviewID: id || "",
        };
        const interviewData = await getInterviewByID(id || "");

        const resposne2 = await generateQuestions(formData);

        // console.log("Generated Questions",resposne2.data);

        interviewData.dsaQuestions = resposne2.data.dsaQuestions;
        interviewData.coreSubjectQuestions =
          resposne2.data.coreSubjectQuestions;
        interviewData.technicalQuestions = resposne2.data.techStackQuestions;

        // console.log("Interview Data", interviewData);
        const editedInterview = await editInterview(id || "", interviewData);
        setInterviewData(editedInterview);
        console.log("Edited Interview", editedInterview);
        setLoading(false);
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
    startInterview();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {interviewData && <InterviewInterface interviewDetails={interviewData} />}
    </div>
  );
};

export default InterviewInterfacePage;
