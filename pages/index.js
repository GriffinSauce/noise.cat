import Layout from '../components/Layout';
import Nav from '../components/Nav';
import LoginButton from '../components/LoginButton';

const Home = () => {
  return (
    <Layout footer={false}>
      <section className="text-center ">
        <img className="inline-block w-20 mt-20 mb-10" src="/noisecat.svg" />
        <h1 className="mb-2 text-4xl">Noise.cat</h1>
        <p className="mb-20 text-gray-400 h2">Your band home</p>

        <LoginButton />
      </section>
    </Layout>
  );
};

export default Home;
