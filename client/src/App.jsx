import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchQuote = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:3000/getQuote')
      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        setError(data.message)
      } else {
        setLoading(false)
        setError(null)
        setQuote(data)
      }
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    fetchQuote()
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div 
      className='bg-cover font-quote h-screen flex flex-col items-center justify-center'
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className='bg-white h-96 w-[500px] shadow-md rounded-lg m-3 p-4 flex flex-col items-center justify-center'>
        <div className='flex-grow flex items-center'>
          {
          error ?
            <div>
              {error}
            </div>
          :
          loading ? 
            <div className='mx-auto animate-pulse container px-4 my-4 flex flex-col items-center'>
              <img 
                className='h-[80px]'
                src="/magnifying-glass.svg" 
                alt="plane" 
              />
              <p className='text-lg'>
                Finding your Quote
              </p>
            </div>
            :
          quote ?
            <div className='w-full'>
              <div className='text-xl text-orange-900 font-semibold text-justify'>
                {quote.quote}
              </div>
              <div className='mt-2 w-full text-right'>
                - {quote.author}
              </div>
            </div>
            :
            <h1>
              Hello
            </h1>
          }
        </div>
        <button
          className='bg-orange-400 self-end p-3 rounded-lg font-semibold hover:border hover:bg-white hover:border-slate-100 hover:text-orange-500 duration-200'
          onClick={handleClick}
        >
          Generate new Quote
        </button>
      </div>

    </div>
  )
}

export default App
