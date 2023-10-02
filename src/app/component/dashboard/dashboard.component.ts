import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  showGroups = false;
  showTrainings = false;
  showPhotos = false;
  newPostText = '';
  showCommentAlert = false;
  showPostAlert = false;
  requestAccepted = false;
  requestDeclined = false;
  requestFriendSent = {};

  // Static posts
  post1 = {
    showComments: false,
    comment: '',
    savedComments: ['See you on the next match!'],
    liked: false,
    username: 'Tetsurō Kuroo',
    avatar: '../../../assets/img/kuuro.png'
  };

  post2 = {
    showComments: false,
    comment: '',
    savedComments: ['I am excited to dig some balls and receive powerfull attacks!'],
    liked: false,
    username: 'Yu Nishinoya',
    avatar: '../../../assets/img/nishinoya.png'
  };

  post3 = {
    showComments: false,
    comment: '',
    savedComments: ['I will block you one day Ushijima, just wait for it!'],
    liked: false,
    username: 'Kei Tsukishima',
    avatar: '../../../assets/img/tsukki.png'
  };

  post4 = {
    showComments: false,
    comment: '',
    savedComments: [['Great practice! Looking forward to the next training!']],
    liked: false,
    username: 'Tobio Kageyama',
    avatar: '../../../assets/img/kageyama.png'
  };


  // Array for user generated posts
  posts = [];

  private timeDifferenceInterval: any;
  private subscription: Subscription;

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

  toggleGroups() {
    this.showGroups = !this.showGroups;
  }

  toggleTrainings() {
    this.showTrainings = !this.showTrainings;
  }

  togglePhotos() {
    this.showPhotos = !this.showPhotos;
  }

  toggleComments(post) {
    post.showComments = !post.showComments;
  }
  redirectToTeamPage() {
    this.router.navigate(['/Team']);
  }

  acceptRequest() {
    this.requestAccepted = true;
    this.requestDeclined = false;
  }

  declineRequest() {
    this.requestDeclined = true;
    this.requestAccepted = false;
  }

  sendRequest(id: string) {
    this.requestFriendSent[id] = true;
  }

}
