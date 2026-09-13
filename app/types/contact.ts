export interface ContactFormState {
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>
