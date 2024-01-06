import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implemented the UI for the Card component according to the instructions.
  // Implemented the component with the elements imported above. 
  return (
    
      <VStack color="black" backgroundColor="white" borderRadius="10" >
        <Image src={imageSrc} alt={title} borderRadius="10" />
        <VStack  p={4} alignItems="flex-start" spacing={4}>
          <Heading size="md">{title}</Heading>
          <Text color="#808080">{description}</Text>
          <a href="#">See More&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowRight} size="1x" /></a>
        </VStack>
      </VStack>
 

  );
};

export default Card;
