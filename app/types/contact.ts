export interface ContactFormState {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>
