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
                <h2>Content</h2>
            </PageLayout>
        </>
    )
}
