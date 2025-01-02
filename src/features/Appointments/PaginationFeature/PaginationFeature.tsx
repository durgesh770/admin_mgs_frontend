//react
import React, { useState } from 'react';
import PaginationUI from '@/components/ui/PaginationUI/PaginationUI';

interface PaginationFeatureProps {
    totalPage: number;
    setPage?: any;
}

const PaginationFeature: React.FC<PaginationFeatureProps> = ({
    totalPage,
    setPage
}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
        setPage && setPage(value);
    };

    return (<div className="">
        <PaginationUI
            page={currentPage}
            totalPage={totalPage}
            handleChange={handlePageChange}
        />
    </div>
    );
};

export default PaginationFeature;


