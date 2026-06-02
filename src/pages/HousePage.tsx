import TenantForm from '../components/TenantForm'
import { houseFields } from '../configs/houseFields'

export default function HousePage() {
  return (
    <TenantForm
      title="House Tenant Profile"
      fields={houseFields}
    />
  )
}