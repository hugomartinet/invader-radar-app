import { Link } from 'expo-router'
import { Pressable, Text } from 'react-native'
import { LoginForm } from '../components/authentication/login-form'
import { SignupForm } from '../components/authentication/signup-form'

export default function Page() {
  return (
    <>
      <SignupForm />
      <Link href="/login" asChild>
        <Pressable>
          <Text>Already an account? Log in</Text>
        </Pressable>
      </Link>
    </>
  )
}
