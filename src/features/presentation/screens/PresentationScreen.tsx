import { Button } from '@/components/ui/Button'
import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, Pressable, Text, View } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
import { Toast } from 'toastify-react-native'

interface Mood {
    id: string
    image: any
}

const moods: Mood[] = [
    { id: 'adhd', image: require('../../../../assets/moods/tdah.jpg') },
    { id: 'depression', image: require('../../../../assets/moods/depression.jpg') },
    { id: 'focus', image: require('../../../../assets/moods/focus.jpg') },
    { id: 'panic', image: require('../../../../assets/moods/panic.png') },
    { id: 'sleep', image: require('../../../../assets/moods/sleep.jpg') },
    { id: 'stress', image: require('../../../../assets/moods/stress.jpg') },
]

interface MoodCardProps {
    mood: Mood
    isSelected: boolean
    onPress: () => void
}

function MoodCard({ mood, isSelected, onPress }: MoodCardProps) {
    const { t } = useTranslation()
    const scale = useSharedValue(1)
    const borderWidth = useSharedValue(0)
    const checkScale = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        }
    })

    const imageContainerStyle = useAnimatedStyle(() => {
        return {
            borderWidth: borderWidth.value,
            borderColor: colors.nuro.tertiary,
            borderRadius: 27,
        }
    })

    const checkAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: checkScale.value }],
            opacity: checkScale.value,
        }
    })

    const handlePressIn = () => {
        scale.value = withSpring(0.95)
    }

    const handlePressOut = () => {
        scale.value = withSpring(1)
    }

    const handlePress = () => {
        onPress()
    }

    useEffect(() => {
        borderWidth.value = withTiming(isSelected ? 3 : 0, { duration: 300 })
        checkScale.value = withSpring(isSelected ? 1 : 0, { damping: 15, stiffness: 200 })
    }, [isSelected])

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            className="flex-1"
        >
            <Animated.View
                className="items-center justify-center"
                style={animatedStyle}
            >
                <Animated.View style={imageContainerStyle}>
                    <Image
                        source={mood.image}
                        style={{ width: 110, height: 150, borderRadius: 24 }}
                        resizeMode="cover"
                    />

                    <Animated.View
                        style={[checkAnimatedStyle, { position: 'absolute', top: 8, right: 8 }]}
                        className="bg-green-500 rounded-full p-1"
                    >
                        <Ionicons name="checkmark" size={20} color="white" />
                    </Animated.View>
                </Animated.View>

                <Text
                    className="mt-1 mb-3 text-base font-semibold text-center"
                    style={{ color: colors.text.primary }}
                >
                    {t(`presentation.moods.${mood.id}`)}
                </Text>
            </Animated.View>
        </Pressable>
    )
}

export function PresentationScreen() {
    const { t } = useTranslation()
    const [selectedMoods, setSelectedMoods] = useState<string[]>([])

    const toggleMood = (moodId: string) => {
        setSelectedMoods((prev) => {
            if (prev.includes(moodId)) {
                return prev.filter(id => id !== moodId)
            }
            return [...prev, moodId]
        })
    }

    const handleContinue = () => {
        Toast.show({
            type: 'success',
            text1: 'Obrigado por assistir!!',
            position: 'center',
            visibilityTime: 6000,
            icon: 'thumbs-up',
        })
    }

    return (
        <View className="flex-1">
            <LinearGradient
                colors={[colors.gradients.nuroCalm[1], colors.gradients.nuroCalm[0]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <View className="flex-1 px-6 pt-5">
                    <Text
                        className="text-3xl font-bold text-center"
                        style={{ color: colors.text.primary }}
                    >
                        {t('presentation.title')}
                    </Text>
                    <Text
                        className="text-base text-center mb-4"
                        style={{ color: colors.text.secondary }}
                    >
                        {t('presentation.subtitle')}
                    </Text>

                    <FlatList
                        data={moods}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        renderItem={({ item }) => (
                            <MoodCard
                                mood={item}
                                isSelected={selectedMoods.includes(item.id)}
                                onPress={() => toggleMood(item.id)}
                            />
                        )}
                    />

                    <View className="absolute bottom-8 left-6 right-6">
                        <Button
                            title={t('common.continue')}
                            onPress={handleContinue}
                            color="primary"
                            type="solid"
                            // disabled={selectedMoods.length === 0}
                            icon={<Ionicons name="arrow-forward-outline" size={20} color="white" />}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
