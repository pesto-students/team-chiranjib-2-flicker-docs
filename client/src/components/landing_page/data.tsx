import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from '@heroicons/react/24/solid';

import benefitOneImg from '@/constants/img/benefit-one.png';
import benefitTwoImg from '@/constants/img/benefit-two.png';

const benefitOne = {
  title: 'Seamless Editing and Collaboration',
  desc: 'Effortlessly edit and collaborate on documents with Flicker Docs, revolutionizing your workflow.',
  image: benefitOneImg,
  bullets: [
    {
      title: 'Real-Time Collaboration',
      desc: 'Seamlessly collaborate with multiple users in real time, boosting productivity and teamwork.',
      icon: <FaceSmileIcon />,
    },
    {
      title: 'AI-Powered Assistance',
      desc: 'Get instant ideas and suggestions from our AI assistant to enhance your content as you edit.',
      icon: <ChartBarSquareIcon />,
    },
    {
      title: 'Intuitive Interface',
      desc: 'Enjoy a user-friendly platform that makes document editing and collaboration effortless.',
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: 'Boost Productivity and Efficiency',
  desc: 'Flicker Docs empowers you to maximize productivity and efficiency in your document editing and collaboration processes.',
  image: benefitTwoImg,
  bullets: [
    {
      title: 'Flexible Document Sharing',
      desc: 'Easily create and share unlimited documents with anyone, anywhere, without limitations.',
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: 'Cutting-Edge AI Technology',
      desc: 'Leverage the power of AI for automated tasks, improved accuracy, and time savings.',
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: 'Streamlined Workflow',
      desc: 'Simplify your document creation and collaboration process for enhanced efficiency.',
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
