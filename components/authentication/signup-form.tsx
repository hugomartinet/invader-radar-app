import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput, View } from 'react-native'
import { useAPIMutation } from '../../services/api'
import { useToken } from '../../services/authentication/token'
import { router } from 'expo-router'

interface SignupFormData {
  username: string
  password: string
}

export function SignupForm() {
  const { control, handleSubmit } = useForm<SignupFormData>()

  const { mutateAsync: onSignup } = useAPIMutation<string, SignupFormData>({ method: 'POST', url: '/users/signup' })

  const { setToken } = useToken()

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Username" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="password"
      />
      {/* TODO add error message handling */}
      <Button
        title="Sign up"
        onPress={handleSubmit(async data => {
          const token = await onSignup(data)
          setToken(token)
          router.push('/home')
        })}
      />
    </View>
  )
}
