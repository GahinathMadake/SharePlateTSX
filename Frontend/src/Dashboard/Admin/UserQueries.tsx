import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  email: string;
  name: string;
}

interface Query {
  _id: string;
  name: string;
  email: string;
  phone: string;
  query: string;
  document: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

const UserQueries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get<Query[]>(
          `${import.meta.env.VITE_Backend_URL}/user/user-queries`,
          { withCredentials: true }
        );
        setQueries(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user queries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Queries</h1>
      {queries.length > 0 ? (
        <div className="space-y-6">
          {queries.map((query) => (
            <div key={query._id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-800">{query.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{query.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-semibold text-gray-800">{query.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="text-lg font-semibold text-gray-800">{query.user.name}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Query</p>
                <p className="text-lg font-semibold text-gray-800">{query.query}</p>
              </div>
              {query.document && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Document</p>
                  <a
                    href={`${import.meta.env.VITE_Backend_URL}/uploads/${query.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                </div>
              )}
              <div className="mt-4 text-sm text-gray-500">
                <p>Created At: {new Date(query.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(query.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No queries found.</p>
      )}
    </div>
  );
};

export default UserQueries;