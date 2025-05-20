// 'use client';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// // import { UserIcon,CheckCircleIcon } from '@heroicons/react/24/outline';
// import { FaUser, FaCheckCircle } from 'react-icons/fa'; // Font Awesome icons
// import { MdClose } from 'react-icons/md'; // Material Design close icon

// const UserDetailsModal = ({ isOpen, onClose, user }) => {
//   if (!user) return null;

//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all">
//                 <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                   <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
//                     User Details
//                   </Dialog.Title>
//                   <button
//                     onClick={onClose}
//                     className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
//                   >
//                     <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//                   </button>
//                 </div>

//                 <div className="px-6 py-4 space-y-4">
//                   <div className="flex justify-center">
//                     <img
//                       src={user.profilePic || '/MediSetu Logo White.svg'}
//                       alt={user.name}
//                       className="h-24 w-24 rounded-full object-cover ring-2 ring-blue-500"
//                     />
//                   </div>

//                   <div className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
//                     <p><span className="font-medium">Name:</span> {user.name}</p>
//                     <p><span className="font-medium">Email:</span> {user.email}</p>
//                     <p><span className="font-medium">Phone:</span> {user.phone}</p>
//                     <p><span className="font-medium">Gender:</span> {user.gender || 'N/A'}</p>
//                     <p><span className="font-medium">Created At:</span> {new Date(user.createdAt).toLocaleString()}</p>
//                   </div>
//                 </div>

//                 <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-right">
//                   <button
//                     onClick={onClose}
//                     className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// export default UserDetailsModal;




'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaUser, FaCheckCircle } from 'react-icons/fa'; // Font Awesome icons
import { MdClose } from 'react-icons/md'; // Material Design close icon

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                    User Details
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  >
                    <MdClose className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={user.profilePic || '/MediSetu Logo White.svg'}
                      alt={user.name}
                      className="h-24 w-24 rounded-full object-cover ring-2 ring-blue-500"
                    />
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
                    <p><span className="font-medium">Name:</span> {user.name}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Phone:</span> {user.phone}</p>
                    <p><span className="font-medium">Gender:</span> {user.gender || 'N/A'}</p>
                    <p><span className="font-medium">Created At:</span> {new Date(user.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-right">
                  <button
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UserDetailsModal;
