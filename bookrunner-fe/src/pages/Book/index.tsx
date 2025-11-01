import { useEffect, useState } from 'react'
import BookDetails from './components/BookDetail'
import { useParams } from 'react-router-dom'
import { BookData } from '../../types/auth'

const Book = () => {
  const { id } = useParams()
  const [book, setBook] = useState<BookData>()
  const server = import.meta.env.VITE_SERVER

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${server}/api/books/${id}`)
      const data = await response.json()
      setBook(data)
      console.log(data);

    }
    fetchData()
  }, [])
  return (
    <div className=" mx-auto p-6">
      {
        book && (
          <BookDetails book={book} />
        )
      }
    </div>
  )
}

export default Book