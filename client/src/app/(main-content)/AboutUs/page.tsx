"use client";
import React from "react";
import Image from "next/image";
import aishaImage from "./../../../asset/aisha.jpg";
import arioImage from "./../../../asset/ario.png";
import infriImage from "./../../../asset/Infri.jpeg";
import wahibImage from "./../../../asset/wahib-1.jpg";
import zalvaImage from "./../../../asset/zalva.png";
import { GithubIcon, Linkedin } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Aisha Taqina",
      github: "Aisha's Github",
      link_github: "https://github.com/aishataqina",
      link_linkedin: "www.linkedin.com/in/aisha-taqina-7909572b7",
      image: aishaImage,
      role: "Front End Developer",
    },
    {
      name: "Ario Bimo P",
      github: "Ario's Github",
      link_github: "https://github.com/ario-g1thub",
      link_linkedin: "https://www.linkedin.com/in/ario-bimo-254148239/",
      image: arioImage,
      role: "Front End Developer",
    },
    {
      name: "Infrisanti Wilson T",
      github: "Infri's Github",
      link_github: "https://github.com/INFRISANTI",
      link_linkedin: "https://www.linkedin.com/in/infrisanti-wilson-tong",
      image: infriImage,
      role: "Front End Developer",
    },
    {
      name: "Wahib Kurniawan",
      github: "Wahib's Github",
      link_github: "https://github.com/wahibkurniawan",
      link_linkedin: "https://www.linkedin.com/in/wahib-kurniawan-46b415326/",
      image: wahibImage,
      role: "Front End Developer",
    },
    {
      name: "Zalva Ihilani P",
      github: "Zalva's Github",
      link_github: "https://github.com/zalvapasha",
      link_linkedin:
        "https://www.linkedin.com/in/zalva-ihilani-pasha-b88506237/",
      image: zalvaImage,
      role: "Front End Developer & Project Manager",
    },
  ];

  return (
    <div className="flex flex-col items-center py-12 ">
      <h1 className="sm:text-4xl text-xl font-bold text-gray-600 mb-3 text-center">
        Your trust is very important to us
      </h1>
      <h2 className="sm:text-5xl text-2xl font-bold text-primary-infast mb-10 text-center">
        #InfastWeTrade
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-56 p-4 bg-green-100 border-0 rounded-lg text-center shadow-md"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="rounded-full mx-auto mb-4 object-cover"
            />
            <div className="flex flex-col justify-between h-32">
              <div>
                <h3 className="text-lg font-semibold text-nowrap">
                  {member.name}
                </h3>
                <p className="text-sm">{member.role}</p>
              </div>
              <div className="flex justify-center gap-5">
                <a
                  href={member.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  <GithubIcon />
                </a>
                <a
                  href={member.link_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
