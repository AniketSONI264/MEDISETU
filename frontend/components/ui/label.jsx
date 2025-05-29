// 'use client';

// import * as React from 'react';
// import { cn } from '@/lib/utils';

// export const Label = React.forwardRef(({ className, ...props }, ref) => (
//   <label
//     ref={ref}
//     className={cn(
//       'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
//       className
//     )}
//     {...props}
//   />
// ));

// Label.displayName = 'Label';

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));

Label.displayName = 'Label';

export default Label;
