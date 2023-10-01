import { FunctionComponent } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

type Props = {
  children?: React.ReactNode;
  header?: boolean;
  footer?: boolean;
};

const Layout: FunctionComponent<Props> = ({
  children,
  header = true,
  footer = true,
}) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        {header ? <Header /> : null}
        <main className="flex-grow">{children}</main>
        {footer ? <Footer /> : null}
      </div>
    </>
  );
};

export default Layout;
