import { Button, Text } from 'react-native'
import { AuthenticatedPage } from '../../components/authentication/authenticated-page'
import { useToken } from '../../services/authentication/token'

export default function Page() {
  const { setToken } = useToken()

  return (
    <AuthenticatedPage>
      <Text>Home page</Text>
      <Button title="Log out" onPress={() => setToken(null)} />
    </AuthenticatedPage>
  )
}
