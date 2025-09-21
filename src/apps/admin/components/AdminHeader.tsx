import './AdminHeader.scss'

export const AdminHeader = (props: { title: string }) => {
  const { title } = props

  return (
    <div className="admin-header">
      <h1 className="font-display-md">{title}</h1>
    </div>
  )
}
