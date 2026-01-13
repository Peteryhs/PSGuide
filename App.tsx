import React, { useState } from 'react';
import { FlowStep } from './types';
import { LandingScreen } from './screens/LandingScreen';
import { SignInScreen } from './screens/SignInScreen';
import { PermissionsScreen } from './screens/PermissionsScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { DashboardScreen } from './screens/DashboardScreen';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>(FlowStep.LANDING);
  const [isSpiral, setIsSpiral] = useState(false);

  const nextStep = () => {
    switch (currentStep) {
      case FlowStep.LANDING:
        setCurrentStep(FlowStep.GOOGLE_SIGN_IN);
        break;
      case FlowStep.GOOGLE_SIGN_IN:
        setCurrentStep(FlowStep.PERMISSIONS);
        break;
      case FlowStep.PERMISSIONS:
        setCurrentStep(FlowStep.WELCOME);
        break;
      case FlowStep.WELCOME:
        setCurrentStep(FlowStep.DASHBOARD);
        setIsSpiral(false); // Reset animation
        break;
      case FlowStep.DASHBOARD:
        setCurrentStep(FlowStep.LANDING);
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case FlowStep.GOOGLE_SIGN_IN:
        setCurrentStep(FlowStep.LANDING);
        break;
      case FlowStep.PERMISSIONS:
        setCurrentStep(FlowStep.GOOGLE_SIGN_IN);
        break;
      default:
        break;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case FlowStep.LANDING:
        return <LandingScreen onNext={nextStep} />;
      case FlowStep.GOOGLE_SIGN_IN:
        return <SignInScreen onNext={nextStep} onBack={prevStep} />;
      case FlowStep.PERMISSIONS:
        return <PermissionsScreen onNext={nextStep} onBack={prevStep} />;
      case FlowStep.WELCOME:
        return <WelcomeScreen onNext={nextStep} onScanComplete={() => setIsSpiral(true)} />;
      case FlowStep.DASHBOARD:
        return <DashboardScreen onNext={nextStep} />;
      default:
        return <LandingScreen onNext={nextStep} />;
    }
  };

  const isDashboard = currentStep === FlowStep.DASHBOARD;

  return (
    <div className={`min-h-screen w-full bg-[#020617] relative overflow-hidden ${isDashboard ? '' : 'flex items-center justify-center p-6'}`}>
      
      {/* Background Shapes with Transition - Keep visible on auth, fade out on dashboard */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isDashboard ? 'opacity-20' : 'opacity-100'}`}>
         {/* Blob 1 */}
         <div 
            className={`absolute w-[500px] h-[500px] bg-primary-900/20 rounded-full blur-[128px] transition-all duration-[3000ms] ease-in-out ${
              isSpiral 
                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 rotate-180 opacity-50' 
                : 'top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-0 opacity-100'
            }`}
         ></div>
         
         {/* Blob 2 */}
         <div 
            className={`absolute w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] transition-all duration-[3000ms] ease-in-out ${
              isSpiral 
                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 -rotate-180 opacity-50' 
                : 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2 rotate-0 opacity-100'
            }`}
         ></div>
      </div>

      {isDashboard ? (
        // Dashboard Layout (Full Screen)
        <div className="w-full h-full relative z-10">
          {renderStep()}
        </div>
      ) : (
        // Auth/Wizard Layout (Centered Card)
        <div className="w-full max-w-md relative z-10 flex flex-col transition-all duration-300 ease-in-out">
          {/* Step Indicator (Minimalist) */}
          <div className="flex gap-1.5 mb-8 pl-1">
            {[FlowStep.LANDING, FlowStep.GOOGLE_SIGN_IN, FlowStep.PERMISSIONS, FlowStep.WELCOME].map((step, idx) => {
              const steps = [FlowStep.LANDING, FlowStep.GOOGLE_SIGN_IN, FlowStep.PERMISSIONS, FlowStep.WELCOME];
              const currentIndex = steps.indexOf(currentStep);
              const isActive = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              
              return (
                <div 
                  key={step}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isActive 
                      ? isCurrent ? 'w-8 bg-primary-500' : 'w-4 bg-primary-900/50' 
                      : 'w-4 bg-slate-800'
                  }`}
                />
              );
            })}
          </div>
          
          {/* Main Content Area */}
          <div className="w-full">
             {renderStep()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;