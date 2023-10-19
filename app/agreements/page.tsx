"use client"
import Image from 'next/image'
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
import { useState, useEffect } from "react";
import Agreement from './(components)/Agreement'
import Popup from './(components)/Popup.'
import Urlqr from './(components)/Urlqr'

//import Templates from './(components)/Templates'
//import Embedd from './(components)/Chat'

export default function Home() {
  return (
    <>
    
    <div className='mt-2 ml-2 grid grid-cols-5 gap-4'>
      <div className='bg-black-300 col-span-2'>    
        <Agreement/>
      </div>
      <div className='col-span-3'>
      <Popup/> 
      <div className='flex flex-col h-screen'>
      
      <Card>
        <div className='flex flex-col h-[calc(95vh-4rem)] justify-center items-center'>
          <Urlqr/>
        </div>
      </Card>
      </div>
      </div>
    </div>
    </>
  )
}