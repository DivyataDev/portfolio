import React, {useEffect, useRef} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const ContactMeSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext(); 
  const formSubmissionCount = useRef(0);  
 
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: ""
    },    
    onSubmit: async(values) => { 
      formSubmissionCount.current = 1;
      // call the submit function with the form data
      await submit("/api/submit", values); 
    },    
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required a first Name"),
      email: Yup.string().email("Please enter a valid email").required("Email address is required"),    
      type: Yup.string().oneOf(["hireMe", "openSource", "other"], "Invalid type of Enquiry").required("Type of enquiry is required"),
      comment: Yup.string().required("Comment is required"),
    }),
  });

  // Handle the form submission
  const handleSubmit = (event) => {
    //prevents default page reload
    event.preventDefault();
    // call Formik's handleSubmit function with the event object
    formik.handleSubmit(event);
  };
  

  useEffect(() => {  
    
    if(response && response.type && response.message) { 
      if(response.type === 'success' && formSubmissionCount.current === 1){
        onOpen(response.type, response.message);
        formik.resetForm();  
   
      }
      else if(response.type === 'error' && formSubmissionCount.current === 1){
        onOpen(response.type, response.message);        
      } 
      response.type = "";
      response.message = "";
      formSubmissionCount.current = 0;
       
    }  
  }, [onOpen, response, formik]); 

 
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl  isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  key="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                
                {formik.errors.firstName && formik.touched.firstName ? (<FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>) : null }

              </FormControl>
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  key="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ? (<FormErrorMessage>{formik.errors.email}</FormErrorMessage>) : null }
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" key="type"  {...formik.getFieldProps('type')}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>

                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  key="comment"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
               {formik.errors.comment && formik.touched.comment ? (<FormErrorMessage>{formik.errors.comment}</FormErrorMessage>) : null }
            
              </FormControl>
                  <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                  Submit 
                  </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
