import { ReactNode, useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import colors from 'tailwindcss/colors'

export function InvaderStatusPicker() {
  const [status, setStatus] = useState<Status>('To Flash')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View
      className={`h-[48] border-[2px] rounded-full`}
      style={{ borderColor: iconColors[status], backgroundColor: backgroundColors[status] }}
    >
      <TouchableHighlight
        className="justify-center h-full overflow-hidden rounded-full"
        underlayColor={focusColors[status]}
        onPress={() => setIsOpen(value => !value)}
      >
        <View className="flex items-center flex-row px-[12]">
          {icons[status]({ color: iconColors[status], size: 28 })}
          <Ionicons name="caret-down" color={iconColors[status]} size={16} style={{ marginLeft: 6 }} />
        </View>
      </TouchableHighlight>

      {isOpen && (
        <View className="absolute bottom-[72] right-0 bg-white rounded-2xl shadow-lg">
          {statuses.map(value => (
            <TouchableHighlight
              className="w-[200] px-[20] py-[10] border-b-[1px] last:border-b-0 border-gray-100 "
              underlayColor={colors.gray[100]}
              onPress={() => {
                setStatus(value)
                setIsOpen(false)
              }}
            >
              <View className="flex-row items-center">
                {icons[value]({ color: iconColors[value], size: 28 })}
                <Text className="text-[20px] text-gray-600 ml-[10]" style={{ color: iconColors[value] }}>
                  {value}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      )}
    </View>
  )
}

const statuses = ['To Flash', 'Flashed', 'Destroyed'] as const
type Status = (typeof statuses)[number]

const iconColors: Record<Status, string> = {
  ['To Flash']: colors.gray[300],
  ['Flashed']: colors.green[500],
  ['Destroyed']: colors.red[400],
}

const backgroundColors: Record<Status, string> = {
  ['To Flash']: colors.white,
  ['Flashed']: colors.green[100],
  ['Destroyed']: colors.red[50],
}

const focusColors: Record<Status, string> = {
  ['To Flash']: colors.gray[100],
  ['Flashed']: colors.green[200],
  ['Destroyed']: colors.red[100],
}

const icons: Record<Status, (props: Omit<IconProps<string>, 'name'>) => ReactNode> = {
  ['To Flash']: props => <Ionicons {...props} name="eye" />,
  ['Flashed']: props => <Ionicons {...props} name="flash" />,
  ['Destroyed']: props => <MaterialIcons {...props} name="broken-image" />,
}
