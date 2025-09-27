import { colors } from '@/constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated'

interface AnimatedButtonProps {
    title: string
    onPress: () => void
    className?: string
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export function AnimatedButton({ title, onPress, className }: AnimatedButtonProps) {
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)
    const glowIntensity = useSharedValue(0)

    useEffect(() => {
        glowIntensity.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.bezier(0.4, 0.0, 0.6, 1.0) }),
            -1,
            true,
        )
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        }
    })

    const glowStyle = useAnimatedStyle(() => ({
        shadowOpacity: 0.25 + glowIntensity.value * 0.15,
        shadowRadius: 8 + glowIntensity.value * 4,
        shadowColor: colors.primary[500],
        elevation: 6,
    }))

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 })
        opacity.value = withTiming(0.9, { duration: 100 })
    }

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 })
        opacity.value = withTiming(1, { duration: 150 })
    }

    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[animatedStyle, glowStyle]}
            className={`overflow-hidden rounded-2xl ${className}`}
            activeOpacity={1}
        >
            <View className="relative">
                <LinearGradient
                    colors={[colors.primary[400], colors.primary[600]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="py-4 px-8 rounded-2xl"
                >
                    <Text
                        style={{
                            color: colors.text.inverse,
                            fontSize: 18,
                            fontWeight: '700',
                            textAlign: 'center',
                        }}
                    >
                        {title}
                    </Text>
                </LinearGradient>
            </View>
        </AnimatedTouchableOpacity>
    )
}
