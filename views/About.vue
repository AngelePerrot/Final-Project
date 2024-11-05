<template>
  <div class="home-container">
    <div class="content">
      <h1>Welcome to Your Christmas Planner</h1>
      <p class="subtitle">
        Making your holiday season magical, one task at a time
      </p>

      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">🎄</span>
          <h3>Plan Events</h3>
          <p>Organize your holiday gatherings and celebrations</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🎁</span>
          <h3>Gift Lists</h3>
          <p>Keep track of your Christmas shopping</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">📅</span>
          <h3>Calendar</h3>
          <p>Never miss important holiday dates</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">✨</span>
          <h3>Bucket List</h3>
          <p>
            A selection of holiday traditions and activities to try with family
            and friends
          </p>
        </div>
      </div>

      <div class="creator-section">
        <h2>Meet the Creators</h2>
        <p class="creator-story">
          Welcome to our Christmas To-Do App! We are Ana, Ionela, and Angele -
          three passionate developers who created this project as part of our
          bootcamp final assessment. Our shared love for the holiday season and
          desire to help others stay organized during this busy time inspired us
          to create this festive planning tool. We combined our diverse skills
          and creativity to build an application that brings both functionality
          and Christmas cheer to your holiday planning experience.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  width: 100%;
}

h1 {
  color: #30661e;
  font-size: 4rem;
  margin-bottom: 1rem;
  font-family: 'Cinzel', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  color: var(--text-primary-clr);
  font-size: 1.5rem;
  margin-bottom: 3rem;
  font-family: 'Cinzel', serif;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 20px;
}

.feature-card {
  background: var(--primary-clr);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: -8px 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  z-index: 1;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--text-secondary-clr);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: block;
  position: relative;
  z-index: 2;
}

.feature-card h3 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  font-family: 'Cinzel', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  min-height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card p {
  color: white;
  font-size: 1.65rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  font-family: 'Great Vibes', cursive;
  opacity: 0.9;
  margin: 0;
  min-height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-section {
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background: var(--text-secondary-clr);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.creator-section h2 {
  color: #30661e;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Cinzel', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.creator-story {
  color: rgb(255, 255, 255);
  font-size: 1.6rem;
  line-height: 1.6;
  max-width: 800px;
  margin: auto;
  font-family: 'Great Vibes', cursive;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
