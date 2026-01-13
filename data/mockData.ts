import { Application } from '../types';

export const initialApplications: Application[] = [
  {
    id: 1,
    university: 'University of Toronto',
    program: 'Computer Science',
    status: 'In Review',
    date: 'Applied Oct 15',
    icon: 'T',
    color: 'bg-blue-900/50 text-blue-200',
    actionItem: 'Online Student Profile',
    timeline: [
      { id: 1, title: 'OUAC Application Submitted', date: 'Oct 15', status: 'completed', description: 'Submitted via OUAC 101.' },
      { id: 2, title: 'JoinID Activated', date: 'Oct 18', status: 'completed', description: 'Access granted to Engineering Portal.' },
      { id: 3, title: 'Online Student Profile', date: 'Due: Nov 15', status: 'pending', description: 'Mandatory profile for Engineering applicants.', urgent: true },
      { id: 4, title: 'Video Interview', date: 'Due: Dec 01', status: 'upcoming', description: 'Personal video response required.' },
      { id: 5, title: 'Document Upload', date: 'Jan 31', status: 'upcoming', description: 'Interim grades and transcripts.' }
    ],
    credentials: [
      { portalName: 'JoinID', url: 'https://join.utoronto.ca', username: 'alex.lee2024', status: 'Active', lastLogin: '2 hours ago' },
      { portalName: 'Engineering Portal', url: 'https://portal.engineering.utoronto.ca', username: 'alex.lee2024', status: 'Active', lastLogin: 'Yesterday' },
      { portalName: 'OUAC', url: 'https://www.ouac.on.ca', username: 'OUAC-101-2024-ALEE', status: 'Active', lastLogin: 'Oct 15' }
    ]
  },
  {
    id: 2,
    university: 'Univ. of Waterloo',
    program: 'Software Engineering',
    status: 'Interview',
    date: 'Interview: Nov 12',
    icon: 'W',
    color: 'bg-yellow-900/50 text-yellow-200',
    actionItem: 'Admission Information Form (AIF)',
    timeline: [
      { id: 1, title: 'OUAC Application', date: 'Oct 10', status: 'completed' },
      { id: 2, title: 'Quest Account Setup', date: 'Oct 12', status: 'completed' },
      { id: 3, title: 'Admission Information Form (AIF)', date: 'Due: 2 Days', status: 'pending', description: 'Critical for admission decision.', urgent: true },
      { id: 4, title: 'Video Interview', date: 'Nov 12', status: 'upcoming' }
    ],
    credentials: [
      { portalName: 'Quest', url: 'https://quest.uwaterloo.ca', username: 'a3lee@uwaterloo.ca', status: 'Active', lastLogin: 'Today' },
      { portalName: 'AIF Portal', url: 'https://aif.uwaterloo.ca', username: 'a3lee@uwaterloo.ca', status: 'Active', lastLogin: '3 days ago' }
    ]
  },
  {
    id: 3,
    university: 'UBC',
    program: 'Data Science',
    status: 'Draft',
    date: 'Due: Dec 01',
    icon: 'U',
    color: 'bg-blue-800/50 text-blue-100',
    actionItem: 'Personal Profile Essays',
    timeline: [
      { id: 1, title: 'Create BCPlanner Account', date: 'Nov 01', status: 'completed' },
      { id: 2, title: 'Personal Profile Essays', date: 'Due: Dec 01', status: 'pending', description: '4 short essay questions.' },
      { id: 3, title: 'Final Submission', date: 'Dec 01', status: 'upcoming' }
    ],
    credentials: [
      { portalName: 'Student Service Centre', url: 'https://ssc.adm.ubc.ca', username: 'alexlee_2024', status: 'Active', lastLogin: 'Nov 01' }
    ]
  },
  {
    id: 4,
    university: 'McGill University',
    program: 'Robotics',
    status: 'Submitted',
    date: 'Applied Nov 01',
    icon: 'M',
    color: 'bg-red-900/50 text-red-200',
    actionItem: null,
    timeline: [
      { id: 1, title: 'Application Submitted', date: 'Nov 01', status: 'completed' },
      { id: 2, title: 'Minerva Login Received', date: 'Nov 03', status: 'completed' },
      { id: 3, title: 'Supporting Docs', date: 'Pending Review', status: 'upcoming' }
    ],
    credentials: [
      { portalName: 'Minerva', url: 'https://horizon.mcgill.ca/pban1/twbkwbis.P_WWWLogin', username: 'alex.lee@mail.mcgill.ca', status: 'Active', lastLogin: 'Nov 03' }
    ]
  },
];

export const deadlines = [
  { id: 1, title: 'Waterloo AIF', due: '2 days', urgent: true, type: 'Supplemental', link: 'https://uwaterloo.ca/quest' },
  { id: 2, title: 'UBC Personal Profile', due: '3 weeks', urgent: false, type: 'Application', link: 'https://ssc.adm.ubc.ca' },
  { id: 3, title: 'U of T Eng Interview', due: '1 month', urgent: false, type: 'Task', link: null },
];

export const portals = [
  { id: 1, university: 'University of Toronto', url: 'https://join.utoronto.ca', username: 'uoft_applicant_24', status: 'Active' },
  { id: 2, university: 'Univ. of Waterloo', url: 'https://quest.uwaterloo.ca', username: 'waterloo_hopeful', status: 'Active' },
  { id: 3, university: 'UBC', url: 'https://ssc.adm.ubc.ca', username: 'ubc_bound_2024', status: 'Pending' },
];
