import React, { useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget"

const handleAdminClick = () => {
  if (netlifyIdentity.currentUser()) {
    window.location.href = `${window.location.origin}/admin`
  } else {
    netlifyIdentity.open()
  }
}

export default () => {
  useEffect(() => {
    netlifyIdentity.init({ container: "#identity-service" })
  }, [null])

  return (
    <button id="identity-service" onClick={handleAdminClick}>
      Login with Netlify Identity
    </button>
  )
}
