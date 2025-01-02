import React, { useState } from 'react'
import AddNotes from './AddNotes'
import { manageNotes } from '@/hooks/Customer';

const Notes = ({ data }) => {
    //integration
    const manageNotesHooks = manageNotes(data?.id);

    const [description, setDescription] = useState(data?.notes?.description || "");

    return (
        <>
            <div className="cardsCss">
                <div className="flex items-start justify-between w-full pb-2">
                    <div><span className="text-lg font-extrabold text-[--brand-color]">Notes</span></div>
                    <div><button className="font-semibold text-blue-500"><AddNotes description={description} setDescription={setDescription} submit={() => manageNotesHooks.submit({ description })} /></button></div>
                </div>
            </div>
        </>
    )
}

export default Notes
