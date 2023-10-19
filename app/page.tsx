"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Drawer } from 'vaul';
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { useState, useEffect } from "react";
import Clientchat from './(components)/Clientchat'
import Userchat from './(components)/Userchat'
import Chat from './(components)/Chat'
import Chatnew from './(components)/Chatnew'

export default function Home() {
  const [asstatus, setAsstatus] = useState("user");
  const [chat,setChat] = useState("default");
  useEffect(() => {
    const as: string | null = localStorage.getItem("as");
    if(as !== null){
      setAsstatus(as);
    }
    const current_chat: string | null = localStorage.getItem("current_chat");
    if(current_chat !== null){
    setChat(current_chat);
  console.log(chat)}
  })
  return (
    <>
    <div className='block md:hidden lg:hidden'>
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild className='ml-1 mt-1 inline-block'>
        <Button>Chats</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md mx-auto">
              <ScrollArea className="h-full rounded-md border">
                <Chat/>
              </ScrollArea>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
      </div>


    <div className='mt-2 ml-2 grid grid-cols-5 gap-4'>
      <div className='bg-black-300 col-span-2'>
        {asstatus === "client" ?
        <Clientchat/> :
        <Userchat/>
        }
      </div>
      <div className='col-span-3 flex flex-col h-screen'>
        {chat === "default"?
      <Card>
        <div className='flex flex-col h-[calc(95vh-4rem)] justify-center items-center sm:block hidden'>
          No chat selected
        </div>
      </Card>:
      <Card>
        <div className='flex flex-col h-[calc(95vh-4rem)] sm:block hidden'>
          <Chat/>
        </div>
      </Card>
      }
      </div>
    </div>
    </>
  )
}
