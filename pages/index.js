import axios from 'axios';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Card from '../components/Card';

export default function Home({ dailyData, cases }) {
  const {
    UpdateDate,
    Confirmed,
    NewConfirmed,
    Recovered,
    NewRecovered,
    Hospitalized,
    NewHospitalized,
    Deaths,
    NewDeaths,
  } = dailyData;

  const todayFormat = dayjs().format('YYYY-MM-DD');
  const todayCases = cases.Data.filter(
    (data) => data.ConfirmDate.substr(0, 10) === todayFormat
  );
  const nonthaburiTodayCases = todayCases.filter(
    (data) => data.Province === 'นนทบุรี'
  );
  // const bkkTodayCases = todayCases.filter((data) =>
  //   data.Province.includes('กรุงเทพ')
  // );

  const confirmed = Number.parseInt(Confirmed, 10);
  const newConfirmed = Number.parseInt(NewConfirmed, 10);
  const recovered = Number.parseInt(Recovered, 10);
  const newRecovered = Number.parseInt(NewRecovered, 10);
  const hospitalized = Number.parseInt(Hospitalized, 10);
  const newHospitalized = Number.parseInt(NewHospitalized, 10);
  const deaths = Number.parseInt(Deaths, 10);
  const newDeaths = Number.parseInt(NewDeaths, 10);

  return (
    <div className='container mx-auto my-5 text-lg px-5'>
      <p className='text-sm text-gray-400 mb-5'>
        Update โควิดประจำวันที่ {UpdateDate.substr(0, 10)} เวลา{' '}
        {UpdateDate.substr(10, UpdateDate.length)}
      </p>
      <div className='grid xs:grid-cols-2 sm:grid-cols-3 gap-8 text-center'>
        <Card
          title='ติดเชื้อสะสม'
          content={`${confirmed} (${
            newConfirmed > 0 ? '+' : ''
          }${newConfirmed})`}
        />
        <Card
          title='หายแล้ว'
          content={`${recovered} (${
            newRecovered > 0 ? '+' : ''
          }${newRecovered})`}
        />
        <Card
          title='รักษาอยู่ใน ร.พ.'
          content={`${hospitalized} (${
            newHospitalized > 0 ? '+' : ''
          }${newHospitalized})`}
        />
        <Card
          title='เสียชีวิต'
          content={`${deaths} (${newDeaths > 0 ? '+' : ''}${newDeaths})`}
        />
        <Card
          title='ผู้เสียชีวิตทั้งหมด / ผู้ติดเชื้อสะสม'
          content={`${((deaths / confirmed) * 100).toFixed(2)}%`}
        />
      </div>
      <hr className='mt-4 border-gray-100' />
      <div className='grid xs:grid-cols-2 sm:grid-cols-3 gap-8 text-center mt-4'>
        <Card title='จังหวัดนนทบุรี'>
          <>
            <p>
              ผู้ติดใหม่วันนี้{' '}
              <span className='font-bold'>{nonthaburiTodayCases.length}</span>
            </p>
            {nonthaburiTodayCases.map(({ District }) => (
              <p>อำเภอ: {District}</p>
            ))}
          </>
        </Card>
      </div>
    </div>
  );
}

Home.propTypes = {
  dailyData: PropTypes.shape({
    Confirmed: PropTypes.number,
    NewConfirmed: PropTypes.number,
    UpdateDate: PropTypes.string,
    Recovered: PropTypes.number,
    NewRecovered: PropTypes.number,
    Hospitalized: PropTypes.number,
    NewHospitalized: PropTypes.number,
    Deaths: PropTypes.number,
    NewDeaths: PropTypes.number,
  }),
  cases: PropTypes.shape({
    Data: PropTypes.arrayOf(PropTypes.object),
  }),
};

Home.defaultProps = {
  dailyData: {
    Confirmed: null,
    NewConfirmed: null,
    UpdateDate: null,
    Recovered: null,
    NewRecovered: null,
    Hospitalized: null,
    NewHospitalized: null,
    Deaths: null,
    NewDeaths: null,
  },
  cases: {},
};

export async function getServerSideProps() {
  const res1 = await axios.get('https://covid19.th-stat.com/api/open/today');
  const res2 = await axios.get('https://covid19.th-stat.com/api/open/cases');

  return {
    props: {
      dailyData: res1.data,
      cases: res2.data,
    },
  };
}
