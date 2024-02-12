import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Summary from "./Summary";

const MainComponent = () => {
 
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});


  const handleStep1Next = (data) => {
    setStep1Data(data);
  };

  const handleStep2Next = (data) => {
    setStep2Data(data);
  };


  const combinedData = { ...step1Data, ...step2Data };

  return (
    <div>
      
      <Step1 onNext={handleStep1Next} />

      
      <Step2 onNext={handleStep2Next} />

     
      <Summary data={combinedData} />
    </div>
  );
};

export default MainComponent;