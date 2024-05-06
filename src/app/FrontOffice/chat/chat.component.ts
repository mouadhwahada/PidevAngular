import {Component, OnInit, ViewChild} from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import {Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any = [];
  me: any = 1;  // this.storageService.getUser().id
  messageInput: any;
  users: any[] = [];
  userClick: any;
  iHaveMessage: any = 0;
  currentUser$: Observable<any | null> = this.chatService.getUser(this.me);

  @ViewChild('myScrollContainer') myScrollContainer: any;
  constructor(private http: HttpClient, private chatService: ChatService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.connect();
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getAllUsers(): void {
    this.chatService.getAllUsers().subscribe(
      (users: any[]) => {
        this.users = users;
        console.log('Users fetched:', this.users)
      }
    );
  }

  stompClient: any;
  connect() {
    const url = `http://localhost:8070/ws`;
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe("/topic/messages/" + this.me, (message: any) => {
          this.showMessage(message);
      });

    });
  }

  showMessage(msg: any) {
    const messageContent = JSON.parse(msg.body).content;
    const messageSender = JSON.parse(msg.body).sender;
    const messageRecipient = JSON.parse(msg.body).recipient;
    const messageDate = JSON.parse(msg.body).sentAt;


    console.log('before' , this.messages);

    this.messages.push({ sender: messageSender, content: messageContent , recipient : messageRecipient, sentAt : messageDate });

    console.log('after' , this.messages);
    console.log(this.messages);
  }

  countMessage(id :any){
    let nb = 0;
    for(let i = 0 ; i<this.messages.length ; i++){
      if(this.messages[i].sender.id == id){
        nb = nb +1
      }
    }
    return nb
  }

  sendMessage() {
    const chatMessage = {
      idSender: this.me,
      idRecipient: this.userClick.id,
      content: this.messageInput,
    };
    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    this.messageInput = null;
  }

  clickUser(user: any) {
    this.userClick = user;
    const messageSender = this.me;
    const messageRecipient = user.id;

    forkJoin([
      this.chatService.getMessagesBySenderAndReceiver(messageSender, messageRecipient),
      this.chatService.getMessagesBySenderAndReceiver(messageRecipient, messageSender)
    ]).subscribe(
      ([messages1, messages2]: any[][]) => {
        this.messages = [...messages1, ...messages2];
        this.messages.sort((a: { sentAt: string; }, b: { sentAt: string; }) => {
          const dateA = new Date(a.sentAt);
          const dateB = new Date(b.sentAt);
          return dateA.getTime() - dateB.getTime();
        });        console.log('Messages fetched:', this.messages);
      },
      (error) => {
        console.error('Error in fetching messages:', error);
      }
    );
  }
}
