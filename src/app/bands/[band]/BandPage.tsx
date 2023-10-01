'use client';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Shows from 'components/Shows';
import Container from 'components/Container';

const Band = () => {
  return (
    <Layout>
      <Container>
        <div className="p-4">
          <h1 className="mb-3">Shows</h1>
          <div className="flex mb-4 bg-gray-100 rounded">
            <Button color="green">Confirmed</Button>
            <Button group>Maybe</Button>
            <Button group>Everything</Button>
          </div>
          <Shows />
        </div>
      </Container>
    </Layout>
  );
};

export default Band;
