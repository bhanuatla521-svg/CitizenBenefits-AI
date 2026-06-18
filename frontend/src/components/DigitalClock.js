import React, { useState, useEffect } from 'react';
import '../styles/DigitalClock.css';

function DigitalClock() {
  const [times, setTimes] = useState({
    UTC: new Date(),
    IST: new Date(),
    EST: new Date(),
    PST: new Date(),
    GMT: new Date(),
    CST: new Date()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      setTimes({
        UTC: new Date(now.toLocaleString('en-US', { timeZone: 'UTC' })),
        IST: new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })),
        EST: new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })),
        PST: new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })),
        GMT: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' })),
        CST: new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }))
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const timezones = [
    { key: 'UTC', name: 'UTC (Coordinated Universal Time)', offset: '+0:00', color: '#667eea' },
    { key: 'IST', name: 'IST (Indian Standard Time)', offset: '+5:30', color: '#FF6B6B' },
    { key: 'EST', name: 'EST (Eastern Standard Time)', offset: '-5:00', color: '#4ECDC4' },
    { key: 'PST', name: 'PST (Pacific Standard Time)', offset: '-8:00', color: '#45B7D1' },
    { key: 'GMT', name: 'GMT (Greenwich Mean Time)', offset: '+0:00', color: '#96CEB4' },
    { key: 'CST', name: 'CST (China Standard Time)', offset: '+8:00', color: '#FFEAA7' }
  ];

  return (
    <div className="digital-clock-container">
      <div className="clock-header">
        <h1>🌍 World Digital Clock</h1>
        <p>Real-time display across multiple time zones</p>
      </div>

      <div className="clocks-grid">
        {timezones.map(tz => (
          <div key={tz.key} className="clock-card" style={{ borderTopColor: tz.color }}>
            <div className="timezone-info">
              <h2 className="timezone-name">{tz.name}</h2>
              <p className="timezone-offset">UTC {tz.offset}</p>
            </div>

            <div className="time-display">
              <div className="digital-time">
                {formatTime(times[tz.key])}
              </div>
            </div>

            <div className="date-display">
              {formatDate(times[tz.key])}
            </div>

            <div className="timezone-indicator" style={{ backgroundColor: tz.color }}></div>
          </div>
        ))}
      </div>

      <div className="clock-info">
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default DigitalClock;
