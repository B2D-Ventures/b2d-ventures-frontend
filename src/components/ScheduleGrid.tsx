export default function Home() {
  const scheduleData = [
    { name: "LEXI", date: "10/10/2024", time: "12.00" },
    { name: "Angrybird", date: "09/10/2024", time: "9.00" },
    { name: "Jojo", date: "03/10/2024", time: "10.00" },
    { name: "Great&Glory", date: "01/10/2024", time: "7.00" },
    { name: "Tumu", date: "29/09/2024", time: "19.00" },
  ];

  return (
    <div className="container mx-auto">
      {scheduleData.map((entry, index) => (
        <div key={index}>
          <div className="grid grid-cols-5 gap-4 mt-4 mb-4">
            <div className="text-black">{entry.name}</div>
            <div className="text-secondary font-light ml-10">Date</div>
            <div className="text-black font-light">{entry.date}</div>
            <div className="text-secondary font-light ml-10">Time</div>
            <div className="text-black font-light">{entry.time}</div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}