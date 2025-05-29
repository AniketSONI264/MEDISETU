

import { getDoctorBySlug } from "@/utils/api";
import DoctorPageContent from "@/components/AppointmentComps/docPageComp.jsx";

// ✅ Server Component – fetches data based on slug
const DoctorPage = async ({ params }) => {
  // const { slug } = params;
  // console.log("Doctor Slug:", slug);

  // let doctorData = null;

  const { slug } =await params; // 💥 Await this bad boi

    console.log("Slug:", slug);
    let doctorData;

  try {
    // const res =  getDoctorBySlug(slug);
    const res = await getDoctorBySlug(slug);
    doctorData = res?.data?.data || null;
  } catch (error) {
    console.error("Error fetching doctor data:", error);
  }

   return <DoctorPageContent doctorData={doctorData} />;
  // return (
  //   <div className="mb-[100px]">
  //     <DoctorPageContent doctorData={doctorData} />
  //   </div>
  // );
   
};

export default DoctorPage;
