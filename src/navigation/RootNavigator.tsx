import { LoginScreen } from '@/features/auth/screens/LoginScreen'
import { OnboardingScreen } from '@/features/auth/screens/OnboardingScreen'
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen'
import { PresentationScreen } from '@/features/presentation/screens/PresentationScreen'
import { createContext, useContext, useState } from 'react'

export enum Screen {
    LOGIN = 'login',
    REGISTER = 'register',
    ONBOARDING = 'onboarding',
    PRESENTATION = 'presentation',
    // HOME = 'home',
    // PROFILE = 'profile',
    // MEDITATION = 'meditation',
}

interface NavigationContextType {
    navigateTo: (screen: Screen) => void
    currentScreen: Screen
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider')
    }
    return context
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
            case Screen.REGISTER:
                return <RegisterScreen />
            case Screen.ONBOARDING:
                return <OnboardingScreen />
            case Screen.PRESENTATION:
                return <PresentationScreen />
            default:
                return <LoginScreen />
        }
    }

    return (
        <NavigationContext.Provider value={{ navigateTo, currentScreen }}>
            {renderScreen()}
        </NavigationContext.Provider>
    )
}
