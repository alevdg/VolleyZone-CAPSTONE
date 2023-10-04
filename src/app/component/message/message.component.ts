import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';

  ngOnInit() {
    let storedMessages = sessionStorage.getItem('messages');
    this.messages = storedMessages ? JSON.parse(storedMessages) : [];
  }

  sendMessage() {
    this.messages.push(this.newMessage);
    sessionStorage.setItem('messages', JSON.stringify(this.messages));
    this.newMessage = '';
  }


  getCurrentTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return time;
  }
}

