import { useState, ChangeEvent, FormEvent } from 'react'
import emailjs from '@emailjs/browser'

interface FieldConfig {
  name: keyof FormData
  label: string
  type: string
  placeholder: string
}

interface FormData {
  name: string
  occupation: string
  workingPlace: string
  race: string
  nationality: string
  budget: string
  moveInDate: string
  yearsOfTenancy: string
}

const fieldConfig: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
  { name: 'occupation', label: 'Occupation', type: 'text', placeholder: 'Enter occupation' },
  { name: 'workingPlace', label: 'Working place/Company name', type: 'text', placeholder: 'Enter working place or company name' },
  { name: 'race', label: 'Race', type: 'text', placeholder: 'Enter race' },
  { name: 'nationality', label: 'Nationality', type: 'text', placeholder: 'Enter nationality' },
  { name: 'budget', label: 'Budget', type: 'text', placeholder: 'Enter budget (e.g. Below 600 (car park included))' },
  { name: 'moveInDate', label: 'Move in date', type: 'text', placeholder: 'Enter move in date' },
  { name: 'yearsOfTenancy', label: 'Years of tenancy', type: 'text', placeholder: 'Enter years of tenancy' },
]

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    occupation: '',
    workingPlace: '',
    race: '',
    nationality: '',
    budget: '',
    moveInDate: '',
    yearsOfTenancy: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const userId = import.meta.env.VITE_EMAILJS_USER_ID

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
    ) => {
    event.preventDefault()

    try {
        await emailjs.send(
        serviceId,
        templateId,
        {
            name: formData.name,
            occupation: formData.occupation,
            workingPlace: formData.workingPlace,
            race: formData.race,
            nationality: formData.nationality,
            budget: formData.budget,
            moveInDate: formData.moveInDate,
            yearsOfTenancy: formData.yearsOfTenancy,
        },
        userId
        )

        alert('Tenant profile submitted successfully!')

        setFormData({
            name: '',
            occupation: '',
            workingPlace: '',
            race: '',
            nationality: '',
            budget: '',
            moveInDate: '',
            yearsOfTenancy: '',
            })
        } catch (error) {
            console.error(error)
            alert('Failed to send profile')
        }
    }

  return (
    <div className="page-shell">
      <div className="form-card">
        <h1>Tenant Profile</h1>
        <p className="subtitle">Fill out the tenant details below.</p>
        <form onSubmit={handleSubmit}>
          {fieldConfig.map((field) => (
            <label className="field-row" key={field.name}>
              <span>{field.label}</span>
              <input
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                inputMode={field.type === 'number' ? 'numeric' : 'text'}
              />
            </label>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
