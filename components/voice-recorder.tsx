"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Mic, Square, Send } from "lucide-react"

interface VoiceRecorderProps {
  onClose: () => void
  clipId: string
}

export function VoiceRecorder({ onClose, clipId }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioUrl(url)
        chunksRef.current = []
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      let seconds = 0
      timerRef.current = setInterval(() => {
        seconds++
        setRecordingTime(seconds)

        // Auto-stop after 60 seconds
        if (seconds >= 60) {
          stopRecording()
        }
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const submitRecording = async () => {
    if (!audioBlob) return

    // Here you would upload the audio blob to your server
    // For now, we'll just simulate a successful upload
    console.log("Submitting voice application for clip:", clipId)

    // Close the recorder after submission
    onClose()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Record Your Application</h3>
      <p className="text-sm text-muted-foreground">
        Introduce yourself and explain why you're interested in this role (max 60 seconds)
      </p>

      <div className="flex items-center gap-4">
        {!audioUrl ? (
          <>
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="icon"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <Square /> : <Mic />}
            </Button>
            <div className="flex-1">
              {isRecording ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Recording...</span>
                    <span>{formatTime(recordingTime)}</span>
                  </div>
                  <Progress value={(recordingTime / 60) * 100} className="h-2" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Click the microphone to start recording</p>
              )}
            </div>
          </>
        ) : (
          <>
            <audio src={audioUrl} controls className="w-full" />
            <Button
              variant="outline"
              onClick={() => {
                setAudioBlob(null)
                setAudioUrl(null)
              }}
            >
              Re-record
            </Button>
          </>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submitRecording} disabled={!audioUrl}>
          <Send className="mr-2 h-4 w-4" />
          Submit Application
        </Button>
      </div>
    </div>
  )
}
