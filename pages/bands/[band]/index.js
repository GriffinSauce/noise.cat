import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../../utils/fetcher';
import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import Shows from '../../../components/Shows';
import { FiRotateCcw } from 'react-icons/fi';
import Container from '../../../components/Container';

const Band = () => {
  const {
    query: { band: bandSlug },
  } = useRouter();
  const { data: showsData } = useSWR(
    bandSlug ? `/api/bands/${bandSlug}/shows` : null,
    fetcher,
  );

  return (
    <Layout>
      <Container>
        <div className="p-4">
          <div className="flex mb-4 bg-gray-100 rounded">
            <Button color="green">Bevestigd</Button>
            <Button group>Maybe</Button>
            <Button group>Alles</Button>
          </div>

          <Shows shows={showsData?.shows} />
        </div>
      </Container>
    </Layout>
  );
};

export default Band;
