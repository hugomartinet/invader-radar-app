import { Link } from 'expo-router'
import { Pressable, Text } from 'react-native'
import { LoginForm } from '../components/authentication/login-form'

export default function Page() {
  return (
    <>
      <LoginForm />
      <Link href="/signup" asChild>
        <Pressable>
          <Text>No account yet? Sign up</Text>
        </Pressable>
      </Link>
    </>
  )
}
