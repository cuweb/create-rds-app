import Head from 'next/head'
import { Layout, Banner, FooterSitemap, FooterBrand, Masthead } from 'rds-ui'
import { useSession } from 'next-auth/react'

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
    const { data: sessionInfo } = useSession()
    // @ts-ignore TODO: Create banner types
    const userInfo = sessionInfo?.data?.biographical || {}

    const actions = {
        buttons: [
            {
                title: sessionInfo ? `Logout` : 'Login',
                link: sessionInfo?.user
                    ? '/api/auth/signout'
                    : '/api/auth/signin',
                icon: 'lock',
            },
        ],
    }

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
                <Banner
                    title={`Welcome to RDS ${userInfo.preferredName || ''}`}
                />
            </header>
            <Layout>{children}</Layout>
            <footer>
                <Masthead title={siteTitle} actions={actions} />
                <FooterSitemap />
                <FooterBrand />
            </footer>
        </>
    )
}
export default PageLayout
