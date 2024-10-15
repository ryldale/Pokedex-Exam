import dynamic from 'next/dynamic';

const CapturedPage = dynamic(() => import('@/modules/captured/pages/page'));

const Page = () => {
  return <CapturedPage />;
};

export default Page;
