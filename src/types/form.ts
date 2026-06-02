export interface FieldConfig {
  name: string
  label: string
  type: 'text' | 'date' | 'radio'
  placeholder?: string
  options?: string[]
  required?: boolean
}

export interface FormData {
  [key: string]: string
}
