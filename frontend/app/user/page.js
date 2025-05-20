export default function DoctorDashboard() {
    return (
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome to your dashboard! Here you can manage your appointments, patients, and settings.</p>
        
        {/* Sample Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Appointments</h2>
            <p className="text-lg">24</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">New Patients</h2>
            <p className="text-lg">8</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            <p className="text-lg">5</p>
          </div>
        </div>
      </div>
    );
  }
  