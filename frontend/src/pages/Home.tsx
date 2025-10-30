import { useState, useEffect } from 'react';
import { fetchExperiences, type Experience } from '../api';
import ExperienceCard from '../components/ExperienceCard';
import Loading from '../components/Loading';

const Home = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Adventure', 'Nature', 'Wildlife', 'Water Sports', 'Culinary', 'Hiking'];

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await fetchExperiences();
      setExperiences(data);
    } catch (err) {
      setError('Failed to load experiences. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = selectedCategory === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadExperiences}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Amazing Experiences
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-2xl">
            Book unforgettable adventures around the world. From hot air balloons to safaris, your next journey starts here.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container-custom py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="container-custom pb-16">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No experiences found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;