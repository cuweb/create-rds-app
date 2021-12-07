import {
  Layout,
  Aside,
  Main,
  Sidebar,
  Banner,
  Footer,
} from '@marceloglacial/rds-beta';

const PageLayout = (props) => {
  const { children } = props;
  return (
    <>
      <header>
        <Banner title='Welcome to RDS' />
      </header>
      <Layout type='ama'>
        <Aside>
          <h3>Left Aside</h3>
          <p>
            The left-side aside is intended for site navigation using the Menu
            block. The column has a fixed width of 200px, and disappears from
            view below 810px. While the main purposes of this aside is to
            contain a site navigation, additional aside blocks can be added
            below the menu.
          </p>
        </Aside>
        <Main>{children}</Main>
        <Sidebar>
          <h3>Right aside</h3>
          <p>
            The right-side aside is intended for providing content related to
            what is dispplayed in the main area. The column has a fixed width of
            270px, and drops below the main content area below 810px.
          </p>
        </Sidebar>
      </Layout>
      <footer>
        <Footer type='brand' />
      </footer>
    </>
  );
};
export default PageLayout;
