import './ScrapeResults.css';

export default function ScrapeResults({successfulScrapes, failedScrapes}) {
  return (
    <div className='ScrapeResults'>
        <div className='successfulScrapes'>
            <h3>Successful Scrapes</h3>
            <ul>
                {successfulScrapes.map((patent, idx) => <li key={idx}>{patent}</li>)}
            </ul>
        </div>
        <div className='failedScrapes'>
            <h3>Failed Scrapes</h3>
            <ul>
                {failedScrapes.map((patent, idx) => <li key={idx}>{patent}</li>)}
            </ul>
        </div>
    </div>
  )
}
