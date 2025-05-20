export const getCityStateByPincode = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
  
      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        return {
          city: postOffice.District || "",
          state: postOffice.State || "",
        };
      } else {
        throw new Error("Invalid pincode");
      }
    } catch (error) {
      console.error("❌ Pincode Lookup Failed:", error.message);
      return {
        city: "",
        state: "",
      };
    }
  };
  