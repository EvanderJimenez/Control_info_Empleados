import React from 'react';

interface UserListItemProps {
  imageSrc: string;
  email: string;
  name: string;
}

const UserListItem: React.FC<UserListItemProps> = ({ imageSrc, email, name }) => {
  return (
    <li className="pt-3 pb-0 sm:pt-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="w-8 h-8 rounded-full" src={imageSrc} alt="Profile" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          $2367
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
