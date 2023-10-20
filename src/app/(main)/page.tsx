import { HandleNoteEntry } from '@/components/Note/HandleNoteEntry'
import { NoteEntry } from '@/components/Note/NoteEntry'

export default function Home() {
  return (
    <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
      <HandleNoteEntry />
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        <NoteEntry />
      </div>
    </div>
  )
}

export const revalidate = 10
