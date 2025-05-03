import { Question } from "../../shared/types/question"

const questions: Question[] = [
  {
      id: "addition_0",
      prompt: "What is 1 + 1?",
      options: ["1", "5", "3", "2"],
      tags: ["arithmetic", "addition", "easy"],
      correctOption: 3
  },
  {
      id: "addition_1",
      prompt: "What is 10 + 3?",
      options: ["8", "2", "13", "6"],
      tags: ["arithmetic", "addition", "easy"],
      correctOption: 2
  }
]

export function getQuestion(id: string | undefined) {
  if (id == null) { return null }
  if (id == "random") { return questions[0] }
  const question = questions.find((question: Question) => {
    return question.id == id
  })
  if (!question) { return null }
  return question
}

export function getNextQuestion(id: string) {
  const index = questions.findIndex((question: Question) => {
    return question.id == id
  })
  return questions[(index + 1) % questions.length]
}