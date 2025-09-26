import { Text, TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        }
    })

    const handlePressIn = () => {
        scale.value = withSpring(0.95)
        opacity.value = withTiming(0.8)
    }

    const handlePressOut = () => {
        scale.value = withSpring(1)
        opacity.value = withTiming(1)
    }

    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={animatedStyle}
            className={`bg-nuro-green-500 py-4 px-8 rounded-full ${className}`}
            activeOpacity={1}
        >
            <Text className="text-white text-lg font-semibold text-center">
                {title}
            </Text>
        </AnimatedTouchableOpacity>
    )
}
