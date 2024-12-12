import './PatentSearchForm.css'

import { useState } from 'react';

import {postPatentId } from '../../utilities/api/patentData';

export default function PatentSearchForm() {
    const formReg = /([A-Z|a-z]{2}(\d+)[A-Z|a-z]{1,})/g
    const [formData, setFormData] = useState('')
    const handleChange = (evt) => {
        const newFormData = {
            ...formData, // use the existing formData
            [evt.target.name]: evt.target.value, // override whatever key with the current field's value
        };
        setFormData(newFormData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const cleanedFormData = {...formData, patentId: formData.patentId.replaceAll(' ', '')}
        try {
            const patentData = await postPatentId(cleanedFormData)
            // console.log(patentData)
        } catch (err) {
            console.log(err)
            // await updateDocument({classification: null})
        }
    }
    const disabled = !formReg.test(formData.patentId)
    
    return(
        <form className="PatentSearchForm" onSubmit={handleSubmit}>
            <div className='searchForm'>
                <label htmlFor="patentId">
                    <svg width="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.14878 5.15857L16.4014 16.4112M16.4014 5.15857L5.14878 16.4112M19.5325 13.28L13.28 19.5325C11.9101 20.9024 9.65961 20.9024 8.27994 19.5325L2.02741 13.28C0.65753 11.9101 0.65753 9.65961 2.02741 8.27994L8.27994 2.02741C9.64982 0.65753 11.9003 0.65753 13.28 2.02741L19.5325 8.27994C20.9024 9.65961 20.9024 11.9101 19.5325 13.28Z" stroke="#1B2B41" strokeOpacity="0.6" strokeWidth="1.46773" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
                <input onChange={handleChange} type="text" name='patentId' id='patentId' className='form-control me-2' placeholder='Enter Patent Number / URL'/>
                <button type="submit" className="" disabled={disabled}>Submit</button>
            </div>
        </form>
    )
}