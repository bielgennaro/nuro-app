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
import { TextInput } from '@/components/inputs/TextInput'
import { Button } from '@/components/ui/Button'
import { colors } from '@/constants/colors'
import NuroNoBackground from '../../../../assets/nuro-no-background1.0.png'

export function LoginScreen() {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        // TODO: Implement login logic
    }

    const handleForgotPassword = () => {
        // TODO: Navigate to forgot password screen
    }

    const handleRegister = () => {
        // TODO: Navigate to register screen
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
                        {t('login.welcome')}
                    </Text>
                    <Text
                        className="text-lg text-left mb-2"
                        style={{ color: colors.text.secondary }}
                    >
                        {t('login.subtitle')}
                    </Text>

                    <TextInput
                        label={t('login.email')}
                        placeholder={t('login.email')}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        icon={<Ionicons name="mail-outline" size={20} color={colors.primary[800]} />}
                    />

                    <TextInput
                        label={t('login.password')}
                        placeholder={t('login.password')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon={<Ionicons name="lock-closed-outline" size={20} color={colors.primary[800]} />}
                    />

                    <View className="mt-2">
                        <Button
                            title="Login"
                            onPress={handleLogin}
                            color="primary"
                            type="solid"
                            icon={<Ionicons name="log-in-outline" size={20} color="white" />}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleForgotPassword}
                        className="mt-4"
                    >
                        <Text
                            className="text-base text-center"
                            style={{ color: colors.text.secondary }}
                        >
                            {t('login.forgotPassword')}
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-4 items-center">
                        <Text
                            className="text-base"
                            style={{ color: colors.text.primary }}
                        >
                            {t('login.noAccount')}
                        </Text>
                        <TouchableOpacity
                            onPress={handleRegister}
                            className="mt-1"
                        >
                            <Text
                                className="text-base font-semibold"
                                style={{ color: colors.nuro.tertiary }}
                            >
                                {t('login.register_no_account')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </LinearGradient>
        </View>
    )
}
