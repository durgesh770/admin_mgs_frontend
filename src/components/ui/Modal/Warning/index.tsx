'use client'

import { CircularProgress, Grid } from '@mui/material';
import { Button, Modal } from 'flowbite-react';
import CloseIcon from '@mui/icons-material/Close';

interface WarningModalProps {
  open: boolean;
  updateOpen: () => void;
  title: string;
  handleLeftbtn: () => void;
  handleRightbtn: () => void;
  btnfirst: string
  btnSec: string
  loading?:boolean
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  updateOpen,
  title,
  handleRightbtn,
  handleLeftbtn,
  btnfirst,
  btnSec,
  loading
}: WarningModalProps) => {

  return (
    <div>
      <Modal
        show={open}
        onClose={updateOpen}
        size="md"
        popup
        style={{ zIndex: 2000 }}
      >
        <Grid onClick={updateOpen} className='p-4 cursor-pointer' >
          <CloseIcon />
        </Grid>
        <Modal.Body>
          <div className="text-center">
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-7">
              <Button color="failure" onClick={handleLeftbtn}>
                {
                   loading && <CircularProgress sx={{color:"white"}} size={18} />
                }
                {btnfirst}
              </Button>
              <Button className='border border-gray-500' color="gray" onClick={handleRightbtn}>
                {btnSec}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}


export default WarningModal;