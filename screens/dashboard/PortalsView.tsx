import React, { useState } from 'react';
import { ExternalLink, Copy, Edit2, Calendar, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../components/Button';
import { initialApplications } from '../../data/mockData';
import { Application } from '../../types';

interface PortalsViewProps {
  onNavigateToCalendar?: () => void;
  onNavigateToPlus?: () => void;
}

export const PortalsView: React.FC<PortalsViewProps> = ({ onNavigateToCalendar, onNavigateToPlus }) => {
  const [editingPortal, setEditingPortal] = useState<{ appId: number; portalIndex: number } | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [collapsedApps, setCollapsedApps] = useState<Set<number>>(new Set());

  const toggleCollapse = (appId: number) => {
    setCollapsedApps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) {
        newSet.delete(appId);
      } else {
        newSet.add(appId);
      }
      return newSet;
    });
  };

  // Get applications with credentials
  const appsWithCredentials = initialApplications.filter(app => app.credentials && app.credentials.length > 0);

  // Free plan limit
  const FREE_PLAN_LIMIT = 5;
  const programsUsed = appsWithCredentials.length;
  const programsLeft = Math.max(0, FREE_PLAN_LIMIT - programsUsed);

  const handleEditClick = (appId: number, portalIndex: number, currentUsername: string) => {
    setEditingPortal({ appId, portalIndex });
    setEditUsername(currentUsername);
    setEditPassword('');
  };

  const handleSaveEdit = () => {
    // In a real app, this would save to backend/local storage
    setEditingPortal(null);
    setEditUsername('');
    setEditPassword('');
  };

  const handleCopyUsername = (username: string) => {
    navigator.clipboard.writeText(username);
  };

  // Get supplemental tasks for an application
  const getSupplementals = (app: Application) => {
    return app.timeline.filter(
      event => (event.status === 'pending' || event.status === 'upcoming') &&
        (event.title.toLowerCase().includes('form') ||
          event.title.toLowerCase().includes('profile') ||
          event.title.toLowerCase().includes('essay') ||
          event.title.toLowerCase().includes('interview'))
    );
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Portals</h2>
          <p className="text-slate-400 text-sm">
            Manage your university portal credentials and track supplemental requirements.
          </p>
        </div>

        <div className="space-y-4">
          {appsWithCredentials.map((app) => (
            <div
              key={app.id}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all"
            >
              {/* Header Row */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCollapse(app.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center`}>
                    <span className="font-bold text-lg">{app.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{app.university}</h3>
                    <p className="text-xs text-slate-500">{app.program}</p>
                  </div>
                </div>
                <button
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(app.id);
                  }}
                >
                  {collapsedApps.has(app.id) ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </button>
              </div>

              {/* Collapsible Content */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${collapsedApps.has(app.id) ? 'max-h-0 opacity-0 mt-0' : 'max-h-[1000px] opacity-100 mt-4'}`}>
                {/* Credentials */}
                {app.credentials?.map((cred, idx) => (
                  <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Portal Info */}
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-1">{cred.portalName}</p>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-[10px] text-slate-600 uppercase">Username:</span>
                            <p className="text-sm text-slate-300 font-mono flex items-center gap-2">
                              {cred.username}
                              <Copy
                                size={12}
                                className="text-slate-600 hover:text-primary-400 cursor-pointer transition-colors"
                                onClick={() => handleCopyUsername(cred.username)}
                              />
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-600 uppercase">Password:</span>
                            <p className="text-sm text-slate-600 font-mono">••••••••</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          className="h-8 px-3 text-xs border border-slate-700"
                          onClick={() => handleEditClick(app.id, idx, cred.username)}
                        >
                          <Edit2 size={12} className="mr-1" /> Edit Login
                        </Button>
                        <Button
                          variant="primary"
                          className="h-8 px-3 text-xs"
                          onClick={() => window.open(cred.url, '_blank')}
                        >
                          Portal <ExternalLink size={12} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Supplementals Section */}
                {getSupplementals(app).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Supplementals:</span>
                      <button
                        className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                        onClick={onNavigateToCalendar}
                      >
                        <Calendar size={12} /> View on Calendar
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {getSupplementals(app).map(task => (
                        <span
                          key={task.id}
                          className={`text-[10px] px-2 py-1 rounded-full ${task.urgent
                            ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                        >
                          {task.title} • {task.date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-72 space-y-4">
        {/* Free Plan Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-5">
          <div className="text-center space-y-3">
            <p className="text-slate-300">
              You have <span className="text-2xl font-bold text-primary-400">{programsLeft}</span> programs left on your free plan!
            </p>
            <p className="text-sm text-slate-400">
              Purchase <span className="text-primary-400 font-bold">PLUS<sup>+</sup></span> for unlimited space!
            </p>
            <Button
              fullWidth
              variant="primary"
              className="mt-4"
              onClick={onNavigateToPlus}
            >
              <Sparkles size={16} className="mr-2" /> Upgrade Now
            </Button>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="relative group overflow-hidden rounded-2xl border border-slate-800 aspect-[4/3] flex items-center justify-center bg-slate-950 cursor-pointer shadow-lg">
          <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-white/70 uppercase tracking-widest pointer-events-none">
            Ad
          </div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616499370260-485b3e5ed653?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-[0.4] group-hover:blur-[2px] opacity-90"></div>
          <div className="relative z-10 text-center p-6 w-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-8 group-hover:translate-y-0">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold border border-white/20 shadow-lg">
              Ad
            </div>
            <h4 className="font-bold text-white mb-2 text-lg">Upgrade to Pro</h4>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">Get unlimited tracking and AI essay analysis.</p>
            <Button variant="outline" className="h-9 text-xs border-white/30 text-white hover:bg-white/20 w-full backdrop-blur-sm">Learn More</Button>
          </div>
        </div>
      </div>

      {/* Edit Login Modal */}
      {editingPortal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Edit Login Credentials</h3>
              <button
                onClick={() => setEditingPortal(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-2">Username</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-2">Password</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  className="flex-1 border border-slate-700"
                  onClick={() => setEditingPortal(null)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={handleSaveEdit}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
