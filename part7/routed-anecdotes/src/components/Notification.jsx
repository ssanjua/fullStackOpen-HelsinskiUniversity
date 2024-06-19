const Notification = ({ notify }) => {
  return (
    <>
      {
        notify && <div><strong>a new anecdote: {notify} created!</strong></div>
      }
    </>
  )
}

export default Notification