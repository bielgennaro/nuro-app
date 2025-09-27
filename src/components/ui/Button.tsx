import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/constants/colors'

interface ButtonProps {
    title?: string
    onPress: () => void
    color?: 'primary' | 'secondary' | 'tertiary'
    type?: 'solid' | 'outline' | 'ghost' | 'iconOnly'
    icon?: React.ReactNode
    disabled?: boolean
}

export function Button({
    title,
    onPress,
    color = 'primary',
    type = 'solid',
    icon,
    disabled = false,
}: ButtonProps) {
    const getButtonStyles = () => {
        const baseStyles = 'flex-row items-center justify-center py-2 rounded-md transition-all duration-200'

        if (type === 'iconOnly') {
            return `${baseStyles} w-12 h-12 rounded-full p-0`
        }

        return baseStyles
    }

    const getColorStyles = () => {
        const colorMap = {
            primary: {
                solid: {
                    bg: colors.nuro.tertiary,
                    text: colors.text.inverse,
                    border: 'transparent',
                },
                outline: {
                    bg: 'transparent',
                    text: colors.nuro.primary,
                    border: colors.nuro.primary,
                },
                ghost: {
                    bg: colors.surface.glass.medium,
                    text: colors.nuro.primary,
                    border: colors.surface.glass.light,
                },
            },
            secondary: {
                solid: {
                    bg: colors.nuro.primary,
                    text: colors.text.inverse,
                    border: 'transparent',
                },
                outline: {
                    bg: 'transparent',
                    text: colors.nuro.secondary,
                    border: colors.nuro.secondary,
                },
                ghost: {
                    bg: colors.surface.glass.light,
                    text: colors.nuro.secondary,
                    border: colors.surface.glass.medium,
                },
            },
            tertiary: {
                solid: {
                    bg: colors.nuro.tertiary,
                    text: colors.text.inverse,
                    border: 'transparent',
                },
                outline: {
                    bg: 'transparent',
                    text: colors.nuro.tertiary,
                    border: colors.nuro.tertiary,
                },
                ghost: {
                    bg: colors.surface.glass.dark,
                    text: colors.nuro.tertiary,
                    border: colors.surface.glass.medium,
                },
            },
        }

        return colorMap[color][type] || colorMap.primary.solid
    }

    const colorStyles = getColorStyles()
    const buttonClasses = getButtonStyles()

    const getBorderStyle = () => {
        if (type === 'outline' || type === 'ghost') {
            return {
                borderWidth: 1,
                borderColor: colorStyles.border,
            }
        }
        return {}
    }

    const getOpacityStyle = () => {
        if (disabled) {
            return { opacity: 0.5 }
        }
        return {}
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={buttonClasses}
            style={{
                backgroundColor: colorStyles.bg,
                ...getBorderStyle(),
                ...getOpacityStyle(),
                ...(type === 'ghost' && {
                    backdropFilter: 'blur(10px)',
                    borderColor: colorStyles.border,
                }),
            }}
            activeOpacity={0.8}
        >
            {icon && (
                <View className={type === 'iconOnly' ? '' : 'mr-2'}>
                    {icon}
                </View>
            )}
            {type !== 'iconOnly' && title && (
                <Text
                    className="font-semibold text-base"
                    style={{ color: colorStyles.text }}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}
