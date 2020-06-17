import { GetStaticProps, NextPage } from 'next';
import { Client, Prismic } from 'config/prismic';

import Layout from 'components/home/Layout';
import BlogCard from 'components/BlogCard';

interface Props {
  posts: Post[];
}

const BlogPage: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="container mx-auto">
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
              {posts.map((post, i) => {
                return <BlogCard post={post} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await Client().query(
      Prismic.Predicates.at('document.type', 'blog'),
      { orderings: '[my.blog.date desc]' }
    );

    return { props: { posts: response.results } };
  } catch (error) {
    return { props: { error: error.message } };
  }
};

export default BlogPage;