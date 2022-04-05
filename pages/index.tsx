import siteInfo from 'data/siteinfo.json'
import { Ublock } from '@marceloglacial/rds-beta'
import PageLayout from 'components/PageLayout/PageLayout'
import { FC } from 'react'
import UserProvider from 'context/UserContext'

const Home: FC = (): JSX.Element => {
    return (
        <UserProvider>
            <PageLayout {...siteInfo}>
                <Ublock>
                    <p>
                        Carleton&apos;s Raven Design System (RDS) was built to
                        help deliver a unified experience across our many
                        digital properties. By establishing a harmonious, single
                        source of truth for our design decisions and development
                        guidelines, RDS increases the efficiency campus-wide
                        teams are able to build consistent, on-brand, and
                        user-focused websites and applications.
                    </p>
                </Ublock>
            </PageLayout>
        </UserProvider>
    )
}
export default Home
