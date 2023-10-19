"use client"
import React from 'react'
import { UserNav } from "@/components/ui/user-nav"
import { Search } from "@/components/ui/search"
import { MainNav } from "@/components/ui/main-nav"
import { useState, useEffect } from "react"
import Popup from './Popup'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const[isSearch,setSearch]=useState<boolean>(true);
  //const[isStr,setStr]=useState("block lg:hidden")
  const [asstatus, setAsstatus] = useState("user");
  const [Tokent, setToken] = useState<string>('');
  useEffect(() => {
    const as: string | null = localStorage.getItem("as");
    const access_tokenn: string | null = localStorage.getItem("access_tokenn");
    if(as !== null && access_tokenn !== null){
      setAsstatus(as);
      setToken(access_tokenn)
    }
  })

  const assignSearch = (newValue:boolean) => {
    setSearch(newValue);
  };
  return (
    <>
    <div className="flex-col md:flex sticky top-0 backdrop-blur-sm">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
          <Avatar>
            <AvatarImage src="https://raw.githubusercontent.com/captain0jay/Loomen/main/assets/Screenshot%20(38).png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
            <div className="ml-auto flex items-center space-x-3">
            <div className='block lg:hidden'>
              {Tokent!==null?
                  <Popup/>:<div></div>}
                </div>
              <UserNav />
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
