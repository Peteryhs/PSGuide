import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar as CalendarIcon,
  Settings,
  LogOut,
  Bell,
  Search,
  Mail,
  Key,
  ExternalLink,
  X,
  Circle,
  CheckCircle2,
  Copy,
  Globe,
  User,
  Clock,
  Crown
} from 'lucide-react';
import { Button } from '../components/Button';
import { ScreenProps, Application, Tab } from '../types';
import { initialApplications } from '../data/mockData';
import { OverviewView } from './dashboard/OverviewView';
import { ApplicationsView } from './dashboard/ApplicationsView';
import { CalendarView } from './dashboard/CalendarView';
import { PortalsView } from './dashboard/PortalsView';
import { GuidePlusView } from './dashboard/GuidePlusView';

export const DashboardScreen: React.FC<ScreenProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [apps, setApps] = useState<Application[]>(initialApplications);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside the modal to close it
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelectedAppId(null);
    }
  }, []);

  // Copy to clipboard handler
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  // Derived state for the currently selected application
  const selectedApp = useMemo(() =>
    apps.find(a => a.id === selectedAppId) || null
    , [apps, selectedAppId]);

  // Derived state for urgent count
  const urgentCount = useMemo(() =>
    apps.reduce((acc, app) =>
      acc + app.timeline.filter(t => t.status === 'pending' && t.urgent).length
      , 0)
    , [apps]);

  // Handler to mark an event as complete
  const handleCompleteTask = (appId: number, eventId: number) => {
    setApps(currentApps => currentApps.map(app => {
      if (app.id !== appId) return app;

      const newTimeline = app.timeline.map(event =>
        event.id === eventId ? { ...event, status: 'completed' as const } : event
      );

      // Determine next action item
      const nextUrgent = newTimeline.find(e => e.status === 'pending' && e.urgent);
      const nextPending = newTimeline.find(e => e.status === 'pending');

      let newActionItem = null;
      if (nextUrgent) newActionItem = nextUrgent.title;
      else if (nextPending) newActionItem = nextPending.title;

      return {
        ...app,
        timeline: newTimeline,
        actionItem: newActionItem
      };
    }));
  };

  const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
        ${active ? 'bg-primary-500/10 text-primary-400 border border-primary-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
      `}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 overflow-hidden font-sans animate-fade-in relative">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950/50 hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary-500/10 p-2 rounded-lg border border-primary-500/20">
              <Mail className="w-5 h-5 text-primary-500" />
            </div>
            <span className="font-mono text-sm font-bold tracking-wider text-white uppercase">PSGuide</span>
          </div>

          <nav className="space-y-2">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <SidebarItem
              icon={<FileText size={20} />}
              label="Applications"
              active={activeTab === 'applications'}
              onClick={() => setActiveTab('applications')}
            />
            <SidebarItem
              icon={<CalendarIcon size={20} />}
              label="Calendar"
              active={activeTab === 'calendar'}
              onClick={() => setActiveTab('calendar')}
            />
            <SidebarItem
              icon={<Key size={20} />}
              label="Portals"
              active={activeTab === 'portals'}
              onClick={() => setActiveTab('portals')}
            />
            <SidebarItem
              icon={<Crown size={20} className={activeTab === 'plus' ? 'text-amber-500' : 'text-amber-500/70'} />}
              label="Upgrade to Plus"
              active={activeTab === 'plus'}
              onClick={() => setActiveTab('plus')}
            />
            <div className="h-px bg-slate-800 my-4"></div>
            <SidebarItem icon={<Settings size={20} />} label="Settings" />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-xs font-bold">
              AL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Alex L.</p>
              <p className="text-xs text-slate-500 truncate">Free Plan</p>
            </div>
            <LogOut size={16} className="text-slate-500 cursor-pointer hover:text-white" onClick={onNext} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-mono font-bold text-white capitalize">
            {activeTab === 'overview' ? 'Dashboard' : activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50 w-32 md:w-64 transition-all"
              />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
          {activeTab === 'overview' && (
            <OverviewView
              apps={apps}
              urgentCount={urgentCount}
              onTabChange={setActiveTab}
              onSelectApp={setSelectedAppId}
            />
          )}
          {activeTab === 'applications' && (
            <ApplicationsView
              apps={apps}
              onSelectApp={setSelectedAppId}
            />
          )}
          {activeTab === 'calendar' && <CalendarView apps={apps} onSelectApp={setSelectedAppId} />}
          {activeTab === 'portals' && <PortalsView />}
          {activeTab === 'plus' && <GuidePlusView />}
        </div>
      </main>

      {/* Application Details Modal */}
      {selectedApp && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="bg-[#0b1021] border border-slate-800 w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900/50">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl ${selectedApp.color}`}>
                  {selectedApp.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedApp.university}</h2>
                  <p className="text-slate-400">{selectedApp.program} • {selectedApp.status}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppId(null)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Two Column Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Column - Timeline */}
              <div className="flex-1 p-8 overflow-y-auto border-r border-slate-800">
                <h3 className="font-mono font-bold text-lg text-slate-200 mb-6 flex items-center gap-2">
                  Application Timeline
                </h3>

                <div className="relative pl-4 space-y-8">
                  {/* Vertical Line */}
                  <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-slate-800"></div>

                  {selectedApp.timeline.map((event, index) => (
                    <div key={event.id} className="relative flex gap-6 items-start group">
                      {/* Node */}
                      <div className={`
                        relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 bg-[#0b1021]
                        ${event.status === 'completed' ? 'border-green-500 text-green-500' : ''}
                        ${event.status === 'pending' ? (event.urgent ? 'border-primary-500 text-primary-500' : 'border-yellow-500 text-yellow-500') : ''}
                        ${event.status === 'upcoming' ? 'border-slate-700 text-slate-700' : ''}
                      `}>
                        {event.status === 'completed' && <CheckCircle2 size={14} fill="currentColor" className="text-[#0b1021]" />}
                        {event.status === 'pending' && <Circle size={10} fill="currentColor" />}
                        {event.status === 'upcoming' && <Circle size={8} />}
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ${event.status === 'upcoming' ? 'opacity-50' : ''}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-bold text-base ${event.urgent ? 'text-primary-400' : 'text-slate-200'} ${event.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                            {event.title}
                          </h4>
                          <span className={`text-xs font-mono px-2 py-0.5 rounded ${event.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                            event.status === 'pending' ? (event.urgent ? 'bg-primary-500/10 text-primary-400' : 'bg-yellow-500/10 text-yellow-400') :
                              'bg-slate-800 text-slate-500'
                            }`}>
                            {event.date}
                          </span>
                        </div>

                        {event.description && (
                          <p className="text-sm text-slate-400 mb-2 leading-relaxed">
                            {event.description}
                          </p>
                        )}

                        {/* Action Button for Pending Items */}
                        {event.status === 'pending' && (
                          <Button
                            variant={event.urgent ? 'primary' : 'secondary'}
                            className="h-8 text-xs px-4 mt-2"
                            onClick={() => handleCompleteTask(selectedApp.id, event.id)}
                          >
                            {event.urgent ? 'Complete Now' : 'Mark Done'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Credentials */}
              <div className="w-80 p-6 overflow-y-auto bg-slate-900/30">
                <h3 className="font-mono font-bold text-lg text-slate-200 mb-6 flex items-center gap-2">
                  <Key size={18} className="text-primary-400" />
                  Portal Credentials
                </h3>

                <div className="space-y-4">
                  {selectedApp.credentials && selectedApp.credentials.length > 0 ? (
                    selectedApp.credentials.map((cred, index) => (
                      <div
                        key={index}
                        className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-primary-500/30 transition-colors"
                      >
                        {/* Portal Name & Status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Globe size={14} className="text-primary-400" />
                            <span className="font-bold text-white text-sm">{cred.portalName}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${cred.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            cred.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                              'bg-slate-700/50 text-slate-400 border border-slate-600/20'
                            }`}>
                            {cred.status}
                          </span>
                        </div>

                        {/* Username */}
                        <div className="bg-slate-900/50 rounded-lg p-3 mb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              <User size={12} className="text-slate-500 shrink-0" />
                              <span className="text-xs text-slate-400 font-mono truncate">{cred.username}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(cred.username)}
                              className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-slate-500 hover:text-white shrink-0"
                              title="Copy username"
                            >
                              <Copy size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Last Login & Visit Link */}
                        <div className="flex items-center justify-between mt-3">
                          {cred.lastLogin && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock size={10} />
                              <span>{cred.lastLogin}</span>
                            </div>
                          )}
                          <a
                            href={cred.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                          >
                            <span>Visit</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Key size={32} className="mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No credentials saved</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex justify-between items-center">
              <span className="text-xs text-slate-500">Last updated: Just now</span>
              <Button variant="ghost" className="text-xs" icon={<ExternalLink size={14} />}>Open University Portal</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
