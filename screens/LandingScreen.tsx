import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { ScreenProps } from '../types';

export const LandingScreen: React.FC<ScreenProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col animate-fade-up">
      <div className="flex flex-col">
        {/* Branding */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-500/10 p-2 rounded-lg border border-primary-500/20">
            <Mail className="w-5 h-5 text-primary-400" />
          </div>
          <span className="font-mono text-sm font-bold tracking-wider text-primary-400 uppercase">PSGuide</span>
        </div>

        {/* Text Content */}
        <div className="mb-2">
          <h1 className="text-5xl md:text-6xl font-mono font-bold leading-[0.85] tracking-tight text-white mb-6">
            University <br />
            tracking, <br />
            <span className="text-primary-500">simplified.</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-sm leading-tight font-light">
            Track your university applications effortlessly by connecting your inbox.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="w-full space-y-3 mt-8">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={onNext}
          >
            Sign Up
          </Button>
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={onNext}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};