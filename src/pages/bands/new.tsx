import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import fetcher from 'utils/fetcher';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Button from 'components/Button';
import { Band } from '@prisma/client';
import { PostResponse } from 'pages/api/bands';

interface FieldValues {
  name: string;
}

const FormError = ({ children }: { children: string }) => (
  <span className="absolute text-xs font-semibold">{children}</span>
);

const NewBandPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>();
  const [postState, setPostState] = useState<null | 'loading'>(null);

  const onSubmit = handleSubmit(async (band) => {
    setPostState('loading');

    let createdBand: Band;
    try {
      const response = await fetcher<PostResponse>(`/api/bands`, {
        method: 'POST',
        body: {
          band,
        },
      });
      createdBand = response.band;
    } catch (err) {
      console.error(err);
      return;
    }

    router.push(`/bands/${createdBand.slug}`);
  });

  return (
    <Layout>
      <Container>
        <div className="p-4">
          <h1 className="mb-3">Add your band</h1>
        </div>

        <form onSubmit={onSubmit} className="p-4 pt-0">
          <div className="grid gap-4 pb-8">
            <label htmlFor="band-name">
              name
              <input
                id="band-name"
                placeholder="The ..."
                {...register('name', {
                  required: `What is your band's name?`,
                })}
              />
              <FormError>{errors?.name?.message}</FormError>
            </label>
          </div>
          <Button color="green" type="submit" state={postState}>
            Add band
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default NewBandPage;
