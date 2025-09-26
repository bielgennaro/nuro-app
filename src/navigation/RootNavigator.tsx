import { OnboardingScreen } from '@/features/auth/screens/OnboardingScreen'
import { useState } from 'react'

export enum Screen {
    ONBOARDING = 'onboarding',
    // Adicione outras telas aqui futuramente
    // HOME = 'home',
    // PROFILE = 'profile',
    // MEDITATION = 'meditation',
}

export function RootNavigator() {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.ONBOARDING)

    const navigateTo = (screen: Screen) => {
        setCurrentScreen(screen)
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.ONBOARDING:
                return <OnboardingScreen />
            default:
                return <OnboardingScreen />
        }
    }

    return renderScreen()
}
