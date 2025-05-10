import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import TaskList from './TaskList';
import AddTask from './AddTask';
import TaskDetail from './TaskDetail';

// We'll create a wrapper component to use the useLocation hook
function AppContent() {
  const location = useLocation();

  // Same jQuery animation for header from original
  React.useEffect(() => {
    $(document).ready(function() {
      $("h1").on("click", function() {
        $(this).fadeOut(300).fadeIn(300);
      });
    });
  }, []);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <header className="app-header">
          <h1>Simple Task Manager</h1>
          <div className="header-accent"></div>
        </header>
        
        <nav className="app-nav">
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === "/" ? "active" : ""}
              >
                <span className="icon">📋</span>
                Tasks
              </Link>
            </li>
            <li>
              <Link 
                to="/add" 
                className={location.pathname === "/add" ? "active" : ""}
              >
                <span className="icon">➕</span>
                Add Task
              </Link>
            </li>
          </ul>
        </nav>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Simple Task Manager</p>
        </footer>
      </div>
      
      {/* Embedded CSS for modern styling */}
      <style jsx>{`
        /* Modern CSS Reset */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        /* Global Styles */
        body {
          margin: 0;
          font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f7f9fc;
          color: #333;
          line-height: 1.6;
        }
        
        /* App Container */
        .app-container {
          min-height: 100vh;
          padding: 2rem 1rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);
        }
        
        /* App Wrapper */
        .app-wrapper {
          width: 100%;
          max-width: 800px;
          background-color: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .app-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }
        
        /* Header Styles */
        .app-header {
          padding: 2rem;
          background: linear-gradient(to right, #4776E6, #8E54E9);
          color: white;
          text-align: center;
          position: relative;
        }
        
        .app-header h1 {
          margin: 0;
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          cursor: pointer;
          position: relative;
          display: inline-block;
        }
        
        .header-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, 
            rgba(255,255,255,0.1), 
            rgba(255,255,255,0.5), 
            rgba(255,255,255,0.1)
          );
        }
        
        /* Navigation Styles */
        .app-nav {
          background-color: #ffffff;
          border-bottom: 1px solid #edf2f7;
        }
        
        .app-nav ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .app-nav li {
          flex: 1;
        }
        
        .app-nav a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          color: #4a5568;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .app-nav a:hover {
          background-color: #f7fafc;
          color: #4776E6;
        }
        
        .app-nav a.active {
          color: #8E54E9;
          border-bottom: 3px solid #8E54E9;
          background-color: rgba(142, 84, 233, 0.05);
        }
        
        .app-nav .icon {
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }
        
        /* Content Area */
        .app-content {
          padding: 2rem;
          min-height: 300px;
        }
        
        /* Footer Styles */
        .app-footer {
          padding: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #718096;
          background-color: #f8fafc;
          border-top: 1px solid #edf2f7;
        }
        
        .app-footer p {
          margin: 0;
        }
        
        /* Responsive Styles */
        @media (max-width: 600px) {
          .app-container {
            padding: 1rem 0.5rem;
          }
          
          .app-header h1 {
            font-size: 1.8rem;
          }
          
          .app-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

// Main App component remains unchanged in functionality
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;