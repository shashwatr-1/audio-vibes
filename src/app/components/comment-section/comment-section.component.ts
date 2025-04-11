import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  userLiked: boolean;
}

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  template: `
    <div class="comments-section">
      <h2>Comments</h2>
      
      <div class="comment-form">
        <textarea
          [(ngModel)]="newComment"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
        <button (click)="addComment()" [disabled]="!newComment.trim()">
          Comment
        </button>
      </div>

      <div class="comments-list">
        <div *ngFor="let comment of comments" class="comment">
          <div class="comment-header">
            <div class="user-info">
              <img [src]="'assets/images/default-avatar.png'" alt="User avatar" class="avatar">
              <span class="author">{{ comment.author }}</span>
            </div>
            <span class="timestamp">{{ comment.timestamp | date:'short' }}</span>
          </div>
          
          <div class="comment-content">
            {{ comment.content }}
          </div>
          
          <div class="comment-actions">
            <button class="like-button" (click)="toggleLike(comment)">
              <mat-icon [class.liked]="comment.userLiked">favorite</mat-icon>
              {{ comment.likes }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .comments-section {
      padding: 2rem;
      background: var(--bg-color);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      color: var(--text-color);
    }

    .comment-form {
      margin-bottom: 2rem;

      textarea {
        width: 100%;
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-color);
        font-size: 1rem;
        resize: vertical;
        margin-bottom: 1rem;

        &:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.3);
        }
      }

      button {
        padding: 0.5rem 1.5rem;
        background: #1976d2;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.3s ease;

        &:hover {
          background: #1565c0;
        }

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .comment {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
          }

          .author {
            font-weight: 500;
            color: var(--text-color);
          }
        }

        .timestamp {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .comment-content {
        color: var(--text-color);
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      .comment-actions {
        display: flex;
        gap: 1rem;

        .like-button {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;

          mat-icon {
            font-size: 1.2rem;
            width: 1.2rem;
            height: 1.2rem;
            
            &.liked {
              color: #f44336;
            }
          }

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }

    @media (max-width: 768px) {
      .comments-section {
        padding: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .comments-section {
        padding: 1rem;
      }

      h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }

      .comment {
        padding: 0.75rem;
      }
    }
  `]
})
export class CommentSectionComponent implements OnInit {
  comments: Comment[] = [];
  newComment: string = '';

  ngOnInit() {
    this.loadComments();
  }

  private loadComments() {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments).map((comment: any) => ({
        ...comment,
        timestamp: new Date(comment.timestamp)
      }));
    }
  }

  private saveComments() {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: this.comments.length + 1,
        author: 'Guest User',
        content: this.newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        userLiked: false
      };

      this.comments.unshift(comment);
      this.newComment = '';
      this.saveComments();
    }
  }

  toggleLike(comment: Comment) {
    if (comment.userLiked) {
      comment.likes--;
    } else {
      comment.likes++;
    }
    comment.userLiked = !comment.userLiked;
    this.saveComments();
  }
} 