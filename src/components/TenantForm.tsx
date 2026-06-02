import { useState, ChangeEvent, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { FieldConfig } from '../types/form'

interface Props {
  title: string
  fields: FieldConfig[]
}

export default function TenantForm({
  title,
  fields,
}: Props) {
  const initialData = fields.reduce<Record<string, string>>(
    (acc, field) => ({
      ...acc,
      [field.name]: '',
    }),
    {}
  )

  const [formData, setFormData] = useState<Record<string, string>>(initialData)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_USER_ID
      )

      alert('Profile submitted!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="page-shell">
      <div className="form-card">
        <h1>{title}</h1>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label
              className="field-row"
              key={field.name}
            >
              <span>{field.label}</span>

              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            </label>
          ))}

          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}