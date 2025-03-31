export default function Testimonials() {
    const reviews = [
      { name: "Amit", feedback: "Great platform for online doctor consultation!" },
      { name: "Priya", feedback: "Booking an appointment was super easy and fast." },
      { name: "Rahul", feedback: "Video consultations saved me a hospital visit!" },
    ];
  
    return (
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">What Our Patients Say</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-700">"{review.feedback}"</p>
                <h4 className="mt-4 font-semibold">{review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  