import React from 'react';
import { Button } from '../components/Button';
import { GoogleIcon } from '../components/GoogleIcon';
import { ScreenProps } from '../types';

export const SignInScreen: React.FC<ScreenProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col animate-fade-up">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-mono font-bold text-white mb-4">
          Connect Inbox
        </h2>
        
        <p className="text-slate-400 mb-8 max-w-xs leading-relaxed">
          Connect your Gmail account to let PSGuide scan for university application updates.
        </p>

        <div className="w-full space-y-4">
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={onNext}
            icon={<GoogleIcon className="w-5 h-5" />}
            className="justify-center font-bold text-white h-14 bg-white/5 hover:bg-white/10 border-white/20"
          >
            Continue with Google
          </Button>
          
          <p className="text-[10px] text-slate-600 uppercase tracking-wider px-4 leading-relaxed">
            By using and logging in you agree to our EULA and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};