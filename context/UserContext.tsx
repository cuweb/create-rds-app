import { FC, useState, createContext } from 'react'
import { useSession } from 'next-auth/react'

interface UserProps {
    userInfo: any
}

export const UserContext = createContext<UserProps | null>(null)

const UserProvider: FC = (props) => {
    const { data: sessionInfo } = useSession()
    // @ts-ignore TODO: Create banner types
    const user = sessionInfo?.data?.biographical || {}
    return (
        <UserContext.Provider
            value={{
                userInfo: user,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
