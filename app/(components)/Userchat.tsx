"use client"
import React , {useEffect , useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Userchat() {
  const [comms, setComms] = useState([]);
  useEffect(()=>{
    const getdata= async function(){
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
      setComms(response)
    }
    getdata();
  },[])

  const setchat = async function(current_chat:any){
    localStorage.setItem("current_chat",current_chat)
  }
  interface Element {
    self: string;
    to: string;
  }
  return (
    <>
    <Tabs defaultValue="Chats" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Chats">Chats</TabsTrigger>
        <TabsTrigger value="History">History</TabsTrigger>
      </TabsList>
      <TabsContent value="Chats">
      {comms.map(element => {//!this.state.loading && 
        return(
        <Card>
        <CardHeader className="grid grid-cols-[1fr_300px] items-start gap-4 space-y-0">
          <div className='mt-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          </div>
          <div className="space-y-1">
          <CardTitle onClick={() => setchat(`${element.to}`)}>{element.to}</CardTitle>
            <CardDescription>
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </CardDescription>
        </div>
        </CardHeader>
        </Card>
        )})}
      </TabsContent>
      <TabsContent value="History">
      <Card>
        <CardHeader className="grid grid-cols-[1fr_300px] items-start gap-4 space-y-0">
          <div className='mt-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          </div>
          <div className="space-y-1">
            <CardTitle>History</CardTitle>
            <CardDescription>
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </CardDescription>
        </div>
        </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  )
}
