import {FC ,PropsWithChildren,useReducer} from 'react'
import { UIContext,uiReducer } from './'

export interface UiState {
    isMenuOpen: boolean
}

const Ui_INITIAL_STATE : UiState = {
    isMenuOpen:false
}

export const UiProvider:FC<PropsWithChildren> = ({children}) =>{
    const [state,dispatch] = useReducer(uiReducer,Ui_INITIAL_STATE)

    const toggleSideMenu = () => {
        dispatch({type: '[Ui] - ToggleMenu'})
    }

    return (
        <UIContext.Provider value={{
            ...state,
            toggleSideMenu,
        }}>
        {children}
        </UIContext.Provider>
    )
}