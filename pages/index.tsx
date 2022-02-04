import siteInfo from 'data/siteinfo.json'
import { Masthead } from '@marceloglacial/rds-beta'
import PageLayout from 'components/PageLayout/PageLayout'

export default function Home() {
    return (
        <>
            <Masthead title='Ravens Design System'>
                <a href='#'>Menu Item</a>
            </Masthead>
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
