import React from 'react'

const AdditionalInformation = () => {
  return (
    <>
      <div className="cardsCss">
        <div className="w-full">
          <span className="font-extrabold text-md">Additional Information</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="lebleCss">CREATED</p>
            <p className="text-sm">8 July 2023</p>
          </div>
          <div>
            <p className="lebleCss">SOURCE</p>
            <p className="text-sm">Appointments</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdditionalInformation
