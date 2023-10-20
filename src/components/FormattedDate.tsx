export function FormattedDate({
  createdAt,
  ...props
}: React.ComponentPropsWithoutRef<'time'> & { createdAt: number }) {
  const date = new Date(createdAt)

  // 날짜
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  // 시간
  const hours = date.getHours().toString().padStart(2, '0') // 시간
  const minutes = date.getMinutes().toString().padStart(2, '0') // 분
  const seconds = date.getSeconds().toString().padStart(2, '0') // 초

  const formattedTime = `${hours}:${minutes}:${seconds}`

  return (
    <span {...props}>
      {formattedDate} {formattedTime}
    </span>
  )
}
