import { Button, Text } from 'react-native'
import { useToken } from '../../services/authentication/token'
import { router } from 'expo-router'

export default function Page() {
  const { setToken } = useToken()

  return (
    <>
      <Text>Home page</Text>
      <Button
        title="Log out"
        onPress={() => {
          setToken(null)
          router.push('/login')
        }}
      />
    </>
  )
}
