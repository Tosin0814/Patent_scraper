import './PatentSearchForm.css'

import { useState } from 'react';

import {postPatentId } from '../../utilities/api/patentData';

export default function PatentSearchForm() {
    // const formReg = /([A-Z|a-z]{2}(\d+)[A-Z|a-z]{1,})/g
    const [formData, setFormData] = useState({})
    const handleChange = (evt) => {
        const newFormData = {
            ...formData, // use the existing formData
            [evt.target.name]: evt.target.value, // override whatever key with the current field's value
        };
        setFormData(newFormData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        // const cleanedFormData = {...formData, patentId: formData.patentId.replaceAll(' ', '')}
        // try {
        //     const patentData = await postPatentId(cleanedFormData)
        //     // console.log(patentData)
        // } catch (err) {
        //     console.log(err)
        //     // await updateDocument({classification: null})
        // }
        console.log(formData)
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
                    <div className='separator'>-</div>
                    <div className='startRange'>
                        <label htmlFor='patentIdEnd'>Enter Range End</label>
                        <input onChange={handleChange} type="number" name='patentIdEnd' id='patentIdEnd' className='form-control' placeholder='End'/>
                    </div>
                </form>
                {/* <input onChange={handleChange} type="text" name='patentId' id='patentId' className='form-control me-2' placeholder='Enter Patent Number / URL'/> */}
                <button type="submit" form='patentForm' className="submitButton" disabled={disabled}>Submit</button>
            </div>
        </div>
    )
}