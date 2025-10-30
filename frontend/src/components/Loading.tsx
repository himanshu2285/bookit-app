const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;