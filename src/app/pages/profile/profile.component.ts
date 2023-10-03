import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  newPostText = '';
  showCommentAlert = false;
  showPostAlert = false;


  private timeDifferenceInterval: any;
  private subscription: Subscription;

  posts = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        // // Get the user ID
        // const userId = user.uid;
        // console.log('User ID:', userId);
      }
    });

    // Update time difference every minute
    this.timeDifferenceInterval = setInterval(() => {
      this.posts.forEach(post => {
        console.log(this.getTimeDifference(post));
      });
    }, 60000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    // Clear the interval when the component is destroyed
    if (this.timeDifferenceInterval) {
      clearInterval(this.timeDifferenceInterval);
    }
  }
  // add and save comment
  saveComment(post) {
    if (post.comment.trim() === '') {
      this.showCommentAlert = true;
      return;
    }
    const commentData = {
      username: 'Hinata Shoyo',
      avatar: '../../../assets/img/hinata.png',
      comment: post.comment
    };
    post.savedComments.unshift(commentData);
    localStorage.setItem('comments', JSON.stringify(post.savedComments));
    post.comment = '';
    post.showComments = false;
    liked: false;
    this.showCommentAlert = false;
  }
  // create new post
  addPost() {
    if (this.newPostText.trim() === '') {
      this.showPostAlert = true;
      return;
    }
    const newPost = {
      text: this.newPostText,
      showComments: false,
      comment: '',
      savedComments: [],
      creationTime: new Date()
    };
    this.posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(this.posts));
    this.newPostText = '';
    this.showPostAlert = false;
  }

  getTimeDifference(post) {
    const now = new Date();
    const diff = now.getTime() - post.creationTime.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min`;
  }


}
