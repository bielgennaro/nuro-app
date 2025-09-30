import { useState } from 'react'
import { LoginScreen } from '@/features/auth/screens/LoginScreen'
import { OnboardingScreen } from '@/features/auth/screens/OnboardingScreen'

export enum Screen {
    LOGIN = 'login',
    ONBOARDING = 'onboarding',
    // HOME = 'home',
    // PROFILE = 'profile',
    // MEDITATION = 'meditation',
}

export function RootNavigator() {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN)

    const navigateTo = (screen: Screen) => {
        setCurrentScreen(screen)
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.LOGIN:
                return <LoginScreen />
            case Screen.ONBOARDING:
                return <OnboardingScreen />
            default:
                return <LoginScreen />
        }
    }

    return renderScreen()
}
