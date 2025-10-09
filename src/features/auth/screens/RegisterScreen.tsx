import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
    Easing,
    FadeIn,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'
import { Toast } from 'toastify-react-native'

import { TextInput } from '@/components/inputs/TextInput'
import { Button } from '@/components/ui/Button'
import { colors } from '@/constants/colors'
import { Screen, useNavigation } from '@/navigation/RootNavigator'
import NuroNoBackground from '../../../../assets/nuro-no-background1.0.png'
import { useAuthStore } from '../store/auth.store'

export function RegisterScreen() {
    const { t } = useTranslation()
    const { navigateTo } = useNavigation()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    const { register, isLoading } = useAuthStore()

    const handleRegister = async () => {
        setNameError('')
        setEmailError('')
        setPasswordError('')

        try {
            await register({ name, email, password })

            Toast.show({
                type: 'success',
                text1: t('register.success'),
                position: 'top',
                visibilityTime: 4000,
            })

            navigateTo(Screen.ONBOARDING)
        }
        catch (error: any) {
            if (error.issues) {
                error.issues.forEach((issue: any) => {
                    if (issue.path[0] === 'name') {
                        setNameError(issue.message)
                    }
                    else if (issue.path[0] === 'email') {
                        setEmailError(issue.message)
                    }
                    else if (issue.path[0] === 'password') {
                        setPasswordError(issue.message)
                    }
                })
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: t('register.error'),
                    position: 'top',
                    visibilityTime: 4000,
                })
            }
        }
    }

    const handleLogin = () => {
        navigateTo(Screen.LOGIN)
    }

    const breathingScale = useSharedValue(1)

    useState(() => {
        breathingScale.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            false,
        )
    })

    return (
        <View className="flex-1">
            <LinearGradient
                colors={[colors.gradients.nuroCalm[1], colors.gradients.nuroCalm[0]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <View className="pt-5 justify-center items-center">
                    <Animated.View
                        entering={FadeIn.duration(800)}
                        style={{
                            transform: [{ scale: breathingScale }],
                        }}
                    >
                        <Image
                            source={NuroNoBackground}
                            style={{ width: 250, height: 250 }}
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>

                <Animated.View
                    entering={FadeIn.delay(500).duration(800)}
                    className="px-8 mt-4"
                >
                    <Text
                        className="text-3xl font-bold text-left mb-2"
                        style={{ color: colors.text.primary }}
                    >
                        {t('register.welcome')}
                    </Text>
                    <Text
                        className="text-lg text-left mb-2"
                        style={{ color: colors.text.secondary }}
                    >
                        {t('register.subtitle')}
                    </Text>

                    <TextInput
                        label={t('register.name')}
                        placeholder={t('register.name')}
                        value={name}
                        onChangeText={setName}
                        icon={<Ionicons name="person-outline" size={20} color={colors.primary[800]} />}
                        error={nameError}
                    />

                    <TextInput
                        label={t('register.email')}
                        placeholder={t('register.email')}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        icon={<Ionicons name="mail-outline" size={20} color={colors.primary[800]} />}
                        error={emailError}
                    />

                    <TextInput
                        label={t('register.password')}
                        placeholder={t('register.password')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon={<Ionicons name="lock-closed-outline" size={20} color={colors.primary[800]} />}
                        error={passwordError}
                    />

                    <View className="mt-2">
                        <Button
                            title={t('register.register_button')}
                            onPress={handleRegister}
                            color="primary"
                            type="solid"
                            icon={<Ionicons name="person-add-outline" size={20} color="white" />}
                            disabled={isLoading}
                        />
                    </View>

                    <View className="mt-4 items-center">
                        <Text
                            className="text-base"
                            style={{ color: colors.text.primary }}
                        >
                            {t('register.hasAccount')}
                        </Text>
                        <TouchableOpacity
                            onPress={handleLogin}
                            className="mt-1"
                        >
                            <Text
                                className="text-base font-semibold"
                                style={{ color: colors.nuro.tertiary }}
                            >
                                {t('register.login_link')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </LinearGradient>
        </View>
    )
}
