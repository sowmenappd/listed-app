import React from "react";
import Lottie from "react-lottie";
import { Carousel, Typography } from "antd";

import welcome from "../Animations/welcome.json";
import register from "../Animations/register.json";

const { Text } = Typography;

const WelcomeAnimation = ({ carouselRef }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: welcome,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const options2 = {
    loop: true,
    autoplay: true,
    animationData: register,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ width: "80%" }}>
      <Carousel ref={carouselRef} dots={false}>
        <div>
          <Lottie options={defaultOptions} style={{ marginTop: 20 }} />
          <div style={{ textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: 30 }}>
              <b>One</b> app for all your lists
            </Text>
          </div>
        </div>
        <div>
          <Lottie options={options2} style={{ marginTop: 80, width: "60%" }} />
          {/* */}
          <div style={{ textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: 30 }}>
              <b>Create your account today</b>,<br /> and start managing your
              lists!
            </Text>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default WelcomeAnimation;
