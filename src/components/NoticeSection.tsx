import { InformationCircleIcon } from '@heroicons/react/20/solid'

export function NoticeSection(
  props: React.ComponentPropsWithoutRef<'section'>,
) {
  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <InformationCircleIcon className="h-6 w-6 text-blue-500" />
        <span className="ml-2.5">Notice</span>
      </h2>
      <p className="mt-2 text-base leading-7 text-slate-700">
        *부적절한 내용은 관리자에 의해 삭제 조치될 수 있습니다. *배다롱이 제작에
        참여한 HeyNana 어플도 많이 이용 부탁드려요!
      </p>
    </section>
  )
}
