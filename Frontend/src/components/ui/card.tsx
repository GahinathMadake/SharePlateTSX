import React from 'react';

// Card Component
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-lg border bg-white shadow-sm ${className}`}
    {...props}
  />
);

// CardHeader Component
const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
);

// CardTitle Component
const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

// CardDescription Component
const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={`text-sm text-gray-500 ${className}`}
    {...props}
  />
);

// CardContent Component
const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`p-6 pt-0 ${className}`}
    {...props}
  />
);

// CardFooter Component
const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };