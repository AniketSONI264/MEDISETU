"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // 👈 Add this

// import { cn } from "@/lib/utils";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger; 

const DialogPortal = ({ className, ...props }) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);

const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;


const DialogContent = React.forwardRef(
  ({ className, children, title = "Dialog", hideTitle = false, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 grid w-full max-w-lg scale-100 gap-4 rounded-xl border bg-white p-6 shadow-lg transition ease-in-out animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-2xl sm:zoom-in-90 sm:slide-in-from-bottom-0",
          className
        )}
        {...props}
      >
        {/* ✅ Enforce title (hidden or visible) */}
        {hideTitle ? (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        ) : (
          <DialogTitle>{title}</DialogTitle>
        )}

        {children}

        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
          <X className="h-5 w-5 text-gray-600" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
// const DialogContent = React.forwardRef(
//   ({ className, children, ...props }, ref) => (
//     <DialogPortal>
//       <DialogOverlay />
//       <DialogPrimitive.Content
//         ref={ref}
//         className={cn(
//           "fixed z-50 grid w-full max-w-lg scale-100 gap-4 rounded-xl border bg-white p-6 shadow-lg transition ease-in-out animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-2xl sm:zoom-in-90 sm:slide-in-from-bottom-0",
//           className
//         )}
//         {...props}
//       >
//         {children}
//         <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
//           <X className="h-5 w-5 text-gray-600" />
//         </DialogPrimitive.Close>
//       </DialogPrimitive.Content>
//     </DialogPortal>
//   )
// );
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);

const DialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
