import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ratings-section">
      <h2>Critic Ratings</h2>
      <div class="ratings-container">
        <div class="rating-card">
          <div class="logo-container imdb">
            <div class="logo-text">IMDb</div>
          </div>
          <div class="rating-content">
            <div class="stars">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star empty">★</span>
            </div>
            <p class="rating-comment">"Lund Touching audio"</p>
          </div>
        </div>

        <div class="rating-card">
          <div class="logo-container rt">
            <div class="logo-text">Rotten Tomatoes</div>
          </div>
          <div class="rating-content">
            <div class="stars">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="rating-comment">"A sonic jolt that grabs your soul"</p>
          </div>
        </div>

        <div class="rating-card">
          <div class="logo-container toi">
            <div class="logo-text">TOI</div>
          </div>
          <div class="rating-content">
            <div class="stars">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="rating-comment">"Shivam sax sux audio is a masterpiece, a wild ride that shakes senses silly"</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ratings-section {
      padding: 2rem 1rem;
      background: var(--bg-color);
      margin: 2rem 0;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: var(--text-color);
      font-size: 1.8rem;
    }

    .ratings-container {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      max-width: 1200px;
      margin: 0 auto;
    }

    .rating-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      min-width: 280px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        transform: translateY(-5px);
      }
    }

    .logo-container {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      overflow: hidden;
      padding: 4px;

      &.imdb {
        background: #f5c518;
      }

      &.rt {
        background: #FA320A;
      }

      &.toi {
        background: #FF0000;
      }

      .logo-text {
        color: #000000;
        font-weight: bold;
        font-size: 1.2rem;
        text-align: center;
        line-height: 1;
        font-family: Arial, sans-serif;
      }

      &.toi .logo-text {
        color: #FFFFFF;
      }

      &.rt .logo-text {
        color: #FFFFFF;
        font-size: 1rem;
      }
    }

    .rating-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }

    .stars {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .star {
      color: #ffd700;
      font-size: 1.8rem;
      text-shadow: 0 0 4px rgba(0,0,0,0.3);
      line-height: 1;

      &.empty {
        color: rgba(255, 215, 0, 0.3);
      }
    }

    .rating-comment {
      font-size: 0.9rem;
      color: var(--text-color);
      opacity: 0.8;
      font-style: italic;
      line-height: 1.4;
      margin: 0;
    }

    @media (max-width: 768px) {
      .ratings-container {
        gap: 1.5rem;
      }

      .rating-card {
        padding: 1.25rem;
        min-width: 240px;
      }

      .logo-container {
        width: 90px;
        height: 35px;

        .logo-text {
          font-size: 1.1rem;
        }

        &.rt .logo-text {
          font-size: 0.9rem;
        }
      }

      .star {
        font-size: 1.6rem;
      }

      .rating-comment {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 480px) {
      .ratings-section {
        padding: 1.5rem 0.5rem;
      }

      h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .ratings-container {
        gap: 1rem;
      }

      .rating-card {
        width: 100%;
        max-width: 300px;
        padding: 1rem;
      }

      .logo-container {
        width: 80px;
        height: 30px;

        .logo-text {
          font-size: 1rem;
        }

        &.rt .logo-text {
          font-size: 0.8rem;
        }
      }

      .star {
        font-size: 1.4rem;
      }

      .rating-comment {
        font-size: 0.8rem;
      }
    }
  `]
})
export class RatingsComponent {} 