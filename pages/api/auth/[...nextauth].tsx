import NextAuth from 'next-auth'
import jwt_decode from 'jwt-decode'
interface ProfileProps {
    aud: string
    iss: string
    iat: number
    nbf: number
    exp: number
    auth_time: number
    sub: string
    upn: string
    unique_name: string
    sid: string
}

export default NextAuth({
    providers: [
        {
            clientId: process.env.NEXT_CU_CLIENT_ID,
            clientSecret: process.env.NEXT_CU_CLIENT_SECRET,
            id: 'Intranet',
            name: 'Carleton Credentials',
            type: 'oauth',
            token: 'https://cufed.carleton.ca/adfs/oauth2/token',
            userinfo: 'https://cufed.carleton.ca/adfs/oauth2/',
            wellKnown:
                'https://cufed.carleton.ca/adfs/.well-known/openid-configuration',
            issuer: 'https://apistoreuat3.carleton.ca/',
            idToken: true,
            authorization: {
                url: 'https://cufed.carleton.ca/adfs/oauth2/authorize/',
                params: {
                    scope: 'openid email profile',
                    resource: '104bea24-4674-498f-956b-96f8e5e96875',
                },
            },
            profile(profile: ProfileProps) {
                return {
                    id: profile.sid,
                    name: profile.unique_name,
                    email: profile.upn,
                }
            },
        },
    ],
    theme: {
        colorScheme: 'light',
    },

    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken
            if (session != null) {
                const accessToken = JSON.stringify(session.accessToken)
                const decodedValue = jwt_decode(accessToken)
                const cuGroups = Object.values(Object(decodedValue).cuGroups)
                cuGroups.forEach((element, index) => {
                    cuGroups[index] = JSON.stringify(element)
                        .split(',')[0]
                        .split('CN=')[1]
                })
                session.udcid = Object(decodedValue).udcid
                session.curoles = Object(decodedValue).curoles.split(',')
                session.cuGroups = cuGroups
            }
            const headers = new Headers()
            const bearer = `Bearer ${session.accessToken}`
            headers.append('Authorization', bearer)
            const requestInfo = process.env.NEXT_PUBLIC_BANNER_API_URL || ''
            const options = {
                method: 'GET',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }

            await fetch(requestInfo, options) //from intranet .env file
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    session.data = data
                })
                .catch((err) => console.log(err))
            return session
        },
    },
})
