// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router';

// import { Button } from '@/components';
import Benefits from '@/components/landing_page/benefits';
import { benefitOne, benefitTwo } from '@/components/landing_page/data';
import Faq from '@/components/landing_page/faq';
import Footer from '@/components/landing_page/footer';
import Hero from '@/components/landing_page/hero';
import Navbar from '@/components/landing_page/navbar';
import SectionTitle from '@/components/landing_page/sectionTitle';
import Video from '@/components/landing_page/video';
// import { SignUp } from '@/features/auth';
// import { useAuth } from '@/hooks';
// import { logout } from '@/lib';

// const Home = ({ user }: { user: any }) => {
//   return (
//     <div className='flex justify-center pt-8'>
//       <div className='flex w-1/6 flex-col items-center gap-3'>
//         <img src={user.picture} alt='phot' className='rounded-full' />
//         <h3 className='font-semibold text-slate-600'>{user?.email}</h3>

//         <div>
//           <Button onClick={logout}>Logout</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

export const Landing = () => {
  // const navigate = useNavigate();

  // return (
  //   <>
  //     <div className='flex flex-col items-center gap-4 pt-8'>
  //       <h1 className='text-4xl'>Landing page</h1>
  //       <button
  //         onClick={() => {
  //           if (user) {
  //             navigate('/dashboard');
  //           } else {
  //             toast.error('You need to login first');
  //           }
  //         }}
  //         className='content-center rounded-md bg-black p-3 text-white'
  //       >
  //         Go to docs
  //       </button>
  //     </div>
  //     {user ? <Home user={user} /> : <SignUp />}
  //     <Toaster position='top-center' reverseOrder={false} />
  //   </>
  // );
  return (
    <>
      <Navbar />

      <Hero />
      <SectionTitle title='Why Flicker Docs'>
        Experience cutting-edge AI technology for effortless editing and seamless collaboration.
        Boost productivity, revolutionize your workflow, and elevate your document editing to a new
        era of efficiency. Choose Flicker Docs for a modern and innovative approach to enhance your
        work process.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos='right' data={benefitTwo} />
      <SectionTitle pretitle='Watch a video' title='Learn how to fullfil your needs'>
        A quick demo of Flicker Docs and its features.
      </SectionTitle>
      <Video />
      <SectionTitle pretitle='FAQ' title='Frequently Asked Questions'></SectionTitle>
      <Faq />
      <Footer />
    </>
  );
};
