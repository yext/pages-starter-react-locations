import Banner from '../components/banner';
import Header from '../components/header';
import Footer from '../components/footer';
import Cta from '../components/cta';
import Contact from '../components/contact';
import List from '../components/list';
import Hours from '../components/hours';
import StaticMap from '../components/static-map';
import { reactWrapper } from '../wrapper';
import { renderToString } from 'react-dom/server';
import '../index.css';

export const config = {
  name: 'index',
  hydrate: true,
  streamId: 'products',
  stream: {
    $id: 'products',
    source: 'knowledgeGraph',
    destination: 'pages',
    fields: [
      'id',
      'uid',
      'meta',
      'name',
      'address',
      'mainPhone',
      'description',
      'hours',
      'photoGallery',
      'slug',
      'geocodedCoordinate',
      'services',
      'neighborhood',
      'paymentOptions',
      'c_relatedFAQs.question',
      'c_relatedFAQs.answer',
    ],
    filter: {
      entityTypes: ['location'],
    },
    localization: {
      locales: ['en'],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `index/${data.document.streamOutput.uid.toString()}`;
};

const Index = (props: any) => {
  const { document } = props;
  const { streamOutput } = document;
  const { name, address, openTime, hours, mainPhone, _site, geocodedCoordinate, services, photoGallery } = streamOutput;

  return (
    <>
      <div className="centered-container">
        <Header
          logo="https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc"
          links={_site.c_header}
        ></Header>
      </div>
      <Banner name={name} address={address} openTime={openTime}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4 rounded-lg">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta buttonText="Get Directions" url="http://google.com" style="primary-cta" />
        </div>
      </Banner>
      <div className="centered-container">
        <div className="section">
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            <div className="bg-gray-100 p-5 space-y-12">
              <Contact address={address} phone={mainPhone}></Contact>
              <List list={services}></List>
            </div>
            <div className="col-span-2 pt-5 space-y-10">
              <div>{hours && <Hours title={'Restaurant Hours'} hours={hours} />}</div>
              <StaticMap latitude={geocodedCoordinate.latitude} longitude={geocodedCoordinate.longitude}></StaticMap>
            </div>
          </div>
        </div>
        {/* <div className="section">
          <PhotoGallery photoGallery={photoGallery}></PhotoGallery>
        </div> */}
        {/* <div className="section">
        </div> */}
        <Footer></Footer>
      </div>
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'index', 'index.tsx', renderToString(<Index data={data} />), config.hydrate);

export default Index;
