import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { colors } from '@/constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'
import Animated, {
    Easing,
    FadeIn,
    interpolateColor,
    SlideInDown,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'
import NuroNoBackground from '../../../../assets/nuro-no-background.png'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export function OnboardingScreen() {
    const { t } = useTranslation()

    const handleGetStarted = () => {
    // TODO
    }

    const gradientProgress = useSharedValue(0)
    const mascotFloat = useSharedValue(0)
    const glowIntensity = useSharedValue(0)

    useEffect(() => {
        gradientProgress.value = withRepeat(
            withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true,
        )

        mascotFloat.value = withRepeat(
            withSequence(
                withTiming(-15, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
            ),
            -1,
            false,
        )

        glowIntensity.value = withRepeat(
            withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true,
        )
    }, [])

    const animatedGradientProps = useAnimatedProps(() => {
        const startColor = interpolateColor(
            gradientProgress.value,
            [0, 0.5, 1],
            [colors.gradients.meditation[0], colors.gradients.focus[0], colors.gradients.evening[0]],
        )
        const endColor = interpolateColor(
            gradientProgress.value,
            [0, 0.5, 1],
            [colors.gradients.meditation[1], colors.gradients.focus[1], colors.gradients.evening[1]],
        )

        return {
            colors: [startColor, endColor],
        }
    })

    const mascotAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: mascotFloat.value }],
    }))

    const glowAnimatedStyle = useAnimatedStyle(() => ({
        shadowOpacity: 0.3 + glowIntensity.value * 0.4,
        shadowRadius: 15 + glowIntensity.value * 10,
    }))

    return (
        <View className="flex-1">
            <AnimatedLinearGradient
                animatedProps={animatedGradientProps}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 justify-center items-center px-4"
            >
                <Animated.View
                    style={[mascotAnimatedStyle, glowAnimatedStyle]}
                    className="shadow-nuro-green"
                >
                    <Image
                        source={NuroNoBackground}
                        style={{ width: 350, height: 350 }}
                        resizeMode="contain"
                    />
                </Animated.View>

                <Animated.Text
                    entering={FadeIn.delay(800).duration(1000)}
                    className="text-2xl font-display font-semibold text-nuro-green-900 text-center px-8 mt-8 leading-relaxed"
                    style={{
                        textShadowColor: 'rgba(0, 0, 0, 0.1)',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                    }}
                >
                    {t('onboarding.title')}
                </Animated.Text>

                <Animated.Text
                    entering={FadeIn.delay(1200).duration(800)}
                    className="text-lg text-nuro-green-950 text-center px-8 mt-4 font-sans"
                    style={{
                        textShadowColor: 'rgba(0, 0, 0, 0.1)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                    }}
                >
                    {t('onboarding.subtitle')}
                </Animated.Text>

                <Animated.View
                    entering={SlideInDown.delay(1600).duration(600)}
                    className="mt-52 w-full max-w-sm"
                >
                    <AnimatedButton
                        title={t('onboarding.getStarted')}
                        onPress={handleGetStarted}
                        className="w-full"
                    />
                </Animated.View>
            </AnimatedLinearGradient>
        </View>
    )
}
