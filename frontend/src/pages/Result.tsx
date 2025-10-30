import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  success: boolean;
  booking?: {
    id: number;
    experienceTitle: string;
    customerName: string;
    customerEmail: string;
    numberOfPeople: number;
    totalPrice: number;
    discount: number;
    status: string;
  };
  error?: string;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    navigate('/');
    return null;
  }

  const { success, booking, error } = state;

  if (success && booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your booking has been successfully confirmed. Check your email for details.
            </p>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-medium text-gray-900">#{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">{booking.experienceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium text-gray-900">{booking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900">{booking.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of People</span>
                  <span className="font-medium text-gray-900">{booking.numberOfPeople}</span>
                </div>
                {booking.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount Applied</span>
                    <span className="font-medium">-${booking.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-900 font-bold">Total Paid</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${booking.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
              >
                Book Another Experience
              </button>
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-500 hover:text-primary-500 transition font-medium"
              >
                Print Confirmation
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              A confirmation email has been sent to <strong>{booking.customerEmail}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Failure State
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Booking Failed
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {error || 'Something went wrong with your booking. Please try again.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-500 hover:text-primary-500 transition font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;