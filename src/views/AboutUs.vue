<script setup></script>

<template>
  <div class="about-container">

    <div class="content">
      
      <h1 class="headline">Discover the Secret Behind Santa’s Magic!</h1>
      <p class="subtitle">
        Welcome to Santa’s Secret, the holiday planner inspired by the ultimate Christmas expert—Santa himself! With our app, you’ll find the secret tools to plan, track, and create a truly magical holiday season, all with ease and joy. Let Santa’s Secret guide you through every step of your festive preparations!
      </p>

      <div class="meet-creators">
        <h2>Meet Your Christmas Crew!</h2>
      </div>
      
      <div class="features-grid">
        <!-- Creator Card for Ana -->
        <div class="feature-card">
          <img src="@/assets/img/ProfileAna1.jpg" alt="Ana" class="creator-image" />
          <img src="@/assets/img/SantaHat1-removebg-preview.png" alt="Santa Hat" class="santa-hat" />
          <h3>Ana</h3>
          <p>“Christmas is about bringing everyone together. With Santa’s Secret, I wanted to make planning easy so families can focus on what truly matters.”</p>
        </div>

        <!-- Creator Card for Ionela -->
        <div class="feature-card">
          <img src="@/assets/img/ProfileIonela6.jpg" alt="Ionela" class="creator-image" />
          <img src="@/assets/img/SantaHat1-removebg-preview.png" alt="Santa Hat" class="santa-hat" />
          <h3>Ionela</h3>
          <p>“From lists to lights, every detail counts! Let Santa’s Secret help you sprinkle a little magic on your holiday planning.”</p>
        </div>

        <!-- Creator Card for Angele -->
        <div class="feature-card">
          <img src="@/assets/img/ProfileAngele.jpg" alt="Angele" class="creator-image" />
          <img src="@/assets/img/SantaHat1-removebg-preview.png" alt="Santa Hat" class="santa-hat" />
          <h3>Angele</h3>
          <p>“Preparing for Christmas should feel magical, not overwhelming! With Santa’s Secret, I hope to inspire joy in every step of your holiday journey.”</p>
        </div>
      </div>

      <!-- Our Story Section -->
      <div class="our-story">
        <h2>Our Story</h2>
        <p>
          Santa’s Secret was created for those who love the joy of Christmas but not the hustle of organizing it all. We wondered: what if we could uncover Santa’s secret to a perfectly planned Christmas and share it with the world? With that inspiration, Santa’s Secret was born to bring organization, joy, and just a sprinkle of holiday magic to everyone’s festive planning.
        </p>
      </div>

      <!-- Our Mission Section -->
      <div class="our-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to give you the tools and inspiration to make this season unforgettable, stress-free, and filled with cheer. From tracking gift lists to managing events, we want you to feel like you’ve got Santa’s own planning toolkit at your fingertips.
        </p>
      </div>

      <!-- Thank You Section -->
      <div class="thank-you">
        <h2>Thank you for making Santa’s Secret part of your holiday traditions! May your Christmas be filled with joy, laughter, and just a hint of Santa’s secret magic.</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  min-height: 100vh;
  background: linear-gradient(rgba(229, 213, 187, 0.9), rgba(229, 213, 187, 0.9));
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.about-container::before {
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
  color: #4a4a4a;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  font-family: 'Cinzel', serif;
}

.meet-creators {
  margin-top: 3rem;
}

.meet-creators h2 {
  font-size: 2.5rem;
  color: #30661e;
  font-family: 'Cinzel', serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* Style for the cards */
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
  align-items: center;
  text-align: center;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--text-secondary-clr);
}

.creator-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Cinzel', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.feature-card p {
  color: white;
  font-size: 1.4rem;
  line-height: 1.6;
  font-family: 'Great Vibes', cursive;
  opacity: 0.9;
  margin: 0;
  min-height: 3em;
}

/* Style for the small santa hat */
.santa-hat {
  position: absolute;
  top: -5px;
  left: 45%;
  transform: translateX(-50%);
  width: 90px;
  height: auto;
}

/* Separate styles for our story and mission sections */
.our-story,
.our-mission {
  margin-top: 2rem;
  text-align: center;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid #30661e;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.our-story:hover,
.our-mission:hover {
  transform: translateY(-5px);
}

.our-story::before,
.our-mission::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #30661e, #5c9c4a, #30661e);
}

.our-story h2,
.our-mission h2 {
  font-size: 2rem;
  color: #30661e;
  font-family: 'Cinzel', serif;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.our-story p,
.our-mission p {
  font-size: 1.4rem;
  color: #4a4a4a;
  margin: 0.5rem 0;
  line-height: 1.8;
  font-family: 'Lato', sans-serif;
}

/* Styling for the Thank You section */
.thank-you {
  margin-top: 2rem;
  text-align: center;
  padding: 1.5rem;
  background: var(--primary-light-clr);
}

.thank-you h2 {
  font-size: 1.8rem;
  color: #30661e;
  font-family: 'Cinzel', serif;
  margin: 0;
}

/* Media queries for responsive design */

/* For Large Screens (Desktops and larger tablets)*/
@media (max-width: 1200px) {
  h1 {
    font-size: 3.5rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .feature-card h3 {
    font-size: 1.8rem;
  }

  .feature-card p {
    font-size: 1.3rem;
  }

  .thank-you h2 {
    font-size: 1.7rem;
  }
}

/* For Medium Screens (Tablets) */
@media (max-width: 992px) {
  h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.3rem;
  }

  .meet-creators h2 {
    font-size: 2.3rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-card h3 {
    font-size: 1.7rem;
  }

  .feature-card p {
    font-size: 1.2rem;
  }
}

/* For Small Screens (Mobile devices) */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .meet-creators h2 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card h3 {
    font-size: 1.5rem;
  }

  .feature-card p {
    font-size: 1.1rem;
  }
}

/* For Extra Small Screens (Small mobile devices)*/
@media (max-width: 576px) {
  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .meet-creators h2 {
    font-size: 1.8rem;
  }

  .feature-card h3 {
    font-size: 1.3rem;
  }

  .feature-card p {
    font-size: 1rem;
  }

  .thank-you h2 {
    font-size: 1.5rem;
  }
}
</style>
