import TenantForm from '../components/TenantForm'
import { roomFields } from '../configs/roomFields'

export default function RoomPage() {
  return (
    <TenantForm
      title="Room Tenant Profile"
      fields={roomFields}
    />
  )
}