import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, View } from 'react-native'
import Animated, {
    Easing,
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'
import { Button } from '@/components/ui/Button'
import { colors } from '@/constants/colors'
import { useAuthStore } from '@/features/auth/store/auth.store'
import NuroNoBackground from '../../../../assets/nuro-no-background1.0.png'

export function OnboardingScreen() {
    const { t } = useTranslation()
    const { user, getMe } = useAuthStore()

    const handleGetStarted = () => {
        // TODO
    }

    const breathingScale = useSharedValue(1)
    const buttonPulse = useSharedValue(1)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await getMe()
            }
            catch (error) {
                console.error('Erro ao buscar dados do usuário:', error)
            }
        }

        fetchUserData()

        breathingScale.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            false,
        )

        buttonPulse.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            false,
        )
    }, [])

    const mascotAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: breathingScale.value }],
    }))

    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonPulse.value }],
    }))

    return (
        <View className="flex-1">
            <LinearGradient
                colors={[colors.gradients.nuroCalm[1], colors.gradients.nuroCalm[0]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <View className="pt-10 justify-center items-center">
                    <Animated.View style={mascotAnimatedStyle}>
                        <Image
                            source={NuroNoBackground}
                            style={{ width: 350, height: 350 }}
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>

                <Animated.View
                    entering={FadeIn.delay(500).duration(800)}
                    className="text-left mt-8 px-5"
                >
                    <Text
                        className="text-3xl font-semibold text-left mb-3"
                        style={{ color: colors.text.primary }}
                    >
                        {t('onboarding.welcome', { name: user?.name || 'N/A' })}
                    </Text>
                    <Text
                        className="text-3xl font-bold text-gray-900 text-left leading-tight"
                        style={{ color: colors.text.primary }}
                    >
                        {t('onboarding.title')}
                    </Text>

                    <Text
                        className="text-lg text-left mt-3"
                    >
                        {t('onboarding.subtitle')}
                    </Text>
                </Animated.View>

                <Animated.View
                    entering={FadeIn.delay(1000).duration(600)}
                    className="absolute bottom-8 right-5 flex-row items-center"
                >
                    <Text
                        className="text-lg font-semibold mr-4"
                        style={{ color: colors.text.primary }}
                    >
                        {t('onboarding.getStarted')}
                    </Text>

                    <Animated.View style={buttonAnimatedStyle}>
                        <Button
                            onPress={handleGetStarted}
                            type="iconOnly"
                            icon={<Ionicons name="arrow-forward" size={24} color={colors.text.inverse} />}
                            color="secondary"
                        />
                    </Animated.View>
                </Animated.View>
            </LinearGradient>
        </View>
    )
}
