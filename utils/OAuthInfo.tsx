import { Session } from 'next-auth'
import jwt_decode from 'jwt-decode'

interface OAuthInfoProps {
    session: Session | null
}

const OAuthInfo: React.FC<OAuthInfoProps> = (session) => {
    if (session.session != null) {
        const accessToken = JSON.stringify(session.session.accessToken)
        const decodedValue = jwt_decode(accessToken)
        const cuGroups = Object.values(Object(decodedValue).cuGroups)
        cuGroups.forEach((element, index) => {
            cuGroups[index] = JSON.stringify(element)
                .split(',')[0]
                .split('CN=')[1]
        })
        const OAuthInfomation = {
            udcid: Object(decodedValue).udcid,
            curoles: Object(decodedValue).curoles.split(','),
            cuGroups: cuGroups,
        }
        console.log(OAuthInfomation)
    }

    return <></>
}
export default OAuthInfo
