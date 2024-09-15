 
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
 
const Hero = () => {
  const hero = [
 
    {
      "id": 1,
      "image": "https://i.ibb.co.com/yfsGp1r/ground1.jpg",
      "title": "Book Your Facility Today",
      "description": "Discover a wide range of sports facilities available for booking at your convenience. From indoor courts to outdoor fields, our platform offers a seamless booking experience tailored to your needs. Book now and enjoy your favorite sports with ease!"
    },
    {
      "id": 2,
      "image": "https://i.ibb.co.com/jgj2Bf4/ground2.jpg",
      "title": "Ultimate Sports Experience",
      "description": "Get the best out of your sports activities with our top-notch facilities. Our platform ensures that you have access to the best venues, equipment, and services. Whether for a game or practice, make the most of your sports time with our easy-to-use booking system."
    },
    {
      "id": 3,
      "image": "https://i.ibb.co.com/CsRpMcp/ground3.jpg",
      "title": "Top Rated Sports Venues",
      "description": "Explore our top-rated sports venues, highly recommended by our users for their quality and service. Find the perfect place for your next game or practice, and experience exceptional facilities and support. Book now and see why these venues are the best!"
    }
  ];

  return (
    <Carousel arrows infinite={false} autoplay>
      {hero.map(item => (
        <div key={item.id} className="w-full relative h-[600px] bg-gray-800">
          <img
            src={item.image}
            className="w-full h-full object-cover absolute inset-0"
            alt={item.title}
          />
          <div className="flex flex-col items-center justify-center absolute inset-0 text-center p-6 bg-opacity-70 bg-gray-900 rounded-lg">
            <h3 className="text-5xl font-bold mb-4 text-white">
              {item.title}
            </h3>
            <p className="text-xl mb-6 text-white w-3/4">
              {item.description}
            </p>
           <Link to={"/facility"}>
           <button className="bg-green-500 rounded-lg text-3xl px-4 py-3 text-white hover:bg-green-600">
              Book Now
            </button></Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Hero;
