import Head from 'next/head'
import {
    Layout,
    Banner,
    FooterSitemap,
    FooterBrand,
    Masthead,
} from '@marceloglacial/rds-beta'
import { useContext } from 'react'
import { UserContext } from 'context/UserContext'

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
    const { userInfo } = useContext(UserContext)

    const actions = {
        buttons: [
            {
                title: userInfo ? `Logout` : 'Login',
                link: userInfo?.user ? '/api/auth/signout' : '/api/auth/signin',
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
