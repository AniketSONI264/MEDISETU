import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Video, CheckCircle } from "lucide-react";

const BookingSuccess = ({ open, setOpen, appointmentDetails }) => {
  if (!appointmentDetails) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-teal-700 mb-6">
            Appointment Confirmed!
          </h2>

          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p className="font-medium">Doctor</p>
                <p className="text-gray-600">
                  Dr. {appointmentDetails.doctor.firstName} {appointmentDetails.doctor.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {appointmentDetails.doctor.specialization}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">
                  {new Date(appointmentDetails.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">{appointmentDetails.appointmentTime}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Video className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p className="font-medium">Meeting Link</p>
                <a 
                  href={appointmentDetails.jitsiMeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Join Video Consultation
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your registered email address.
            </p>
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSuccess; 