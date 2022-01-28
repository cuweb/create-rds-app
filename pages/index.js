import { Masthead, TextImage } from '@marceloglacial/rds-beta'
import { useState } from 'react'
import PageLayout from '../components/PageLayout/PageLayout'

export default function Home() {
    const [isHidden, setIsHidden] = useState(false)

    const handleClose = () => {
        setIsHidden(true)
    }

    return (
        <>
            <Masthead title='Ravens Design System' />
            <PageLayout>
                <TextImage
                    content='It is important to note the text is not intended to wrap around the image. In general, the amount of text used should be the same height as the image on large screens. This will, of course, differ if you use a large or small block size.'
                    direction='right'
                    image={{
                        alt: 'image',
                        src: 'https://via.placeholder.com/640x480',
                    }}
                    title='Image to the Right'
                />
            </PageLayout>
        </>
    )
}
