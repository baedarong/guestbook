import Link from 'next/link'

import { WaveLayout } from '@/components/WaveLayout'

export default function NotFound() {
  return (
    <main className="relative flex h-full items-center py-36 lg:px-8">
      <WaveLayout className="absolute left-0 top-0 h-20 w-full" />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-4 sm:px-6 lg:px-0">
        <p className="font-mono text-sm leading-7 text-slate-500">404</p>
        <h1 className="mt-4 text-lg font-bold text-slate-900">
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="mt-2 text-base leading-7 text-slate-700">
          관리자에 문의 바랍니다.
        </p>
        <Link
          href="/"
          className="mt-4 text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
        >
          뒤로가기
        </Link>
      </div>
    </main>
  )
}
