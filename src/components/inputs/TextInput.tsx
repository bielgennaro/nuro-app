import { TextInput as RNTextInput, Text, View } from 'react-native'

export function TextInput({
    placeholder,
    label,
    value,
    icon,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    error,
}: {
    placeholder?: string
    label?: string
    type?: 'text' | 'password' | 'email'
    value?: string
    icon?: React.ReactNode
    onChangeText?: (text: string) => void
    secureTextEntry?: boolean
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
    error?: string
}) {
    return (
        <View className="mb-2">
            {label && <Text className="mb-1 text-primary-950">{label}</Text>}
            <View className={`flex-row border-nuro-dark items-center border rounded-md px-1 py-1 bg-white ${error ? 'border-red-500' : 'border-white/20'}`}>
                {icon && <View className="mr-1">{icon}</View>}
                <RNTextInput
                    className="flex-1 text-primary-900"
                    placeholder={placeholder}
                    placeholderTextColor="#166534"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
            {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
        </View>
    )
}
