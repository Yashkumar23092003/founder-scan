import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="container">
          <h1>About FounderScan</h1>
          <p>Helping investors identify high-potential founders through data-driven analysis</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-card card">
            <h2>Our Mission</h2>
            <p>
              At FounderScan, we believe that identifying the right founders is the most critical factor in successful venture investing. Our platform uses advanced analytics to help investors like Antler, EF, and Kalari Ventures identify high-potential entrepreneurs before they even launch their startups.
            </p>
            <p>
              By analyzing LinkedIn profiles and career trajectories, we provide data-driven insights that complement human intuition and help investors make more informed decisions about which founders to back.
            </p>
          </div>

          <div className="about-card card">
            <h2>Our Approach</h2>
            <p>
              Our proprietary algorithm analyzes dozens of factors that correlate with founder success, including:
            </p>
            <ul>
              <li>Career progression and growth trajectory</li>
              <li>Leadership experience and team management</li>
              <li>Technical and domain expertise</li>
              <li>Educational background and continuous learning</li>
              <li>Previous entrepreneurial experience</li>
              <li>Professional network strength and connections</li>
            </ul>
            <p>
              We've trained our model on thousands of profiles from successful and unsuccessful founders to identify the patterns that predict entrepreneurial success.
            </p>
          </div>

          <div className="about-card card">
            <h2>For Investors</h2>
            <p>
              FounderScan helps you:
            </p>
            <ul>
              <li>Save time in the initial screening process</li>
              <li>Identify promising founders who might otherwise be overlooked</li>
              <li>Supplement your intuition with data-driven insights</li>
              <li>Standardize your evaluation process with objective metrics</li>
              <li>Build stronger investment portfolios by identifying the right talent</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 