import siteInfo from 'data/siteinfo.json'
import { Masthead } from '@marceloglacial/rds-beta'
import PageLayout from 'components/PageLayout/PageLayout'
import { useSession } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession()

    const actions = {
        buttons: [
            {
                title: session?.user?.name || 'Sign In',
                link: session?.user ? '/api/auth/signout' : '/api/auth/signin',
                color: 'red',
            },
        ],
    }

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
