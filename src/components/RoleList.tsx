import React from 'react';
import { Role } from '../types';
import { Edit, Trash2, Shield } from 'lucide-react';

interface RoleListProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}

export default function RoleList({ roles, onEditRole, onDeleteRole }: RoleListProps) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <div
          key={role.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-indigo-500" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">{role.name}</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditRole(role)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteRole(role.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">{role.description}</p>
          <div className="space-y-2">
            {Object.entries(role.permissions).map(([resource, permissions]) => (
              <div key={resource} className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">{resource}:</span>
                {permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}