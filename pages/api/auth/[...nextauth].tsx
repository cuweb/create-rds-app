import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

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
            clientId: '38e7fd2b-1c52-46b7-87d9-cfc0522eab65',
            clientSecret: '6cNffK4TE_hlsWU8z1lXFLL0D079nvucgrXQdOjf',
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
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    theme: {
        colorScheme: 'light',
    },
    
    callbacks: {
        async jwt({ token, account}) {
            if (account) {
                token.accessToken = account.access_token
            }
            const str = JSON.stringify(token)
            console.log("JWT token: " + str)

            console.log("***************")
            const headers = new Headers();
            const bearer = `Bearer ${token.accessToken}`
            headers.append("Authorization", bearer);
            const options = {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              };

            await fetch("https://apistoreuat3.carleton.ca/api/v1/tax/personinfo", options) //from intranet .env file
              .then((res) => {
                console.log(res.json()); //Promise { <pending> }
              })
              .then((data) => {
                  console.log(JSON.stringify(data)); //undefined
              })
              .catch((err) => console.log(err));
            console.log("***************")
            return token
        },
        
        async session({ session, token}) {
            session.accessToken = token.accessToken
            return session
        },


    },
    
})
