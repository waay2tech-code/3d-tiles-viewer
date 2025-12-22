import React from 'react';
import '../App.css';

const HomeView = () => {
  return (
    <div className="home-view">
      <header className="app-header">
        <div className="app-header-inner">
          <h1>NPV Visuals</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/viewer">Tile Viewer</a></li>
              <li><a href="/admin">Admin Panel</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        <div className="home-container">
          <section className="hero-section">
            <div className="hero-section-inner">
              <h2>Premium 3D Tile Visualization</h2>
              <p>Experience our cutting-edge platform for visualizing and designing with premium tile collections in stunning 3D environments. Transform your space planning with realistic previews.</p>
              <div className="cta-buttons">
                <a href="/viewer" className="btn">Start Designing</a>
                <a href="/admin" className="btn secondary">Admin Access</a>
              </div>
            </div>
          </section>
          
          <section className="features-section">
            <div className="feature-card">
              <h3>🏠 Advanced Room Simulation</h3>
              <ul>
                <li>Browse tiles organized by room type with precise dimensions</li>
                <li>Realistic 3D environments for accurate visualization</li>
                <li>Professional-grade rendering with dynamic lighting</li>
                <li>Multiple room types: Bathrooms, Kitchens, Bedrooms, and more</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>📐 Precision Tile Placement</h3>
              <ul>
                <li>Accurate tile layout calculations with grout spacing</li>
                <li>Multiple pattern options: Straight, Brick, Herringbone</li>
                <li>Real-time tile requirement calculations</li>
                <li>Customizable tile colors and materials</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>⚙️ Professional Administration</h3>
              <ul>
                <li>User management and access control</li>
                <li>Tile catalog management with image uploads</li>
                <li>Detailed analytics and reporting</li>
                <li>Secure cloud-based storage</li>
              </ul>
            </div>
          </section>
          
          <section className="cta-section">
            <div className="cta-section-inner">
              <h2>Ready to Transform Your Design Process?</h2>
              <p>Join thousands of professionals who trust NPV Visuals for their tile visualization needs</p>
              <a href="/viewer" className="btn">Get Started Today</a>
            </div>
          </section>
        </div>
      </main>
      
      <footer>
        <div className="home-container">
          <p>&copy; 2025 NPV Visuals. All rights reserved. | Premium 3D Tile Visualization Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;