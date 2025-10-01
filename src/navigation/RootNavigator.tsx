import { createContext, useState, useContext } from 'react'
import { LoginScreen } from '@/features/auth/screens/LoginScreen'
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen'
import { OnboardingScreen } from '@/features/auth/screens/OnboardingScreen'

export enum Screen {
    LOGIN = 'login',
    REGISTER = 'register',
    ONBOARDING = 'onboarding',
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
