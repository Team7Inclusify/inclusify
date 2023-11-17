import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Summary from "./summary";

const VideoResume = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const handleNext = (stepData) => {
    setData((prevData) => ({ ...prevData, ...stepData }));
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Summary data={data} />}
    </div>
  );
};

export default VideoResume;
