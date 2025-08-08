export default function PhoneMockup({ imageSrc }) {
  return (
    <div className="w-[300px] h-[600px] bg-black rounded-[40px] p-4 shadow-lg border-4 border-gray-800 relative">
      {/* Üst çentik */}
      <div className="w-32 h-6 bg-black rounded-b-3xl absolute top-0 left-1/2 -translate-x-1/2"></div>
      {/* Ekran */}
      <img
        src={imageSrc}
        alt="App Screenshot"
        className="w-full h-full object-cover rounded-[30px]"
      />
    </div>
  );
}
