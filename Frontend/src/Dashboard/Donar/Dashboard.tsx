import { Button } from '@/components/ui/button';
import userImage from '../../assets/Donar_img/Dashboard.png';
import { Link } from 'react-router-dom';
import Chart from './Chart/Chartuser';
import { GraduationCap, BadgeCheck, Smile } from 'lucide-react';
import { Pie, PieChart, Tooltip as ChartTooltip, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import React from 'react';

const user = { name: 'Shreyash Padase' };

const missionVision = {
  mission:
    'Our mission is to bridge the gap between restaurants with surplus food and NGOs, ensuring that every meal reaches someone in need, reducing food waste, and making a positive impact in our community.',
  vision:
    'We dream of a world where no meal goes to waste, turning every leftover plate into a lifeline for those in need. Together, we create a compassionate and sustainable food cycle that nourishes communities.',
};

const donationData = [
  { name: 'Completed', visitors: 151 },
  { name: 'Ongoing', visitors: 27 },
];

const pendingData = [
  { name: 'Pending', visitors: 15 },
  { name: 'Completed', visitors: 136 },
];

const cancelledData = [
  { name: 'Cancelled', visitors: 8 },
  { name: 'Completed', visitors: 143 },
];

const totalDonations = 151;
const totalPending = 15;
const totalCancelled = 8;

const Dashboard = () => {
  return (
    <div className='p-4 bg-gray-50'>
      <div className='flex flex-col lg:flex-row gap-4'>
        {/* Welcome Section */}
        <div className='border shadow-sm w-full lg:w-9/12 px-5 py-3 rounded-md flex flex-col lg:flex-row items-center gap-10 bg-white'>
          <div className='flex flex-col gap-4 text-center lg:text-left'>
            <h1 className='text-3xl font-semibold'>Hi {user.name},</h1>
            <p className='text-lg text-gray-600'>
              What do you want to give today? <br /> Every donation helps make a difference!
            </p>
            <div className='flex items-center gap-2'>
              <Smile className='w-6 h-6 text-yellow-500' />
              <p className='text-sm text-gray-500'>Donate Food, Create Hope</p>
            </div>
            <Link to='/user/Donar/donationForm'>
              <Button className='bg-gray-800 hover:bg-gray-900 text-white'>Donate now</Button>
            </Link>
          </div>
          <img src={userImage} alt='user' className='w-[250px] md:w-[300px]' />
        </div>

        {/* Stats Section */}
        <div className='w-full lg:w-3/12 flex flex-col gap-4'>
          {[
            { title: 'Completed Donations', count: 151, icon: GraduationCap },
            { title: 'Ongoing Donations', count: 27, icon: BadgeCheck }
          ].map((stat, index) => (
            <div key={index} className='w-full p-4 rounded-md shadow-sm border bg-white flex flex-col items-center'>
              <div className='flex justify-between w-full'>
                <div className='w-[40px] h-[40px] rounded-full bg-blue-500 flex justify-center items-center'>
                  {React.createElement(stat.icon, { stroke: 'black', fill: 'white' })}
                </div>
                <div className='w-32'>
                  <Chart />
                </div>
              </div>
              <h1 className='text-lg font-semibold'>{stat.count}+</h1>
              <p className='text-gray-600'>{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Section with Gradient Pie Charts */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
        {[{ title: 'Donation Breakdown', data: donationData, total: totalDonations },
          { title: 'Pending Donations', data: pendingData, total: totalPending },
          { title: 'Cancelled Donations', data: cancelledData, total: totalCancelled }
        ].map((chart, index) => (
          <Card key={index} className='shadow-md border'>
            <CardHeader className='items-center pb-0'>
              <CardTitle className='text-xl font-bold'>{chart.title}</CardTitle>
              <CardDescription className='text-gray-600'>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <PieChart width={320} height={220}>
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id={`greenBlackGradient-${index}`} x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor='#064e3b' />
                    <stop offset='100%' stopColor='#000000' />
                  </linearGradient>
                </defs>
                
                <Pie
                  data={chart.data}
                  dataKey='visitors'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  innerRadius={65}
                  outerRadius={110}
                  strokeWidth={3}
                  label
                >
                  {chart.data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={`url(#greenBlackGradient-${index})`} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm text-gray-600'>
              <div className='leading-none'>Showing {chart.title.toLowerCase()} for the last 6 months</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Mission & Vision Section */}
      <div className='px-5 py-4 border shadow-sm rounded-sm bg-white mt-6'>
        <h2 className='font-semibold text-xl text-gray-800'>Our Mission</h2>
        <p className='text-gray-600'>{missionVision.mission}</p>
        <h2 className='mt-6 font-semibold text-xl text-gray-800'>Our Vision</h2>
        <p className='text-gray-600'>{missionVision.vision}</p>
      </div>
    </div>
  );
};

export default Dashboard;
