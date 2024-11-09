<template>
  <div class="home-container">
    <div class="content">
      <h1>Welcome to Your Christmas Planner</h1>
      <p class="subtitle">
        Making your holiday season magical, one task at a time
      </p>

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

