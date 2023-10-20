import { PaperClipIcon } from '@heroicons/react/24/outline'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { INote } from '@/types/NoteTypes'

import { User } from 'firebase/auth'
import { dbService, storageService } from '@/fbase'
import { ref, uploadString, getDownloadURL } from '@firebase/storage'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  user?: User
}
export default function TextArea({ user }: Props) {
  const [textarea, setTextarea] = useState<string>('')
  const [file, setFile] = useState<string>('')
  const [attachment, setAttachment] = useState<string>('')

  const onChange = (event: { target: { value: any } }) => {
    const {
      target: { value },
    } = event
    setTextarea(value)
  }

  // return Promise, so set Async & Await
  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (!user) return
    if (textarea === '') return

    let attachmentURL = ''
    if (attachment !== '') {
      const fileRef = ref(storageService, `${user.uid}/${uuidv4()}`) // 1. 파일에 대한 reference 갖기
      const response = await uploadString(fileRef, attachment, 'data_url') // 2. 해당 ref로 bucket에 저장하기

      // [return] promise | promise : 기다려달라, await: 기다리겠다 -> 값을 받을 때까지 기다림
      // https://firebase.google.com/docs/reference/js/storage#getdownloadurl
      attachmentURL = await getDownloadURL(response.ref) // 3. 해당 ref의 URL 받기 (collection에 주소 저장)
    }

    const postingObj: INote = {
      text: textarea,
      isAdmin: false, // 현재는 익명의 유저만 사용
      createdAt: Date.now(),
      creatorId: user.uid,
      attachmentURL,
    }
    await dbService.collection('nweets').add(postingObj) // 4. collection에 저장.

    setTextarea('')
    setFile('')
    setAttachment('')
  }

  const onAddAttachment = (event: { target: { files: any } }) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    setFile(theFile.name)

    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const {
        //@ts-ignore
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = () => {
    setFile('')
    setAttachment('')
  }

  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="min-w-0 flex-1">
        <form onSubmit={onSubmit}>
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500">
            <label htmlFor="comment" className="sr-only">
              문구 입력
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
              placeholder="문구 입력..."
              value={textarea}
              onChange={onChange}
            />
          </div>

          <div className="flex justify-between pt-3">
            <div className="flex items-center space-x-5">
              <div className="flex">
                <label
                  htmlFor="attach-file"
                  className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon
                    className="h-6 w-6 cursor-pointer"
                    aria-hidden="true"
                  />
                  <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onAddAttachment}
                    className="hidden"
                  />
                </label>
                {file === '' && (
                  <span className="flex items-center text-sm  text-gray-500 group-hover:text-gray-600">
                    사진 첨부하기
                  </span>
                )}
                {file.length > 1 && (
                  <div className="flex items-center gap-1 text-sm italic text-gray-500 group-hover:text-gray-600">
                    <span>{file}</span>
                    <XMarkIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={onClearAttachment}
                    />
                    <label htmlFor="comment" className="sr-only">
                      첨부파일 삭제
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                게시하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
