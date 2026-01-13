import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '../../components/Button';
import { Application } from '../../types';

// Map deadlines to application IDs for click handling
const deadlinesData = [
  { id: 1, appId: 2, title: 'Waterloo AIF', due: '2 days', urgent: true, type: 'Supplemental', link: 'https://uwaterloo.ca/quest', day: 16 },
  { id: 2, appId: 3, title: 'UBC Personal Profile', due: '3 weeks', urgent: false, type: 'Application', link: 'https://ssc.adm.ubc.ca', day: 24 },
  { id: 3, appId: 1, title: 'U of T Eng Interview', due: '1 month', urgent: false, type: 'Task', link: null, day: 14 },
];

interface CalendarViewProps {
  apps: Application[];
  onSelectApp: (id: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ apps, onSelectApp }) => {
  // Get deadline info for a specific day
  const getDeadlineForDay = (day: number) => {
    return deadlinesData.find(d => d.day === day);
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-8 animate-fade-in">
      {/* Calendar Grid Section */}
      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">January 2026</h2>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-700 rounded-full flex items-center justify-center">&lt;</Button>
            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-700 rounded-full flex items-center justify-center">&gt;</Button>
          </div>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-slate-800/50 border border-slate-800 rounded-lg overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="bg-slate-900 py-1.5 px-2 text-center text-xs font-mono text-slate-500 uppercase">{d}</div>
          ))}
          {/* Placeholders */}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 3; // Offset for January 2026 (starts on Thursday)
            const deadline = getDeadlineForDay(day);
            const hasDeadline = !!deadline;

            return (
              <div
                key={i}
                className={`bg-slate-950 py-1 px-1.5 relative group hover:bg-slate-900/80 transition-colors min-h-[36px] ${day < 1 || day > 31 ? 'text-slate-800' : 'text-slate-400'} ${hasDeadline ? 'cursor-pointer' : ''}`}
                onClick={() => {
                  if (deadline) {
                    onSelectApp(deadline.appId);
                  }
                }}
              >
                <span className={`text-sm ${day === 13 ? 'bg-primary-500 text-white w-6 h-6 flex items-center justify-center rounded-full font-bold' : ''}`}>{day > 0 && day <= 31 ? day : ''}</span>
                {hasDeadline && day > 0 && (
                  <div className={`mt-1 w-full text-[10px] ${deadline.urgent ? 'bg-primary-500/20 text-primary-300 border-primary-500' : 'bg-blue-500/20 text-blue-300 border-blue-500'} px-1 py-0.5 rounded truncate border-l-2 hover:bg-primary-500/30 transition-colors`}>
                    {deadline.title}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Side Panel: Deadlines & Scheduling */}
      <div className="w-full lg:w-80 space-y-6 flex flex-col">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex-1">
          <h3 className="font-mono font-bold text-lg text-slate-200 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {deadlinesData.map(item => (
              <div
                key={item.id}
                className="relative pl-4 border-l-2 border-slate-700 pb-4 last:pb-0 cursor-pointer hover:bg-slate-800/30 -ml-2 pl-6 rounded-r-lg transition-colors"
                onClick={() => onSelectApp(item.appId)}
              >
                <div className={`absolute left-[3px] top-0 w-2.5 h-2.5 rounded-full ${item.urgent ? 'bg-primary-500' : 'bg-slate-500'}`}></div>
                <h4 className="text-sm font-bold text-white leading-none mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 mb-2">Due in {item.due} • {item.type}</p>

                <div className="flex gap-2">
                  <button
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Schedule Work
                  </button>
                  {item.link && (
                    <button
                      className="text-[10px] bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 px-2 py-1 rounded transition-colors flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.link, '_blank');
                      }}
                    >
                      Go to Portal <ExternalLink size={10} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-3">Need to schedule a new supplemental essay session?</p>
          <Button fullWidth variant="outline" className="h-8 text-xs">Add to Calendar</Button>
        </div>
      </div>
    </div>
  );
};
