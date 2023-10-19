"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { io, Socket } from "socket.io-client";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

export default function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ message: string; githubid: string }[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState("default");
  const [roomid, setRoom] = useState("default");
  const [pay, setPay] = useState<string>('nopay');
  const [renderpay, setRenderpay] = useState<string>('no');
  const [orderstatus, setOrderstatus] = useState<string>('NOT_CLICKED');
  const [feedback, setFeedback] = useState<string>('');
  const [githubid, setgithubid] = useState<string>('');
  const [Pastchats, setPastChats] = useState([]);
  // useRef to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    localStorage.setItem("llm","yes");
    const getChats = async function(){
      const github_id = localStorage.getItem("github_id")
      if(github_id!=null){
      setgithubid(github_id)
      }
      const roomid = localStorage.getItem("roomid")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
          headers.append("roomid", String(roomid));
      const responset = await fetch("http://localhost:4000/getchats",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      console.log(responset)
      const chatresponse = responset[0].Chat;
      setPastChats(chatresponse)
    }
    getChats();

    const checkorderstatusrender = async function(response:any){}
    const getorderstatus = async function(){
      const github_id = localStorage.getItem("github_id")
    const current_chat = localStorage.getItem("current_chat")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
          headers.append("current_chat", String(current_chat));
      const responset = await fetch("http://localhost:4000/getorderstatus",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.text();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      setOrderstatus(responset)
    }
    getorderstatus();
    const checkpayrender = async function(response:any){
      if(response[0].as==="user"){
        if(response[0].pay==="yes")[
          setRenderpay("yes")
        ]
      }
    }
    const getcommunication = async function(){
      const github_id = localStorage.getItem("github_id")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
      const response = await fetch("http://localhost:4000/getcomm",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      checkpayrender(response)
    }

    getcommunication();

    let current_chat =  localStorage.getItem("current_chat")
    let as = localStorage.getItem("as")
    if(as=="client"){
      setPay("pay")
    }
    if(current_chat!=null){
       setChat(current_chat);
    }
    // Connect to the Socket.IO server
    let room_id;
    const clientstatus = localStorage.getItem("as");
    if (clientstatus === "user") {
      room_id = localStorage.getItem("client_id");
    } else {
      room_id = localStorage.getItem("github_id");
    }
    const socketInstance = io("http://localhost:8000");
    if (room_id !== null) {
      console.log(room_id);
      setRoom(room_id);
      localStorage.setItem("roomid", room_id);
    }
    
    socketInstance.emit('join room', room_id);   
    // Set up a listener for incoming messages
    socketInstance.on('chat message', (message: string,githubid:string) => {   
      const Recievedmessage = { message: message, githubid: githubid};
        setMessages((prevMessages) => [...prevMessages, Recievedmessage]);     
    }); 

    function scrollToBottom() {
      const container = document.getElementById('scrollarea');
      if(container!==null){
      container.scrollTop = container.scrollHeight;
      }
    }
    scrollToBottom();
    // Store the socket
    setSocket(socketInstance);
    return () => {
      // Disconnect the socket and set isMounted to false when the component unmounts
      socketInstance.disconnect();
      isMounted.current = false;
    };
  }, []);

  const sendMessage = () => {
    const github_id = localStorage.getItem("github_id")
    const llm = localStorage.getItem("llm");
    if(llm==="yes"){
        const llmChat = async function(){
        const roomid = localStorage.getItem("roomid")
        const product_id = localStorage.getItem("product_id")
        const headers = new Headers();
              headers.append("roomid", String(roomid));
              headers.append("message", String(message));
              headers.append("product_id", String(product_id));
              headers.append("github_id", String(github_id));
        const responset = await fetch("http://localhost:4000/llmanswer",{
        method:"GET",
        headers: headers,
        }).then((response)=>{
            console.log(response)
            return response.text();
        }).then((data)=>{
            console.log(data);
            return data;
        })
        console.log(responset)
        //setMessages((prevMessages) => [...prevMessages, responset]);
        //if (socket) {
          //socket.emit('chat message', { room: { roomid }, responset });
          //setMessage('');
        //}
      }
      llmChat();
    }

    if (socket) {
      socket.emit('chat message', { room: { roomid }, message, githubid });
      setMessage('');
    }
    const saveChats = async function(){
      const github_id = localStorage.getItem("github_id")
      const roomid = localStorage.getItem("roomid")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
          headers.append("roomid", String(roomid));
          headers.append("message", String(message));

      const responset = await fetch("http://localhost:4000/savechats",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      console.log(responset)
    }
    saveChats();
  };

  const sendPayment = async function (){
    const github_id = localStorage.getItem("github_id")
    const current_chat = localStorage.getItem("current_chat")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
          headers.append("current_chat", String(current_chat));
      const response = await fetch("http://localhost:4000/updatepay",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      console.log(response);
  }

  const getPaymentlink = async function(){
    const github_id = localStorage.getItem("github_id")
    const current_chat = localStorage.getItem("current_chat")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
          headers.append("current_chat", String(current_chat));
      const responset = await fetch("http://localhost:4000/getpaylink",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.text();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      window.location.assign(responset);
      console.log(responset);
  }

  const sendFeedback = async function(){
    const github_id = localStorage.getItem("github_id")
    const current_chat = localStorage.getItem("current_chat")
    const headers = new Headers();
          headers.append("github_id", String(github_id));
          headers.append("current_chat", String(current_chat));
          headers.append("feedback", String(feedback));
      const responset = await fetch("http://localhost:4000/sendfeedback",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      console.log(responset);
  }

  

    // Function to scroll to the bottom

  return (
    <>
      <div className='relative'>
        <div className='grid grid-cols-2'>
        <div className='mt-4 ml-2 mb-2 col-span-1'>{chat}</div>
        <div className='col-span-1 p-1'>
          {pay==="pay"?
          <Button className=' absolute right-0'  onClick={sendPayment}>Send Pay</Button>
            :
          <Button className=' absolute right-0' onClick={getPaymentlink}>Pay now</Button>
          }
        
        </div>
        </div>
        <Separator />
        
        <div>
        <ScrollArea className="h-[400px] w-[100%] rounded-md border" id='scrollarea'>
        <ul>
        
          {Pastchats.map(newchat => (
            
            <li>
              {githubid===`${newchat.github_id}`?
              <div className='right-0 ml-2 hidden'>
              <Badge>You</Badge></div>:<Badge className='right-0 ml-2'>{chat}</Badge>}
              <div className='bg-white rounded grid grid-cols-10 p-2 '>
              {githubid===`${newchat.github_id}`?
                 <div className='col-span-2'></div>:<div className='hidden'></div>}
              {githubid===`${newchat.github_id}`?
              <div className='bg-lime-500 col-span-7 p-2 rounded-2xl border right-0'>
                {newchat.message}
              </div>
              :
              <div className='bg-sky-400 col-span-7 p-2 rounded-2xl border left-0'>
                {newchat.message}
              </div>
              }
              </div>
            </li>
          ))}
          {messages.map((msg, index) => (
            <li key={index}>
              <div className='bg-white rounded mx-2 grid grid-cols-10 my-2'>
              {githubid===`${msg.githubid}`?
              <div className='bg-lime-500 col-span-7 p-2 rounded-2xl border right-0 '>
                {msg.message}
              </div>
              :
                <div className='bg-sky-400 col-span-7 p-2 rounded-2xl border'>
                  {msg.message}
                </div>}
              </div>
              </li>
          ))}
        </ul>
        {renderpay==="yes"&&orderstatus==='NOT_CLICKED'?
        <div className='p-2'>
          <Card className='p-2'>
            <CardTitle>Payment request has been made by {chat}</CardTitle>
            <Button className='mt-2' onClick={getPaymentlink}>Pay now</Button>
          </Card>
        </div>
        :
        <div></div>}

        {orderstatus==='OPEN'?
        <div className='p-2'>
          <Card className='p-2'>
            <CardTitle>Payment request by {chat}</CardTitle>
            <CardDescription>link is still open pay by it or try again using pay now button</CardDescription>
            <Button className='mt-2' onClick={getPaymentlink}>Pay now</Button>
          </Card>
        </div>
        :
        <div></div>}

      {orderstatus==='COMPLETED'?
        <div className='p-2'>
          <Card className='p-2'>
            <CardTitle>Payment request by {chat}</CardTitle>
            <CardDescription>Payment is completed thanks for shopping with us, please fill the feedback form we 
              will really appreciate it!
            </CardDescription>
          </Card>
        </div>
        :
        <div></div>}

     {orderstatus==='CANCELED'?
        <div className='p-2'>
          <Card className='p-2'>
            <CardTitle>Payment request by {chat}</CardTitle>
            <CardDescription>Alert: Payment ended unexpectedly try again!
            </CardDescription>
            <Button className='mt-2' onClick={getPaymentlink}>Pay now</Button>
          </Card>
        </div>
        :
        <div></div>}

      {orderstatus==='DRAFT'?
        <div className='p-2'>
          <Card className='p-2'>
            <CardTitle>Payment request by {chat}</CardTitle>
            <CardDescription>Payment waasn't processed, try again!
            </CardDescription>
            <Button className='mt-2' onClick={getPaymentlink}>Pay now</Button>
          </Card>
        </div>
        :
        <div></div>}
        </ScrollArea>
      </div>
      

      {orderstatus!=='COMPLETED'?
        <div className='grid grid-cols-10 gap-2 bottom-0 p-2'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here."
            className='col-span-9' id="message" />
          <Button className='col-span-1 mt-4' onClick={sendMessage}>send</Button>
        </div>:<div></div>
      }

      {orderstatus==='COMPLETED'?
        <div className='grid grid-cols-10 gap-2 bottom-0 p-2'>
          <Textarea value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
                    className='col-span-9' id="description" placeholder="FEEDBACK , Type your message here." />
          <Button className='col-span-1 mt-4' onClick={sendFeedback}>send</Button>
        </div>:<div></div>
      }
      </div>
    </>
  )
}
