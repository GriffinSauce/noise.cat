import Layout from 'components/Layout';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout header={false} footer={false}>
      {children}
    </Layout>
  );
};

export default PageLayout;
