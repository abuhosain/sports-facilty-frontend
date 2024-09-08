import { Carousel, Card, Row, Col } from "antd";
import image1 from "../assets/images/testimonial/profile1.jpg";
import image2 from "../assets/images/testimonial/profile2.jpg";
import image3 from "../assets/images/testimonial/profile4.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      image: image1,
      description:
        "John is the visionary behind our company, leading with passion.",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: image2,
      description: "Jane ensures the tech behind our platform is top-notch.",
    },
    {
      name: "Mike Brown",
      role: "COO",
      image: image3,
      description: "Mike handles day-to-day operations with great efficiency.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Meet Our Team Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-8">Meet Our Team</h2>
        <Carousel autoplay speed={1000} dots={false} arrows>
          {teamMembers.map((member, index) => (
            <div key={index}>
              <Row gutter={16} justify="center">
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={member.name}
                        src={member.image}
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                    }
                    className="mx-auto"
                  >
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                    <p>{member.description}</p>
                  </Card>
                </Col>
                {teamMembers[index + 1] && (
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={teamMembers[index + 1].name}
                          src={teamMembers[index + 1].image}
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      }
                      className="mx-auto"
                    >
                      <h3 className="text-xl font-bold">
                        {teamMembers[index + 1].name}
                      </h3>
                      <p className="text-gray-600">
                        {teamMembers[index + 1].role}
                      </p>
                      <p>{teamMembers[index + 1].description}</p>
                    </Card>
                  </Col>
                )}
              </Row>
            </div>
          ))}
        </Carousel>
      </section>
      
      {/* Mission Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          To revolutionize the sports booking experience, providing an easier,
          faster, and more efficient way for everyone to access sports
          facilities and stay active.
        </p>
      </section>

      {/* Vision Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We envision a future where sports facilities are easily accessible,
          ensuring anyone can book their perfect space in just a few clicks, no
          matter where they are.
        </p>
      </section>

      {/* Journey Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Since our inception in 2020, we’ve transformed from a small local
          service to a global platform, connecting sports enthusiasts with
          premium facilities around the world.
        </p>
      </section>
    </div>
  );
};

export default About;
