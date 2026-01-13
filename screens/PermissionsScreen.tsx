import React, { useEffect, useState } from 'react';
import { Check, Shield, Eye, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { ScreenProps } from '../types';

export const PermissionsScreen: React.FC<ScreenProps> = ({ onNext }) => {
  // Simple stagger animation state
  const [showItem1, setShowItem1] = useState(false);
  const [showItem2, setShowItem2] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowItem1(true), 300);
    setTimeout(() => setShowItem2(true), 600);
  }, []);

  return (
    <div className="flex flex-col animate-fade-up">
      <div className="mb-8">
        <h2 className="text-3xl font-mono font-bold text-white mb-3">Grant Access</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          To track your applications, we need read-only access to specific emails.
        </p>
      </div>

      <div className="space-y-4">
        {/* Permission Item 1 */}
        <div className={`transform transition-all duration-500 ${showItem1 ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
          <div className="group bg-white/5 border border-white/10 hover:border-primary-500/30 rounded-2xl p-5 flex gap-4 items-center transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
              <Mail className="w-5 h-5 text-slate-300 group-hover:text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white font-mono">Read Gmail messages</h3>
              <p className="text-xs text-slate-500 mt-1">Scan for .edu emails</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-500" />
            </div>
          </div>
        </div>
        
        {/* Permission Item 2 */}
        <div className={`transform transition-all duration-500 ${showItem2 ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
          <div className="group bg-white/5 border border-white/10 hover:border-primary-500/30 rounded-2xl p-5 flex gap-4 items-center transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
              <Eye className="w-5 h-5 text-slate-300 group-hover:text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white font-mono">View email address</h3>
              <p className="text-xs text-slate-500 mt-1">Create your profile</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-primary-500/5 rounded-xl border border-primary-500/10 flex gap-3">
        <Shield className="w-5 h-5 text-primary-400 shrink-0" />
        <p className="text-xs text-primary-200/70 leading-relaxed">
          Your data is encrypted. We never write emails or share data with third parties.
        </p>
      </div>

      <div className="mt-8">
        <Button 
          variant="primary" 
          fullWidth
          onClick={onNext}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Allow
        </Button>
      </div>
    </div>
  );
};