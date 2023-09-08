"use client"
import React from 'react'
import TeamSwitcher from "@/components/ui/team-switcher"
import { UserNav } from "@/components/ui/user-nav"
import { Search } from "@/components/ui/search"
import { MainNav } from "@/components/ui/main-nav"
import { useState } from "react"
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
  
  const assignSearch = (newValue:boolean) => {
    setSearch(newValue);
  };
  return (
    <>
    <div className="flex-col md:flex sticky top-0 backdrop-blur-sm">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            
            <div className="ml-auto flex items-center space-x-4">
                <div className={`${!isSearch ? "block lg:hidden":"hidden lg:block"}`}>
                    <Search />
                </div>
                <div className={`${isSearch && "block lg:hidden"}`}>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full transition duration-1600 ease-in-out" onClick={() => assignSearch(!isSearch)}>
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                </Button>
                </div>
              <UserNav />
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
