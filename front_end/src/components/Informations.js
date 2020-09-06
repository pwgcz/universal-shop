import React, { useState } from "react";
import Title from "./Title";
import { FaInfo } from "react-icons/fa";

export default function Informations() {
  const [informations, setInformation] = useState([
    {
      icon: <FaInfo />,
      title: "Information about",
      content: "You can pass some informations in this componenet",
    },
    {
      icon: <FaInfo />,
      title: "Information about",
      content: "You can pass some informations in this componenet",
    },
    {
      icon: <FaInfo />,
      title: "Information about",
      content: "You can pass some informations in this componenet",
    },
  ]);

  return (
    <section className="services">
      <Title title="Information" />
      <div className="services-center">
        {informations.map((item, index) => {
          return (
            <article key={index} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.content}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
