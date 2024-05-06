import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8070/chat';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    const url = 'http://localhost:8070/user/retrieveAllUsers'
    return this.http.get<any[]>(url);
  }

  getUser(userId: number): Observable<any> {
    const url = `http://localhost:8070/user/retrieveUser/${userId}`;
    return this.http.get<any>(url);
  }


  getMessagesBySenderAndReceiver(senderId: number, receiverId: number): Observable<any[]> {
    const url = `${this.baseUrl}/messages/${senderId}/${receiverId}`;
    return this.http.get<any[]>(url);
  }


  // getChatRoomsBySenderOrRecipient(userId: number): Observable<any[]> {
  //   const url = `${this.baseUrl}/getChatRooms/${userId}`;
  //   return this.http.get<any[]>(url);
  // }
  //
  // getChatRoomById(id: number): Observable<any> {
  //   const url = `${this.baseUrl}/getChatRoomById/${id}`;
  //   return this.http.get<any>(url);
  // }
  //
  // getChatMessagesByChatRoom(itemId: number): Observable<any[]> {
  //   const url = `${this.baseUrl}/getChatMessagesByChatRoom/${itemId}`;
  //   return this.http.get<any[]>(url);
  // }
  //
  // addChatRoom(idSender: number, idRecipient: number): Observable<any> {
  //   const url = `${this.baseUrl}/addChatRoom/${idSender}/${idRecipient}`;
  //   return this.http.post<any>(url, null);
  // }
  //
  // deleteChatRoom(id: number): Observable<void> {
  //   const url = `${this.baseUrl}/deleteChatRoom/${id}`;
  //   return this.http.delete<void>(url);
  // }
  //
  // deleteMessage(itemId: number): Observable<void> {
  //   const url = `${this.baseUrl}/deleteMessage/${itemId}`;
  //   return this.http.delete<void>(url);
  // }

}
