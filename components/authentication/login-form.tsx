import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput, View } from 'react-native'
import { useAPIMutation } from '../../services/api'
import { useToken } from '../../services/authentication/token'
import { router } from 'expo-router'

interface LoginFormData {
  username: string
  password: string
}

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>()

  const { mutateAsync: onLogin } = useAPIMutation<string, LoginFormData>({ method: 'POST', url: '/users/login' })

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
        title="Log in"
        onPress={handleSubmit(async data => {
          const token = await onLogin(data)
          setToken(token)
          router.push('/home')
        })}
      />
    </View>
  )
}
