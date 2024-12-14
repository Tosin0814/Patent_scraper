import './Home.css'
import PatentSearchForm from "../../components/PatentSearchForm/PatentSearchForm"

export default function Home() {

  return (
    <main className="Home">
      <div className='mainSection'>
        <div className='documentSearch'>
          <PatentSearchForm />
        </div>
      </div>
    </main>
  )
}
