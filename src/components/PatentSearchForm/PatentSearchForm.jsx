import './PatentSearchForm.css'

import { useState } from 'react';

import {postPatentId } from '../../utilities/api/patentData';
import ScrapeResults from '../ScrapeResults/ScrapeResults';

export default function PatentSearchForm() {
    const [successfulScrapes, setSuccessfulScrapes] = useState([])
    const [failedScrapes, setFailedScrapes] = useState([])
    // const formReg = /([A-Z|a-z]{2}(\d+)[A-Z|a-z]{1,})/g
    const [formData, setFormData] = useState({})

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleChange = (evt) => {
        const newFormData = {
            ...formData, // use the existing formData
            [evt.target.name]: evt.target.value, // override whatever key with the current field's value
        };
        setFormData(newFormData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const patStart = parseInt(formData.patentIdStart)
        const patEnd = parseInt(formData.patentIdEnd)

        for (let i = patStart; i <= patEnd; i++) {
            let patNumStr = `US${i}`
            try {
                const patentData = await postPatentId({patentId: patNumStr})
                console.log(patentData)
                setSuccessfulScrapes((prev) => [...prev, patNumStr])
            } catch (err) {
                console.log(err)
                setFailedScrapes((prev) => [...prev, patNumStr])
            }
            // Wait 10 seconds between each scrape
            await sleep(10000);
            console.log('Awake')
        }

    }
    const disabled = !formData.patentIdEnd || !formData.patentIdStart || (parseInt(formData.patentIdStart) >= parseInt(formData.patentIdEnd))
    
    return(
        <div className="PatentSearchForm" onSubmit={handleSubmit}>
            <div className='searchForm'>
                <form id='patentForm' className='patentForm'>
                    <div className='country'>
                        US:
                    </div>
                    <div className='startRange'>
                        <label htmlFor='patentIdStart'>Enter Range Start</label>
                        <input onChange={handleChange} type="number" name='patentIdStart' id='patentIdStart' className='form-control' placeholder='Start'/>
                    </div>
                    <div className='separator'>
                        -
                    </div>
                    <div className='startRange'>
                        <label htmlFor='patentIdEnd'>Enter Range End</label>
                        <input onChange={handleChange} type="number" name='patentIdEnd' id='patentIdEnd' className='form-control' placeholder='End'/>
                    </div>
                </form>
                <button type="submit" form='patentForm' className="submitButton" disabled={disabled}>Submit</button>
            </div>
            <ScrapeResults successfulScrapes={successfulScrapes} failedScrapes={failedScrapes}/>
        </div>
    )
}