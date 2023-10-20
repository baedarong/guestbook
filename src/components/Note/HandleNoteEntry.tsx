'use client'

import { Container } from '@/components/Container'
import TextArea from '../TextArea'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { auth } from '@/fbase'
import { User, onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect } from 'react'

// 익명으로 로그인
const authInfo = getAuth()
signInAnonymously(authInfo)

export function HandleNoteEntry() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
    })
  }, [])

  return (
    <Container className="px-2 sm:pt-10">
      <h1 className="text-2xl font-bold leading-7 text-slate-900 ">
        방문 이력 남기기 💬
      </h1>
      <TextArea user={user} />
    </Container>
  )
}
