import MUIcon from '@/components/common/Icon'
import React from 'react'

function ViewAccess({ data = [] }) {
  return (
    <div>
      <div className="container max-h-[50vh] overflow-y-scroll">
        {data.map((item) => {
          return <div className="mb-5">
            <div className="flex items-center role">
              <MUIcon iconName={item.icon} style={{ color: item.iconColor }} />
              <span className="ml-2 font-bold">{item.title}</span>
            </div>

            <div className="flex flex-col gap-1 mt-3 ml-5 permissions">
              {
                item.roles.map((role) => {
                  return <li className="">{role}</li>
                })
              }
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default ViewAccess