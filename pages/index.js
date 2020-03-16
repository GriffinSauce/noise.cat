import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Layout from '../components/Layout';
import LoginButton from '../components/LoginButton';

const Home = () => {
  const { data } = useSWR(`/api/bands`, fetcher);
  if (data?.bands?.length) {
    window.location = `/bands/${data?.bands[0].slug}`;
  }
  return (
    <Layout header={false} footer={false}>
      <section className="text-center">
        <img
          className="inline-block w-20 mt-20 mb-10"
          src="/noisecat.svg"
          alt="logo"
        />
        <h1 className="mb-2 text-4xl">Noise.cat</h1>
        <p className="mb-20 text-gray-400 h2">Your band home</p>
        <LoginButton />
      </section>
    </Layout>
  );
};

export default Home;
