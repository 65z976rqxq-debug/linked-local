import React, {useEffect, useState} from 'react'

export default function App(){
  const [msg, setMsg] = useState(null)

  useEffect(()=>{
    const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    fetch(`${base}/`)
      .then(r=>r.json())
      .then(j=>setMsg(j.message))
      .catch(e=>setMsg('error: '+String(e)))
  },[])

  return (
    <div style={{fontFamily:'sans-serif', padding:20}}>
      <h1>Linked Local Frontend</h1>
      <p>Backend message: <strong>{msg ?? 'loading...'}</strong></p>
    </div>
  )
}
