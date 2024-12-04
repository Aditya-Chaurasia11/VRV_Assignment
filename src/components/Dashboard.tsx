import React, { useState, useEffect } from 'react';
import { Users, Shield, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const users = await api.getUsers();
      const roles = await api.getRoles();
      
      setStats({
        totalUsers: users.length,
        activeUsers: users.filter(user => user.status === 'active').length,
        totalRoles: roles.length,
      });
    };

    loadStats();
  }, []);

  const dashboardStats = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      change: '+4.75%',
      changeType: 'increase',
    },
    {
      name: 'Active Roles',
      value: stats.totalRoles,
      icon: Shield,
      change: '+2.02%',
      changeType: 'increase',
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: AlertCircle,
      change: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%`,
      changeType: stats.activeUsers >= stats.totalUsers / 2 ? 'increase' : 'decrease',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span
                    className={`font-medium ${
                      stat.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500"> current rate</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}