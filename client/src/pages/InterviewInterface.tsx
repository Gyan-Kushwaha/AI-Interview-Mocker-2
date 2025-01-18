"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Timer } from "../components/InterviewInterface/Timer";
import { ExitButton } from "../components/InterviewInterface/ExitButton";
import { ScreenRecorder } from "../components/InterviewInterface/ScreenRecorder";
import { useNavigate } from "react-router-dom";
import { sampleInterviewQuestions } from "@/sampleData/sampleQuestions";

export default function InterviewInterface() {
  const [isInterviewStarted, setIsInterviewStarted] = useState(!false);
  const [showDialog, setShowDialog] = useState(!true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const maxQuestions = sampleInterviewQuestions.length || 0;

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
          <Button variant="outline">Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Question and Response Area */}
        <div className="space-y-6">
          <Card className="p-6 bg-zinc-800/50 border-zinc-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Current Question
            </h2>
            <p className="text-zinc-300">
              {sampleInterviewQuestions[currentQuestion].question}
            </p>
            <div className="w-full mt-1 flex justify-between">
              <Button
                onClick={handleSetPreviousQuestion}
                className={`mt-2 ${
                  currentQuestion === 0
                    ? "bg-gray-700"
                    : "bg-blue-600"
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
              Your Response
            </h2>
            <div className="text-zinc-400 italic">
              Speech-to-text content will appear here...
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
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              onClick={() => setIsRecording(!isRecording)}
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
        </div>
      </div>
      <Timer />
      <ExitButton />
    </div>
  );
}
