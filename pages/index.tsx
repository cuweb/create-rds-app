import siteInfo from 'data/siteinfo.json'
import { Masthead, ButtonCTA } from '@marceloglacial/rds-beta'
import PageLayout from 'components/PageLayout/PageLayout'
const actions = {
    login: {
        title: 'Login to Your App',
        forgetLink: '/',
        registerLink: '/',
        onSubmit: (e: any) => {
            e.preventDefault()
            alert('Login')
        },
    },
}
export default function Home() {
    return (
        <>
            <Masthead
                title='Ravens Design System'
                url={'/'}
                menu={[
                    {
                        title: 'Item 1',
                        linl: '#',
                    },
                    {
                        title: 'Item 2',
                        linl: '#',
                    },
                ]}
                actions={actions}
            />
            <PageLayout {...siteInfo}>
                <p>
                    Carleton&apos;s Raven Design System (RDS) was built to help
                    deliver a unified experience across our many digital
                    properties. By establishing a harmonious, single source of
                    truth for our design decisions and development guidelines,
                    RDS increases the efficiency campus-wide teams are able to
                    build consistent, on-brand, and user-focused websites and
                    applications.
                </p>
            </PageLayout>
        </>
    )
}
