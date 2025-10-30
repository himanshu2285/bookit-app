import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExperienceById, type ExperienceDetail, type Slot } from '../api';
import Loading from '../components/Loading';

const ExperienceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<ExperienceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    if (id) {
      loadExperience(parseInt(id));
    }
  }, [id]);

  const loadExperience = async (experienceId: number) => {
    try {
      setLoading(true);
      const data = await fetchExperienceById(experienceId);
      setExperience(data);
      
      // Set default date to first available slot
      if (data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (err) {
      setError('Failed to load experience details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const groupSlotsByDate = () => {
    if (!experience) return {};
    
    const grouped: { [key: string]: Slot[] } = {};
    experience.slots.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const handleProceedToCheckout = () => {
    if (!selectedSlot || !experience) {
      alert('Please select a time slot');
      return;
    }

    navigate('/checkout', {
      state: {
        experience,
        slot: selectedSlot,
        numberOfPeople,
      },
    });
  };

  if (loading) return <Loading />;

  if (error || !experience) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error || 'Experience not found'}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const slotsByDate = groupSlotsByDate();
  const availableDates = Object.keys(slotsByDate);
  const slotsForSelectedDate = selectedDate ? slotsByDate[selectedDate] : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary-500 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Experiences
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={experience.image} 
                alt={experience.title}
                className="w-full h-96 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium">
                    {experience.category}
                  </span>
                  <span className="flex items-center text-gray-600">
                    ★ {experience.rating}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {experience.title}
                </h1>

                <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {experience.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {experience.duration}
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${experience.price}
                </div>
                <div className="text-gray-600">per person</div>
              </div>

              {/* Number of People */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                      className={`p-3 rounded-lg border text-sm font-medium transition ${
                        selectedDate === date
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="space-y-2">
                    {slotsForSelectedDate.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        disabled={slot.availableSpots < numberOfPeople}
                        className={`w-full p-3 rounded-lg border text-left transition ${
                          selectedSlot?.id === slot.id
                            ? 'bg-primary-500 text-white border-primary-500'
                            : slot.availableSpots < numberOfPeople
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </span>
                          <span className="text-sm">
                            {slot.availableSpots < numberOfPeople 
                              ? 'Sold Out' 
                              : `${slot.availableSpots} spots`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${(experience.price * numberOfPeople).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                disabled={!selectedSlot}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  selectedSlot
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;