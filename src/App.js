import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";

function App() {
  return (
    <ChakraProvider>
      
        <main>
          <Header />
          <LandingSection />
          <ProjectsSection />
          <AlertProvider>
            <ContactMeSection /> 
              <Alert />
          </AlertProvider>
          
          <Footer />
       
        </main>
   
    </ChakraProvider>
  );
}

export default App;
