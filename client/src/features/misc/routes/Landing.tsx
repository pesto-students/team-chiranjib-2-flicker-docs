import Benefits from '@/components/landing_page/benefits';
import { benefitOne, benefitTwo } from '@/components/landing_page/data';
import Faq from '@/components/landing_page/faq';
import Footer from '@/components/landing_page/footer';
import Hero from '@/components/landing_page/hero';
import Navbar from '@/components/landing_page/navbar';
import SectionTitle from '@/components/landing_page/sectionTitle';

export const Landing = () => {
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
      {/* <SectionTitle pretitle='Watch a video' title='Learn how to fullfil your needs'>
        A quick demo of Flicker Docs and its features.
      </SectionTitle> */}
      {/* <Video /> */}
      <SectionTitle pretitle='FAQ' title='Frequently Asked Questions'></SectionTitle>
      <Faq />
      <Footer />
    </>
  );
};
