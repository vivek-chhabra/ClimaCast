import Search from '../search/Search'
import './Home.scss'

type Props = {}

export default function Home({}: Props) {
  return (
    <div className='Home'>
        <Search />
    </div>
  )
}