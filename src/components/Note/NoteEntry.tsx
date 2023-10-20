'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { dbService } from '@/fbase'

import { FormattedDate } from '@/components/FormattedDate'
import { Container } from '@/components/Container'
import { INote } from '@/types/NoteTypes'
import Loading from '../LoadingIcon'
import { cls } from '@/modules/cssModules'

export function NoteEntry() {
  const [notes, setNotes] = useState<INote[]>([])

  // DB 실시간 감지 -> onSnapShot
  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshop) => {
      const noteEntries: any[] = snapshop.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      const sortedArray = noteEntries.sort(
        (first, second) => second.createdAt - first.createdAt,
      )
      setNotes(sortedArray)
    })
  }, [])

  return (
    <>
      {notes.length < 1 ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        notes.map((note) => {
          return (
            <>
              <article
                aria-labelledby={`episode-${note.id}-title`}
                className="py-8 sm:py-10"
              >
                <Container>
                  <div className="flex flex-row items-stretch">
                    <div
                      key={note.id}
                      className={cls(
                        note.attachmentURL.length > 1 ? 'w-3/4' : 'w-full',
                        'flex flex-col',
                      )}
                    >
                      <h2
                        id={`note-${note.id}-title`}
                        className="mt-2 text-lg font-bold text-slate-900"
                      ></h2>
                      <FormattedDate
                        createdAt={note.createdAt}
                        className="order-first font-mono text-sm leading-7 text-slate-500"
                      />
                      <p className="mt-1 text-base leading-7 text-slate-700">
                        {note.text}
                      </p>
                    </div>
                    {note.attachmentURL && (
                      <Image
                        src={note.attachmentURL}
                        alt="attachmentURL"
                        className={' flex w-1/4 flex-col rounded-lg '}
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                </Container>
              </article>
            </>
          )
        })
      )}
    </>
  )
}
