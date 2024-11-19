"use client";
import React from "react";
import Image from "next/image"; 
import aishaImage from "./../../../asset/aisha.jpg"; 
import arioImage from "./../../../asset/ario.png";
import infriImage from "./../../../asset/Infri.jpeg";
import wahibImage from "./../../../asset/wahib-1.jpg";
import zalvaImage from "./../../../asset/zalva.png";

const AboutUs = () => {
  const teamMembers = [
    { name: "Aisha Taqina", github: "Aisha's Github", link: "https://github.com/aishataqina", image: aishaImage },
    { name: "Ario Bimo Prasetyo", github: "Ario's Github", link: "https://github.com/ario-g1thub", image: arioImage },
    { name: "Infrisanti Wilson Tong", github: "Infri's Github", link: "https://github.com/INFRISANTI", image: infriImage },
    { name: "Wahib Kurniawan", github: "Wahib's Github", link: "https://github.com/wahibkurniawan", image: wahibImage },
    { name: "Zalva Ihilani Pasha", github: "Zalva's Github", link: "https://github.com/zalvapasha", image: zalvaImage },
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-600 mb-6 text-center">
        Your trust is very important to us
      </h1>
      <h2 className="text-5xl font-bold text-emerald-500 mb-10 text-center">
        #InfastWeTrade
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-48 p-4 bg-green-100 border rounded-lg text-center shadow-md">
            <Image
              src={member.image} 
              alt={member.name}
              width={96} 
              height={96} 
              className="rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
              {member.github}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;