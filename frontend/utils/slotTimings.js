export const generateTimeSlots = (start, end, interval = 30) => {
    const slots = [];
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
  
    let current = new Date();
    current.setHours(startHour, startMin, 0);
  
    const endTime = new Date();
    endTime.setHours(endHour, endMin, 0);
  
    while (current < endTime) {
      slots.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + interval);
    }
  
    return slots;
  };
  