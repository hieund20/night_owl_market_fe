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
  @ViewChild('pinChat') pinChat: ElementRef | undefined;

  //ChatRoom
  chatRoomList: any[] = [];
  chatRoomDetail: any = null;

  constructor(private chatRoomService: ChatroomsService) {}

  ngOnInit(): void {
    this.getAccessToken();
  }

  //API
  getAccessToken() {
    this.accessToken = <string>localStorage.getItem('access_token');
  }

  getChatRoomList() {
    this.chatRoomService.apiChatRoomsGet(this.accessToken).subscribe(
      (res) => {
        if (res) {
          console.log(res);
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
        }
      },
      (err) => {
        console.log('Some thing is wrong', err);
      }
    );
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
    this.getChatRoomById(id);
  }
}
