import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatroomsService } from 'src/app/services/chatrooms.service';

@Component({
  selector: 'app-pin-chat',
  templateUrl: './pin-chat.component.html',
  styleUrls: ['./pin-chat.component.scss'],
})
export class PinChatComponent implements OnInit {
  accessToken: string = '';
  toggleChat: boolean = false;

  //ChatRoom
  chatRoomList: any[] = [];
  chatRoomSelectedId: number = 0;
  chatRoomDetail: any = null;
  //Send message
  messageSendControl = new FormControl('');
  currentUser: any = null;
  isCurrentUserIsSendLastMessage: boolean = false;

  @ViewChild('pinChat') pinChat: ElementRef | undefined;

  constructor(private chatRoomService: ChatroomsService) {}

  ngOnInit(): void {
    this.getAccessToken();
    this.getCurrentUser();
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getChatRoomList() {
    this.chatRoomService.apiChatRoomsGet(this.accessToken).subscribe(
      (res) => {
        if (res) {
          this.chatRoomList = res.results;
        }
      },
      (err) => {
        console.log('Some thing is wrong', err);
      }
    );
  }

  getChatRoomById(id: number) {
    this.chatRoomService.apiChatRoomsIdGet(this.accessToken, id).subscribe(
      (res) => {
        if (res) {
          this.chatRoomDetail = res;
          this.compareCurrentUserWithTheLastPersonSendText();
        }
      },
      (err) => {
        console.log('Some thing is wrong', err);
      }
    );
  }

  sendMessageToChatRoom() {
    let body = {
      content: this.messageSendControl.value,
    };
    this.chatRoomService
      .apiChatRoomsSendMessagePost(
        this.accessToken,
        this.chatRoomSelectedId,
        body
      )
      .subscribe(
        (res) => {
          if (res) {
            this.messageSendControl.setValue('');
            this.getChatRoomById(this.chatRoomSelectedId);
          }
        },
        (err) => {
          console.log('Some thing is wrong', err);
        }
      );
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(<string>localStorage.getItem('current_user'));
  }

  //Others
  onOpenChatBox(): void {
    this.toggleChat = true;
    this.pinChat?.nativeElement.classList.add('open');

    if (this.toggleChat) {
      this.getChatRoomList();
    }
  }

  onCloseChatBox() {
    this.toggleChat = false;
    this.pinChat?.nativeElement.classList.remove('open');
  }

  onClickChatRoom(id: number) {
    this.chatRoomSelectedId = id;
    this.getChatRoomById(id);
  }

  onGoBackToTheChatRoomList() {
    this.chatRoomDetail = null;
  }

  compareCurrentUserWithTheLastPersonSendText() {
    let lastSendPerson = this.chatRoomDetail.last_message.creator;
    if (lastSendPerson.id === this.currentUser.id) {
      this.isCurrentUserIsSendLastMessage = true;
    } else {
      this.isCurrentUserIsSendLastMessage = false;
    }
  }
}
