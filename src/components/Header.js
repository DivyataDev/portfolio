import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";
import { transform } from "framer-motion";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const prevScrollY = useRef(0); //used to maintain previous scroll position
  const [scrollDirectionY, setScrollDirectionY] = useState("up"); // used to set direction up or down

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  //Determines Scrolling direction based on scroll Positions
  const handleScroll = () => {  
    const currentScrollYPosition = window.scrollY;
    if(prevScrollY.current < currentScrollYPosition){
      setScrollDirectionY("down");
    }else{
      setScrollDirectionY("up");

    }
    prevScrollY.current = currentScrollYPosition;
  }

  const handleScrollYTransfrom = () => {
    if(scrollDirectionY === "up") {
      return "translateY(0)";

    }
    else if(scrollDirectionY === "down"){
      return "translateY(-200px)";
    } 

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);

    }
  });

 

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      style={{
         transform: handleScrollYTransfrom(),
         transition: transform
         }
      }
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"           
        >
          <nav>
          <HStack spacing={8}>
            {/* Add social media links based on the `socials` data */}
            {
              socials.map((social, index) => (
                <a href={social.url} target="_blank" rel="noopener noreferrer" key={`${social.icon}-${index}`}>
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              )) 
            }
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
               <a href="/#projects" onClick={handleClick('projects')} key="projects-section">Projects</a>
               <a href="/#contact-me" onClick={handleClick('contactme')} key="contactme-section">Contact Me</a>
             
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
