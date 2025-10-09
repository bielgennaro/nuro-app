import { RootNavigator } from '@/navigation/RootNavigator'
import ToastManager from 'toastify-react-native'
import './global.css'
import './src/i18n'

export default function App() {
    return (
        <>
            <RootNavigator />
            <ToastManager
                position="top"
                topOffset={20}
                showCloseIcon={false}
                showProgressBar={false}
                theme="light"
            />
        </>
    )
}
