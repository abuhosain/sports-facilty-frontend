import { Button } from "antd";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="grid md:grid-cols-2  md:h-72">
      <div className="bg-[#415364] py-6 w-full text-white flex flex-col justify-center pl-6">
        <h3 className="text-4xl">Join the team</h3>
        <p className="text-2xl">
          Live the mission of improving communities through sports.
        </p>
        <a
          target="_blank"
          href="https://sportsfacilities.com/about/employment-opportunities/"
        >
          <Button className="w-1/4">LEARN MORE</Button>
        </a>
      </div>
      <div className="bg-[#ebebeb] py-6 w-full text-[#415364] flex flex-col justify-center pl-6">
        <h3 className="text-4xl">Get in touch.</h3>
        <p className="text-2xl">
        Connect with our team and learn how we can work together.
        </p>
         
         <Link to={"/contact"}> <Button className="w-1/4">LET'S GO</Button></Link>
        
      </div>
    </div>
  );
};

export default Support;
