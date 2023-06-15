import { FlickerDocLarge } from '@/constants';

import Container from './container';

export default function Footer() {
  const navigation = ['Features', 'Pricing', 'Company'];
  const legal = ['Terms', 'Privacy', 'Legal'];
  return (
    <div className='relative'>
      <Container>
        <div className='mx-auto mt-5 grid max-w-screen-xl grid-cols-1 gap-10 border-t border-gray-100 pt-10  lg:grid-cols-5'>
          <div className='lg:col-span-2'>
            <div>
              <a href='/' className='flex items-center text-2xl font-medium text-indigo-500 '>
                <FlickerDocLarge />
              </a>
            </div>
          </div>

          <div>
            <div className='-ml-3 -mt-2 flex w-full flex-wrap lg:ml-0'>
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href='/'
                  className='w-full rounded-md px-4 py-2 text-gray-500  hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className='-ml-3 -mt-2 flex w-full flex-wrap lg:ml-0'>
              {legal.map((item, index) => (
                <a
                  key={index}
                  href='/'
                  className='w-full rounded-md px-4 py-2 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className=''>
            <div>Follow us</div>
            <div className='mt-5 flex space-x-5 text-gray-400 '>
              <a
                href='https://github.com/pesto-students/team-chiranjib-2-flicker-docs'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='sr-only'>GitHub</span>
                <GitHub />
              </a>
              <a href='' target='_blank' rel='noopener'>
                <span className='sr-only'>Twitter</span>
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        <div className='my-10 text-center text-sm text-gray-600 '>
          Copyright © {new Date().getFullYear()}. Made with ♥ by{' '}
          <a href='https://web3templates.com/' target='_blank' rel='noopener noreferrer'>
            Flicker Docs.
          </a>
        </div>
      </Container>
    </div>
  );
}

const GitHub = ({ size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    data-name='Layer 1'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    id='github'
    fill='currentColor'
  >
    <path d='M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z'></path>
  </svg>
);

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
  >
    <path d='M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z' />
  </svg>
);
