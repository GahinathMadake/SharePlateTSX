import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Badge } from '@/components/ui/badge';

import ImageURL from './assets/food.png';
import Author from './assets/Gahinath.jpg';

// Import Components
import SearchBox from './Listings/SearchBox';
import Card from './Listings/Card';


const AvailableDonations = () => {

  const courses = [
    {
      title: "Full-Stack Web Development",
      branch: "Computer Science",
      duration: "6 Months",
      about: "Learn MERN stack development, including React, Node.js, Express, and MongoDB, to build modern web applications.",
      imageURL: ImageURL,
      author: "John Doe",
      authorImage: Author,
    },
    {
      title: "Data Structures and Algorithms",
      branch: "Computer Science",
      duration: "4 Months",
      about: "Master problem-solving techniques with DSA using C++ and Python, covering sorting, searching, dynamic programming, and graph algorithms.",
      imageURL: ImageURL,
      author: "Jane Smith",
      authorImage: Author,
    },
    {
      title: "Cybersecurity Essentials",
      branch: "Information Technology",
      duration: "3 Months",
      about: "Understand the fundamentals of cybersecurity, ethical hacking, network security, and cryptography to protect digital systems.",
      imageURL: ImageURL,
      author: "Alice Johnson",
      authorImage: Author,
    },
    {
      title: "Cloud Computing with AWS",
      branch: "Information Technology",
      duration: "5 Months",
      about: "Learn to deploy and manage scalable applications using AWS services like EC2, S3, Lambda, and DynamoDB.",
      imageURL: ImageURL,
      author: "Robert Brown",
      authorImage: Author,    
    },
    {
      title: "Machine Learning with Python",
      branch: "Artificial Intelligence",
      duration: "6 Months",
      about: "Gain expertise in ML algorithms, data preprocessing, model evaluation, and neural networks using Python and TensorFlow.",
      imageURL: ImageURL,
      author: "Emily Davis",
      authorImage: Author,
    }
  ];


  return (
    <div className='p-4'>
      <div className='p-2 flex justify-between'>
        <h2 className='text-xl font-semibold'>Available Listings</h2>
        <SearchBox />
      </div>

      <Separator />

      <div className='p-3 flex justify-center items-center gap-3'>
        <Badge className='rounded-full text-md'>All</Badge>
        <Badge className='rounded-full text-md'>Near Me</Badge>
        <Badge className='rounded-full text-md'>Connections</Badge>
      </div>

      <div className="my-3 flex gap-3 flex-wrap justify-center items-center">
        {courses.map((course, index) => (
          <Card key={index} course={course} />
        ))}
      </div>


    </div>
  )
}

export default AvailableDonations;