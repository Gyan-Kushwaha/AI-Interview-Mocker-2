"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Camera,
  SquareMIcon as MicSquare,
  Power,
  Video,
  VideoOff,
} from "lucide-react";
import { Timer } from "./InterviewInterface/Timer";
import { ExitButton } from "./InterviewInterface/ExitButton";
import { ScreenRecorder } from "./InterviewInterface/ScreenRecorder";
import { useNavigate } from "react-router-dom";
import AudioVisualizer from "@/components/InterviewInterface/AudioVisualizer";
import { MockInterview, Question } from "@/vite-env";
import CodeEditor from "./CodeEdior/CodeEditor";

interface InterviewInterfaceProps {
  interviewDetails: MockInterview;
}

const InterviewInterface: React.FC<InterviewInterfaceProps> = ({
  interviewDetails,
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(!false);
  const [showDialog, setShowDialog] = useState(!true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [Questions, setQuestions] = useState<Question[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const maxQuestions = Questions.length || 0;

  const AZURE_SUBSCRIPTION_KEY = import.meta.env.VITE_AZURE_SUBSCRIPTION_KEY;
  const AZURE_REGION = import.meta.env.VITE_AZURE_REGION;

  const [transcript, setTranscript] = useState(
    "Speech-to-text content will appear here.."
  );
  // const [isListening, setIsListening] = useState(false);
  const [partialTranscript, setPartialTranscript] = useState("");
  // const [language, setLanguage] = useState("en-US");
  const language = "en-US";

  const recognizerRef = useRef<SpeechSDK.SpeechRecognizer | null>(null);

  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isCameraOn]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  const handleSetNextQuestion = () => {
    if (currentQuestion < maxQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSetPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startRecognition = () => {
    if (!AZURE_SUBSCRIPTION_KEY || !AZURE_REGION) {
      alert("Azure credentials are missing.");
      return;
    }

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      AZURE_SUBSCRIPTION_KEY,
      AZURE_REGION
    );
    speechConfig.speechRecognitionLanguage = language;

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    recognizerRef.current = recognizer;

    setTranscript("");
    setPartialTranscript("");
    // setIsListening(true);

    recognizer.recognizing = (sender, event) => {
      sender;

      setPartialTranscript(event.result.text);
    };

    recognizer.recognized = (sender, event) => {
      sender;
      if (event.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        let finalText = event.result.text;
        // if (language === "hi-IN") {
        //   console.log("Transliterating Hindi text...");
        //   finalText = transliterate(finalText);
        // }

        setTranscript((prev) => `${prev} ${finalText}`.trim());
        setPartialTranscript("");
      }
    };

    recognizer.startContinuousRecognitionAsync();
  };

  const stopRecognition = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(() => {
        recognizerRef.current?.close();
        recognizerRef.current = null;
        // setIsListening(false);
      });
    }
  };

  const handleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      startRecognition();
    } else {
      setIsRecording(false);
      stopRecognition();
    }
  };

  const handleEditorOpen = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  useEffect(() => {
    const handleQuestions = async () => {
      const CoreSubjectQuestions = interviewDetails.coreSubjectQuestions;
      // const DSAQuestions = interviewDetails.dsaQuestions;
      const TechStackQuestions = interviewDetails.technicalQuestions;
      const Questions = [
        ...(TechStackQuestions || []),
        ...(CoreSubjectQuestions || []),
      ];
      console.log(Questions);
      setQuestions(Questions);
    };
    handleQuestions();
  }, []);

  if (!isInterviewStarted)
    return (
      <div className="">
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start Interview</DialogTitle>
            </DialogHeader>
            <p>Do you want to start the interview?</p>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => navigate("/dashboard")}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  console.log("Interview is started");
                  setIsInterviewStarted(true);
                  setShowDialog(false);
                }}
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-800/50 backdrop-blur-sm">
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#4AE087] via-[#84B7D4] to-[#9D7AEA] bg-clip-text text-transparent">
            AI-Powered
          </span>
          <span className="text-white"> Mock Interview</span>
        </h1>
        <div className="flex items-center">
          <ScreenRecorder />
          <Button className="h-[35px]" variant="outline" onClick={handleEditorOpen}>{`${
            isEditorOpen ? "Close Code Editor" : "Open Code Editor"
          }`}</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Question and Response Area */}
        <div className="space-y-6">
          <Card className="p-6 bg-zinc-800/50 border-zinc-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Current Question {currentQuestion + 1} of {maxQuestions} [
              Category ]
            </h2>
            <p className="text-zinc-300">
              {/* {Questions[currentQuestion].question} */}
            </p>
            <div className="w-full mt-1 flex justify-between">
              <Button
                onClick={handleSetPreviousQuestion}
                className={`mt-2 ${
                  currentQuestion === 0 ? "bg-gray-700" : "bg-blue-600"
                } hover:bg-blue-800`}
              >
                Previous
              </Button>
              <Button
                onClick={handleSetNextQuestion}
                className={`mt-2 ${
                  currentQuestion === maxQuestions - 1
                    ? "bg-gray-700"
                    : "bg-green-600"
                } hover:bg-green-800`}
              >
                Next
              </Button>
            </div>
          </Card>
          <Card className="p-6 bg-zinc-800/50 border-zinc-700 min-h-[300px]">
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Text Response
            </h2>
            <div className="text-zinc-400 italic">{transcript}</div>
          </Card>
          <Card className="p-6 bg-zinc-800/50 border-zinc-700 min-h-[200px]">
            <h2 className="text-xl font-semibold text-white mb-4">
              Code Submission
            </h2>
            <div className="">
            <textarea
              readOnly
              placeholder="You can only Paste Code in this section to write code open code editor from navbar"
              className="w-full bg-zinc-800 text-white h-full p-2 placeholder:italic"
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text");
                e.currentTarget.value = text;
              }}
            />
          </div>
          </Card>
        </div>

        {/* Right Side - Camera and Controls */}
        <div className="space-y-4">
          <Card className="aspect-video relative bg-zinc-800/50 border-zinc-700 overflow-hidden">
            {isCameraOn && hasPermission ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                {hasPermission === false ? (
                  <p className="text-red-500">Camera permission denied</p>
                ) : (
                  <Camera className="w-16 h-16 text-zinc-600" />
                )}
              </div>
            )}
          </Card>

          <div className="flex justify-center gap-4">
            <Button
              variant={isCameraOn ? "default" : "destructive"}
              size="lg"
              onClick={toggleCamera}
              className="w-40"
            >
              {isCameraOn ? (
                <>
                  <Video className="mr-2 h-4 w-4" />
                  Camera On
                </>
              ) : (
                <>
                  <VideoOff className="mr-2 h-4 w-4" />
                  Camera Off
                </>
              )}
            </Button>

            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="lg"
              onClick={handleRecording}
              className="w-40"
            >
              {isRecording ? (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <MicSquare className="mr-2 h-4 w-4" />
                  Record
                </>
              )}
            </Button>

          </div>
          <Card className="p-6 bg-zinc-800/50 border-zinc-700 min-h-[70px]">
            <div className="text-zinc-400">{partialTranscript}</div>
          </Card>
          <Card className="p-6 bg-zinc-800/50 border-zinc-700 min-h-[70px]">
            {isRecording && <AudioVisualizer />}
          </Card>
          
        </div>
      </div>
      <Timer />
      <ExitButton />
      {isEditorOpen && <CodeEditor />}
    </div>
  );
};

export default InterviewInterface;
