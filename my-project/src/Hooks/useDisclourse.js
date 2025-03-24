import { useState } from 'react'

function useDisclourse() {
  const [open, setOpen] = useState(false)

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return { onOpen, onClose, open }
}

export default useDisclourse
