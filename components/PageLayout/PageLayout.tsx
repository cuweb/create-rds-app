import Head from 'next/head'
import {
    Layout,
    Aside,
    Main,
    Banner,
    FooterSitemap,
    FooterBrand,
} from '@marceloglacial/rds-beta'
import PageSideBar from 'components/PageSidebar/PageSidebar'

interface PageLayoutProps {
    siteTitle: string
    siteDescription: string
    siteKeywords: string
    siteImage: SiteImageProps
    siteFavicon: {
        url: string
    }
}

interface SiteImageProps {
    formats: {
        small: {
            url: string
        }
    }
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
    const { children } = props
    const { siteTitle, siteDescription, siteKeywords, siteImage, siteFavicon } =
        props

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <meta name='robots' content='index, follow' />
                <meta name='description' content={siteDescription} />
                <meta name='keywords' content={siteKeywords} />
                <meta property='og:title' content={siteTitle} />
                <meta property='og:description' content={siteDescription} />
                <meta
                    property='og:image'
                    content={siteImage?.formats.small.url}
                />
                <link
                    rel='apple-touch-icon'
                    href={siteImage?.formats.small.url}
                />
                <link rel='icon' type='image/png' href={siteFavicon.url}></link>
            </Head>
            <header>
                <Banner title='Welcome to RDS' />
            </header>
            <Layout type='am'>
                <Aside>
                    <PageSideBar />
                </Aside>
                <Main>{children}</Main>
            </Layout>
            <footer>
                <FooterSitemap />
                <FooterBrand />
            </footer>
        </>
    )
}
export default PageLayout
