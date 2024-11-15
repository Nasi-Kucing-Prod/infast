"use client";
import React from "react";

const AboutUs = () => {
  const teamMembers = [
    { name: "Aisha Taqina", github: "Aisha's Github", link: "https://github.com/aishataqina", image: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-light-skin-tone.png" },
    { name: "Ario Bimo Prasetyo", github: "Ario's Github", link: "https://github.com/ario-g1thub", image: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/boy-light-skin-tone.png" },
    { name: "Infrisanti Wilson Tong", github: "Infri's Github", link: "https://github.com/INFRISANTI", image: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-light-skin-tone.png" },
    { name: "Wahib Kurniawan", github: "Wahib's Github", link: "https://github.com/wahibkurniawan", image: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/boy-light-skin-tone.png" },
    { name: "Zalva Ihilani Pasha", github: "Zalva's Github", link: "https://github.com/zalvapasha", image: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/boy-light-skin-tone.png" },
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
          <div
            key={index}
            className="w-48 p-4 bg-green-100 border rounded-lg text-center shadow-md"
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4"></div>
            )}
            <h3 className="text-lg font-semibold">{member.name}</h3>
            {member.link ? (
              <a
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {member.github}
              </a>
            ) : (
              <p className="text-gray-600">{member.github}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
