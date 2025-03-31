export default function Services() {
    const services = [
      { title: "Book Appointments", description: "Schedule a visit with top doctors." },
      { title: "Video Consultation", description: "Consult online via video call." },
      { title: "AI Chatbot", description: "Get instant medical guidance." },
    ];
  
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  