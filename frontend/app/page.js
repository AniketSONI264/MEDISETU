import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Home1 from "@/components/homePage/home_1"
import Home5 from "@/components/homePage/home_5_faqs"
import Loader from "@/components/loader";
// import Profile from "@"
export default function HomePage() {  //frontend\app\routes\aboutUs.jsx
  return (
    <div>
      {/* <Hero /> */}
      <Loader />
      <Home1 />
      <Services />
      <Testimonials /> 
      <Contact />
      <Home5 />
    </div>
  );
}
