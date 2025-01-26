import { useState } from "react"

const JUDGE0_API = import.meta.env.VITE_JUDGE0_API
const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY

export const useJudge0 = () => {
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const runCode = async (code: string, language: number, input: string) => {
    setIsLoading(true)
    setOutput("")
    setError("")

    try {
      const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": `${JUDGE0_API_KEY}`,
          "X-RapidAPI-Host": `${JUDGE0_API}`,
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language,
          stdin: input,
        }),
      })

      const result = await response.json()

      if (result.stdout) {
        setOutput(result.stdout)
      } else if (result.stderr) {
        setError(result.stderr)
      } else if (result.compile_output) {
        setError(result.compile_output)
      }
    } catch (err) {
      setError("An error occurred while running the code.")
    } finally {
      setIsLoading(false)
    }
  }

  return { runCode, output, error, isLoading }
}

