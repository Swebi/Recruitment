'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function submitQuestions(formData: FormData) {
  const domain = formData.get('domain') as string
  const subdomain = formData.get('subdomain') as string
  const questions = formData.getAll('questions') as string[]

  try {
    await prisma.$transaction(
      questions.map(question =>
        prisma.questions.create({
          data: {
            domain,
            subdomain,
            question
          }
        })
      )
    )
    return { success: true, message: 'Questions submitted successfully!' }
  } catch (error) {
    console.error('Error submitting questions:', error)
    return {
      success: false,
      message: 'Failed to submit questions. Please try again.'
    }
  }
}
