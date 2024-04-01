import { Slot } from 'expo-router'
import { AuthenticatedPage } from '../../components/authentication/authenticated-page'

export default function App() {
  return (
    <AuthenticatedPage>
      <Slot />
    </AuthenticatedPage>
  )
}
