const PageSideBar: React.FC = (props) => {
    const { children } = props
    return (
        <section>
            <h3>Sidebar</h3>
            <p>Future content</p>
            {children}
        </section>
    )
}
export default PageSideBar
