
const SpinnerBackdrop = () => {
  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-16 h-16">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-75"></div>
        
        {/* Main spinning ring */}
        <div className="w-full h-full border-4 border-t-transparent border-blue-600 rounded-full animate-spin shadow-md"></div>
      </div>
    </div>
    
  );
};

export default SpinnerBackdrop;
